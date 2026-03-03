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
        this.modelName = modelName;
    }

    async run(filePath: string) {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const sourceCode = fs.readFileSync(filePath, 'utf-8');
        const extension = path.extname(filePath).slice(1);
        const language = this.getLanguageFromExtension(extension);

        console.log(chalk.cyan(`\n🔍 Detecting language... Found: ${language}`));
        console.log(chalk.cyan(`🚀 Generating test cases using ${this.adapterType} (${this.modelName})...`));

        const adapter = ModelFactory.createAdapter(this.adapterType, this.apiKey, this.modelName);
        const fileName = path.basename(filePath);
        const response = await adapter.generateTest(sourceCode, language, fileName);

        const testFilePath = this.getTestFilePath(filePath, extension);
        const testCode = response.testCode;
        fs.writeFileSync(testFilePath, testCode);

        console.log(chalk.green(`\n✅ Test code successfully generated!`));
        console.log(chalk.blue(`📂 Saved to: ${testFilePath}`));

        return {
            id: path.basename(filePath, `.${extension}`).toLowerCase(),
            name: fileName,
            lang: language,
            source: sourceCode,
            test: testCode,
            coverage: 0 // Placeholder, will be updated if we parse coverage reports
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
                testName = `${base}.test.java`; // Or Test.java based on project style
                break;
            default:
                testName = `${base}.test.${ext}`;
        }

        return path.join(dir, testName);
    }
}
