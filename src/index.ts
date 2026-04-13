import { Command } from 'commander';
import { Orchestrator } from './core/Orchestrator';
import { CoverageParser, FileCoverage } from './utils/CoverageParser';
import { LanguageDetector } from './utils/LanguageDetector';
import * as dotenv from 'dotenv';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const program = new Command();
let globalSourceDirs: string[] = ['src', 'examples'];

program
    .name('ai-test-gen')
    .description('Generate AI-powered test cases for any language')
    .version('1.0.0');

program
    .command('detect')
    .description('Detect programming languages in the current repository')
    .option('--json', 'Output results as JSON', false)
    .action((options) => {
        try {
            const detector = new LanguageDetector(process.cwd());
            const result = detector.detect();

            if (options.json) {
                console.log(JSON.stringify(result, null, 2));
            } else {
                console.log(chalk.blue('\n🔍 Language Detection Results:\n'));
                if (result.languages.length === 0) {
                    console.log(chalk.yellow('  No languages detected.'));
                } else {
                    for (const lang of result.languages) {
                        console.log(chalk.cyan(`  • ${lang.name}`));
                        console.log(chalk.gray(`    Extensions: ${lang.extensions.join(', ')}`));
                        if (lang.setupVersion) console.log(chalk.gray(`    Version: ${lang.setupVersion}`));
                        if (lang.ecosystem) console.log(chalk.gray(`    Detected via: ${lang.ecosystem}`));
                        if (lang.testCommand) console.log(chalk.gray(`    Test command: ${lang.testCommand}`));
                        if (lang.installCommand) console.log(chalk.gray(`    Install: ${lang.installCommand}`));
                    }
                }
                console.log(chalk.blue(`\n  Summary: ${result.summary.join(', ')}\n`));
            }
        } catch (error: any) {
            console.error(chalk.red(`\n❌ Detection Error: ${error.message}`));
            process.exit(1);
        }
    });

program
    .command('generate')
    .description('Generate tests for specific file(s) or patterns')
    .argument('<pattern>', 'File or glob pattern (e.g. "src/**/*.ts") to generate tests for')
    .option('-m, --model <model>', 'AI model to use (openai, gemini, groq)', 'gemini')
    .option('-v, --version <version>', 'Specific model version')
    .option('-s, --source-dir <dirs...>', 'Source directories to search for files', ['src', 'examples'])
    .action(async (pattern, options) => {
        globalSourceDirs = options.sourceDir;
        await runBatchGeneration(pattern, options);
    });

