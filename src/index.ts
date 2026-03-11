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

            // Always sync the latest coverage scores to the dashboard results.json
            updateCoverageOnly(reports);

            const underCoveredFiles = reports.filter(f => {
                const isUnderThreshold = f.coverage < threshold;
                const isUnwanted = /node_modules|coverage|target|jacoco|dist|build/.test(f.filePath);
                return isUnderThreshold && !isUnwanted;
            });

            console.log(chalk.cyan(`✅ Found ${reports.length} files in reports.`));

            if (options.checkOnly) {
                if (underCoveredFiles.length === 0) {
                    console.log(chalk.green('🎉 All source files meet the coverage threshold!'));
                } else {
                    console.log(chalk.red(`\n❌ Validation failed: ${underCoveredFiles.length} files still below threshold.`));
                    underCoveredFiles.forEach(f => console.log(`   - ${f.filePath} (${f.coverage.toFixed(2)}%)`));
                    if (options.exit) process.exit(1);
                }
                return;
            }

            console.log(chalk.magenta(`🚨 ${underCoveredFiles.length} source files are below ${threshold}% coverage.`));

            if (underCoveredFiles.length === 0) {
                console.log(chalk.green('🎉 All source files meet the coverage threshold!'));
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

function saveResults(newResults: any[]) {
    const dashboardDir = path.join(process.cwd(), 'dashboard', 'public');
    const resultsPath = path.join(dashboardDir, 'results.json');

    if (!fs.existsSync(dashboardDir)) {
        fs.mkdirSync(dashboardDir, { recursive: true });
    }

    let existingResults: any[] = [];
    if (fs.existsSync(resultsPath)) {
        try {
            existingResults = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
        } catch (e) {
            existingResults = [];
        }
    }

    // Merge: Update existing or add new
    const merged = [...existingResults];
    for (const res of newResults) {
        const index = merged.findIndex(e => e.id === res.id);
        if (index >= 0) {
            merged[index] = { ...merged[index], ...res };
        } else {
            merged.push(res);
        }
    }

    fs.writeFileSync(resultsPath, JSON.stringify(merged, null, 2));
    console.log(chalk.green(`\n📊 Dashboard data updated in dashboard/public/results.json`));
}

function updateCoverageOnly(reports: FileCoverage[]) {
    const dashboardDir = path.join(process.cwd(), 'dashboard', 'public');
    const resultsPath = path.join(dashboardDir, 'results.json');

    if (!fs.existsSync(resultsPath)) return;

    try {
        const existingResults = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
        const updated = existingResults.map((res: any) => {
            // Find the latest coverage for this file
            const report = reports.find(r => r.filePath.includes(res.name) || res.name.includes(path.basename(r.filePath)));

            // Also refresh source code from disk to ensure UI is up to date
            const resolvedPath = resolveFilePath(res.name);
            let latestSource = res.source;
            if (resolvedPath && fs.existsSync(resolvedPath)) {
                latestSource = fs.readFileSync(resolvedPath, 'utf-8');
            }

            if (report) {
                return {
                    ...res,
                    source: latestSource,
                    coverage: Math.round(report.coverage * 100) / 100
                };
            }
            return { ...res, source: latestSource };
        });

        fs.writeFileSync(resultsPath, JSON.stringify(updated, null, 2));
        console.log(chalk.green(`\n📈 Updated final coverage scores in dashboard.`));
    } catch (e) {
        console.warn(chalk.yellow("⚠️ Could not update final coverage in dashboard."));
    }
}

program.parse();

