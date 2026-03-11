import { Command } from 'commander';
import { Orchestrator } from './core/Orchestrator';
import { CoverageParser, FileCoverage } from './utils/CoverageParser';
import * as dotenv from 'dotenv';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const program = new Command();

program
    .name('ai-test-gen')
    .description('Generate AI-powered test cases for any language')
    .version('1.0.0');

program
    .command('generate')
    .description('Generate tests for specific file(s) or patterns')
    .argument('<pattern>', 'File or glob pattern (e.g. "src/**/*.ts") to generate tests for')
    .option('-m, --model <model>', 'AI model to use (openai, gemini, groq)', 'gemini')
    .option('-v, --version <version>', 'Specific model version')
    .action(async (pattern, options) => {
        await runBatchGeneration(pattern, options);
    });

program
    .command('coverage')
    .description('Analyze coverage reports and generate tests for under-covered files')
    .option('-t, --threshold <threshold>', 'Coverage threshold percentage', '75')
    .option('-m, --model <model>', 'AI model to use (openai, gemini, groq)', 'gemini')
    .option('-v, --version <version>', 'Specific model version')
    .option('--exit', 'Exit with error code if below threshold', false)
    .option('--check-only', 'Only check coverage without generating tests', false)
    .action(async (options) => {
        try {
            const threshold = parseFloat(options.threshold);
            console.log(chalk.blue(`\n📊 Analyzing coverage reports (Threshold: ${threshold}%)...`));

            const reports: FileCoverage[] = [
                ...CoverageParser.parseJest(path.join(process.cwd(), 'coverage', 'coverage-final.json')),
                ...CoverageParser.parseGo(path.join(process.cwd(), 'examples', 'coverage.out')),
                ...CoverageParser.parsePython(path.join(process.cwd(), 'coverage.json')),
                ...CoverageParser.parseJacoco(path.join(process.cwd(), 'examples', 'target', 'site', 'jacoco', 'jacoco.xml'))
            ];

            if (reports.length === 0) {
                console.log(chalk.yellow('⚠️ No coverage reports found.'));
                return;
            }

            const underCoveredFiles = reports.filter(f => {
                const isUnderThreshold = f.coverage < threshold;
                const isUnwanted = /node_modules|coverage|target|jacoco|dist|build/.test(f.filePath);
                return isUnderThreshold && !isUnwanted;
            });

            console.log(chalk.cyan(`✅ Found ${reports.length} files in reports.`));
            console.log(chalk.magenta(`🚨 ${underCoveredFiles.length} source files are below ${threshold}% coverage.`));

            if (underCoveredFiles.length === 0) {
                console.log(chalk.green('🎉 All source files meet the coverage threshold!'));
                return;
            }

            if (options.checkOnly) {
                console.log(chalk.red(`\n❌ Validation failed: ${underCoveredFiles.length} files still below threshold.`));
                underCoveredFiles.forEach(f => console.log(`   - ${f.filePath} (${f.coverage.toFixed(2)}%)`));
                if (options.exit) process.exit(1);
                return;
            }

            const type = options.model;
            const apiKey = getApiKey(type);
            const orchestrator = new Orchestrator(type, apiKey, options.version);

            const results = [];
            for (const fileItem of underCoveredFiles) {
                // We need to resolve the actual file path because reports might have relative/partial paths
                const resolvedPath = resolveFilePath(fileItem.filePath);
                if (resolvedPath && fs.existsSync(resolvedPath)) {
                    console.log(chalk.yellow(`\n🛠️ Generating tests for: ${fileItem.filePath}`));
                    try {
                        const result = await orchestrator.run(resolvedPath, fileItem);
                        results.push(result);
                    } catch (err: any) {
                        console.error(chalk.red(`❌ Error generating for ${fileItem.filePath}: ${err.message}`));
                    }
                } else {
                    console.warn(chalk.gray(`⚠️ Could not resolve file path for: ${fileItem.filePath}`));
                }
            }

            saveResults(results);

            if (underCoveredFiles.length > 0) {
                console.log(chalk.red(`\n⚠️ Warning: ${underCoveredFiles.length} files are below the ${threshold}% coverage threshold.`));
                if (results.length > 0) {
                    console.log(chalk.green(`✨ Successfully generated additional tests for ${results.length} files.`));
                }

                if (options.exit) {
                    console.error(chalk.red(`\n❌ CI failed: Threshold not met after AI generation.`));
                    process.exit(1);
                }
            } else {
                console.log(chalk.green('🎉 All files meet the coverage threshold!'));
            }
        } catch (error: any) {
            console.error(chalk.red(`\n❌ Coverage CLI Error: ${error.message}`));
            process.exit(1);
        }
    });

async function runBatchGeneration(pattern: string, options: any) {
    try {
        const { glob } = require('glob');
        const files = await glob(pattern, { ignore: ['node_modules/**', '**/*.test.*', '**/*_test.*'] });

        if (files.length === 0) {
            console.log(chalk.yellow(`\n⚠️ No matching files found for pattern: ${pattern}`));
            return;
        }

        console.log(chalk.magenta(`\n📦 Found ${files.length} file(s) to process.`));

        const type = options.model;
        const apiKey = getApiKey(type);
        const orchestrator = new Orchestrator(type, apiKey, options.version);

        const results = [];
        for (const file of files) {
            try {
                const result = await orchestrator.run(file);
                results.push(result);
            } catch (err: any) {
                console.error(chalk.red(`\n❌ Error generating for ${file}: ${err.message}`));
            }
        }

        saveResults(results);
    } catch (error: any) {
        console.error(chalk.red(`\n❌ CLI Error: ${error.message}`));
        process.exit(1);
    }
}

function getApiKey(type: string): string {
    let apiKey = '';
    if (type === 'openai') apiKey = process.env.OPENAI_API_KEY || '';
    else if (type === 'gemini') apiKey = process.env.GEMINI_API_KEY || '';
    else if (type === 'groq') apiKey = process.env.GROQ_API_KEY || '';

    if (!apiKey) {
        const keyName = type === 'openai' ? 'OPENAI_API_KEY' : (type === 'gemini' ? 'GEMINI_API_KEY' : 'GROQ_API_KEY');
        console.error(chalk.red(`\n❌ Error: Missing API key for ${type}. Please set ${keyName} in your .env file.`));
        process.exit(1);
    }
    return apiKey;
}

function resolveFilePath(reportPath: string): string | null {
    // Check if it's already an absolute path and exists
    if (path.isAbsolute(reportPath) && fs.existsSync(reportPath)) return reportPath;

    // Common locations to check
    const searchDirs = [
        process.cwd(),
        path.join(process.cwd(), 'src'),
        path.join(process.cwd(), 'examples')
    ];

    for (const dir of searchDirs) {
        const fullPath = path.join(dir, reportPath);
        if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) return fullPath;

        // Handle cases like "StringUtils.java" in reports but "examples/StringUtils.java" on disk
        const baseName = path.basename(reportPath);
        const nestedCheck = path.join(dir, baseName);
        if (fs.existsSync(nestedCheck) && fs.statSync(nestedCheck).isFile()) return nestedCheck;
    }

    return null;
}

function saveResults(results: any[]) {
    const dashboardDir = path.join(process.cwd(), 'dashboard', 'public');
    if (!fs.existsSync(dashboardDir)) {
        fs.mkdirSync(dashboardDir, { recursive: true });
    }
    fs.writeFileSync(
        path.join(dashboardDir, 'results.json'),
        JSON.stringify(results, null, 2)
    );
    console.log(chalk.green(`\n📊 Dashboard data saved to dashboard/public/results.json`));
}

program.parse();

