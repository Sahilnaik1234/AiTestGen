import * as fs from 'fs';
import * as path from 'path';
import { ModelFactory } from './ModelFactory';
import chalk from 'chalk';

export class Orchestrator {
    private adapterType: string;
    private apiKey: string;
    private modelName: string;

    constructor(adapterType: string, apiKey: string, modelName: string) {
        this.adapterType = adapterType;
        this.apiKey = apiKey;
        // Set default model names if not provided
        if (!modelName) {
            if (adapterType === 'gemini') this.modelName = 'gemini-1.5-flash';
            else if (adapterType === 'openai') this.modelName = 'gpt-4o';
            else if (adapterType === 'groq') this.modelName = 'llama-3.3-70b-versatile';
            else this.modelName = 'unknown';
        } else {
            this.modelName = modelName;
        }
    }

    async run(filePath: string, coverageData?: any) {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        let sourceCode = fs.readFileSync(filePath, 'utf-8');

        // Safety check for Large Files (approx. AI token limit)
        const MAX_CHARS = 40000;
        if (sourceCode.length > MAX_CHARS) {
            console.log(chalk.yellow(`⚠️ ${path.basename(filePath)} is very large (${sourceCode.length} chars).`));
            console.log(chalk.yellow(`   Truncating to ${MAX_CHARS} chars to avoid AI token limits.`));
            sourceCode = sourceCode.substring(0, MAX_CHARS) + "\n\n// ... rest of file truncated for AI analysis ...";
        }

        const extension = path.extname(filePath).slice(1);
        const language = this.getLanguageFromExtension(extension);

        console.log(chalk.cyan(`\n🔍 Detecting language... Found: ${language}`));
        if (coverageData) {
            console.log(chalk.yellow(`📈 Current coverage: ${coverageData.coverage.toFixed(2)}%`));
        }
        console.log(chalk.cyan(`🚀 Generating test cases using ${this.adapterType} (${this.modelName})...`));

        const adapter = ModelFactory.createAdapter(this.adapterType, this.apiKey, this.modelName);
        const fileName = path.basename(filePath);

        const testFilePath = this.getTestFilePath(filePath, extension);
        let existingTestCode = '';
        if (fs.existsSync(testFilePath)) {
            existingTestCode = fs.readFileSync(testFilePath, 'utf-8');
            console.log(chalk.gray(`   - Found existing test file. Sending to AI for merging...`));
        }

        const response = await adapter.generateTest(sourceCode, language, fileName, coverageData, existingTestCode);

        const testCode = response.testCode;
        fs.writeFileSync(testFilePath, testCode);

        console.log(chalk.green(`\n✅ Test code successfully generated!`));
        console.log(chalk.blue(`📂 Saved to: ${testFilePath}`));

        return {
            id: path.basename(filePath, `.${extension}`).toLowerCase(),
            name: fileName,
            lang: language,
            source: fs.readFileSync(filePath, 'utf-8'), // Save original for dashboard
            test: testCode,
            model: this.modelName,
            coverage: coverageData ? coverageData.coverage : 0
        };
    }

    private getLanguageFromExtension(ext: string): string {
        const map: Record<string, string> = {
            'ts': 'TypeScript',
            'js': 'JavaScript',
            'py': 'Python',
            'java': 'Java',
            'cpp': 'C++',
            'cs': 'C#',
            'go': 'Go',
            'rs': 'Rust'
        };
        return map[ext.toLowerCase()] || 'Unknown';
    }

    private getTestFilePath(originalPath: string, ext: string): string {
        const dir = path.dirname(originalPath);
        const base = path.basename(originalPath, `.${ext}`);

        let testName = '';
        switch (ext.toLowerCase()) {
            case 'go':
                testName = `${base}_test.go`;
                break;
            case 'py':
                testName = `${base}_test.py`;
                break;
            case 'java':
                testName = `${base}Test.java`;
                break;
            default:
                testName = `${base}.test.${ext}`;
        }

        return path.join(dir, testName);
    }
}