program
    .command('coverage')
    .description('Analyze coverage reports and generate tests for under-covered files')
    .option('-t, --threshold <threshold>', 'Coverage threshold percentage', '75')
    .option('-m, --model <model>', 'AI model to use (openai, gemini, groq)', 'gemini')
    .option('-v, --version <version>', 'Specific model version')
    .option('-s, --source-dir <dirs...>', 'Source directories to search for files', ['src', 'examples'])
    .option('-i, --include <pattern>', 'Only process files matching this substring or regex')
    .option('-e, --exclude <pattern>', 'Explicitly skip files matching this substring or regex')
    .option('--exit', 'Exit with error code if below threshold', false)
    .option('--check-only', 'Only check coverage without generating tests', false)
    .action(async (options) => {
        globalSourceDirs = options.sourceDir;
        try {
            const threshold = parseFloat(options.threshold);
            console.log(chalk.blue(`\n📊 Analyzing coverage reports (Threshold: ${threshold}%)...`));

            const reports: FileCoverage[] = [
                ...findAndParseReports()
            ];

            if (reports.length === 0) {
                console.log(chalk.yellow('⚠️ No coverage reports found.'));
                return;
            }

            // Always sync the latest coverage scores to the dashboard results.json
            updateCoverageOnly(reports, options);

            const underCoveredFiles = reports.filter(f => {
                const isUnderThreshold = f.coverage < threshold;
                const isUnwanted = /node_modules|coverage|target\/site|jacoco|dist|build|__pycache__|maven-status|bin|\.test\.|_test\.|Test\./i.test(f.filePath);

                let isIncluded = true;
                if (options.include) {
                    const includes = options.include.split(',').map((s: string) => s.trim().toLowerCase());
                    isIncluded = includes.some((p: string) => f.filePath.toLowerCase().includes(p));
                }

                let isExcluded = false;
                if (options.exclude) {
                    const excludes = options.exclude.split(',').map((s: string) => s.trim().toLowerCase());
                    isExcluded = excludes.some((p: string) => f.filePath.toLowerCase().includes(p));
                }

                // Supported Extensions Check
                const supportedExts = ['.ts', '.js', '.py', '.java', '.go', '.cpp', '.cs', '.rs'];
                const hasSupportedExt = supportedExts.some(ext => f.filePath.toLowerCase().endsWith(ext));

                return isUnderThreshold && !isUnwanted && isIncluded && !isExcluded && hasSupportedExt;
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

function findAndParseReports(): FileCoverage[] {
    const { globSync } = require('glob');
    const results: FileCoverage[] = [];

    // 1. Find Jest/Istanbul reports
    const jestReports = globSync('**/coverage-final.json', { ignore: ['node_modules/**'] });
    console.log(chalk.gray(`   - Found ${jestReports.length} Jest reports`));
    jestReports.forEach((report: string) => {
        results.push(...CoverageParser.parseJest(path.isAbsolute(report) ? report : path.join(process.cwd(), report)));
    });

    // 2. Find Go reports
    const goReports = globSync('**/coverage.out', { ignore: ['node_modules/**'] });
    console.log(chalk.gray(`   - Found ${goReports.length} Go reports`));
    goReports.forEach((report: string) => {
        results.push(...CoverageParser.parseGo(path.isAbsolute(report) ? report : path.join(process.cwd(), report)));
    });

    // 3. Find Python reports
    const pyReports = globSync('**/coverage.json', { ignore: ['node_modules/**'] });
    console.log(chalk.gray(`   - Found ${pyReports.length} Python reports`));
    pyReports.forEach((report: string) => {
        results.push(...CoverageParser.parsePython(path.isAbsolute(report) ? report : path.join(process.cwd(), report)));
    });

    // 4. Find Java/JaCoCo reports
    const javaReports = globSync('**/jacoco.xml', { ignore: ['node_modules/**'] });
    console.log(chalk.gray(`   - Found ${javaReports.length} Java reports`));
    javaReports.forEach((report: string) => {
        results.push(...CoverageParser.parseJacoco(path.isAbsolute(report) ? report : path.join(process.cwd(), report)));
    });

    return results;
}

function resolveFilePath(reportPath: string): string | null {
    // 1. Direct check (Absolute or relative to CWD)
    if (fs.existsSync(reportPath) && fs.statSync(reportPath).isFile()) return reportPath;
    if (path.isAbsolute(reportPath) && fs.existsSync(reportPath)) return reportPath;

    // 2. Simple relative check
    const fullPath = path.join(process.cwd(), reportPath);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) return fullPath;

    // 3. Dynamic Discovery: Search the entire workspace (excluding noise)
    const baseName = path.basename(reportPath);
    try {
        const { globSync } = require('glob');
        // Search for the filename anywhere in the repo, ignoring huge non-source folders
        const matches = globSync(`**/${baseName}`, {
            ignore: ['node_modules/**', '.git/**', 'target/**', 'dist/**', 'build/**', 'coverage/**'],
            absolute: true
        });

        if (matches.length > 0) {
            // If multiple matches, try to find the one that best matches the report path
            if (matches.length > 1) {
                const bestMatch = matches.find((m: string) => m.replace(/\\/g, '/').includes(reportPath.replace(/\\/g, '/')));
                return bestMatch || matches[0];
            }
            return matches[0];
        }
    } catch (e) {
        console.warn(`⚠️ Error during dynamic file discovery: ${e}`);
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


function updateCoverageOnly(reports: FileCoverage[], options: any) {
    const dashboardDir = path.join(process.cwd(), 'dashboard', 'public');
    const resultsPath = path.join(dashboardDir, 'results.json');

    let existingResults: any[] = [];
    if (!fs.existsSync(resultsPath)) {
        // No results yet — nothing to update. Files are only added via saveResults() after AI generation.
        return;
    }

    try {
        existingResults = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
    } catch (e) {
        return;
    }

    // ONLY update coverage scores for files already tracked (AI-generated)
    // Do NOT add new files here — that's saveResults()'s job
    const updated = existingResults.map((res: any) => {
        const report = reports.find(r =>
            path.basename(r.filePath) === res.name ||
            r.filePath.toLowerCase().includes(res.name.toLowerCase())
        );

        // Refresh source code from disk
        const resolvedPath = resolveFilePath(res.name);
        let latestSource = res.source;
        if (resolvedPath && fs.existsSync(resolvedPath)) {
            latestSource = fs.readFileSync(resolvedPath, 'utf-8');
        }

        if (report) {
            return {
                ...res,
                source: latestSource,
                coverage: Math.round(report.coverage * 100) / 100,
                status: report.coverage >= options.threshold ? 'passed' : 'warning'
            };
        }
        return { ...res, source: latestSource };
    });

    try {
        fs.writeFileSync(resultsPath, JSON.stringify(updated, null, 2));
        console.log(chalk.green(`\n📈 Refreshed coverage for ${updated.length} tracked files.`));
    } catch (e) {
        console.warn(chalk.yellow('⚠️ Could not update dashboard results.json'));
    }
}

program.parse();