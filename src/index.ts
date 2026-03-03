import { Command } from 'commander';
import { Orchestrator } from './core/Orchestrator';
import * as dotenv from 'dotenv';
import chalk from 'chalk';

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
        try {
            const { glob } = require('glob');
            const files = await glob(pattern, { ignore: ['node_modules/**', '**/*.test.*', '**/*_test.*'] });

            if (files.length === 0) {
                console.log(chalk.yellow(`\n⚠️ No matching files found for pattern: ${pattern}`));
                return;
            }

            console.log(chalk.magenta(`\n📦 Found ${files.length} file(s) to process.`));

            const type = options.model;
            let apiKey = '';

            if (type === 'openai') apiKey = process.env.OPENAI_API_KEY || '';
            else if (type === 'gemini') apiKey = process.env.GEMINI_API_KEY || '';
            else if (type === 'groq') apiKey = process.env.GROQ_API_KEY || '';

            if (!apiKey) {
                const keyName = type === 'openai' ? 'OPENAI_API_KEY' : (type === 'gemini' ? 'GEMINI_API_KEY' : 'GROQ_API_KEY');
                console.error(chalk.red(`\n❌ Error: Missing API key for ${type}. Please set ${keyName} in your .env file.`));
                process.exit(1);
            }

            const orchestrator = new Orchestrator(type, apiKey, options.version);

            for (const file of files) {
                try {
                    await orchestrator.run(file);
                } catch (err: any) {
                    console.error(chalk.red(`\n❌ Error generating for ${file}: ${err.message}`));
                }
            }
        } catch (error: any) {
            console.error(chalk.red(`\n❌ CLI Error: ${error.message}`));
            process.exit(1);
        }
    });

program.parse();
