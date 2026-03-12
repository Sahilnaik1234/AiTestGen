import { Orchestrator } from './Orchestrator';
import * as fs from 'fs';
import * as path from 'path';
import { ModelFactory } from './ModelFactory';
import chalk from 'chalk';

describe('Orchestrator', () => {
    let orchestrator: Orchestrator;

    beforeEach(() => {
        orchestrator = new Orchestrator('gemini', 'apiKey', 'modelName');
    });

    it('should create an instance of Orchestrator', () => {
        expect(orchestrator).toBeInstanceOf(Orchestrator);
    });

    it('should set default model name if not provided', () => {
        const orchestrator = new Orchestrator('gemini', 'apiKey', '');
        expect(orchestrator.modelName).toBe('gemini-1.5-flash');
    });

    it('should set model name if provided', () => {
        const orchestrator = new Orchestrator('gemini', 'apiKey', 'customModelName');
        expect(orchestrator.modelName).toBe('customModelName');
    });

    it('should throw an error if file does not exist', async () => {
        await expect(orchestrator.run('non-existent-file.ts')).rejects.toThrowError('File not found: non-existent-file.ts');
    });

    it('should truncate large files', async () => {
        const largeFile = 'large-file.ts';
        const largeContent = 'a'.repeat(40001);
        fs.writeFileSync(largeFile, largeContent);

        const result = await orchestrator.run(largeFile);
        expect(result.test).toContain('// ... rest of file truncated for AI analysis ...');

        fs.unlinkSync(largeFile);
    });

    it('should detect language from extension', () => {
        expect(orchestrator.getLanguageFromExtension('ts')).toBe('TypeScript');
        expect(orchestrator.getLanguageFromExtension('js')).toBe('JavaScript');
        expect(orchestrator.getLanguageFromExtension('py')).toBe('Python');
        expect(orchestrator.getLanguageFromExtension('java')).toBe('Java');
        expect(orchestrator.getLanguageFromExtension('cpp')).toBe('C++');
        expect(orchestrator.getLanguageFromExtension('cs')).toBe('C#');
        expect(orchestrator.getLanguageFromExtension('go')).toBe('Go');
        expect(orchestrator.getLanguageFromExtension('rs')).toBe('Rust');
        expect(orchestrator.getLanguageFromExtension('unknown')).toBe('Unknown');
    });

    it('should generate test file path', () => {
        const originalPath = 'original-file.ts';
        const ext = 'ts';
        const testFilePath = orchestrator.getTestFilePath(originalPath, ext);
        expect(testFilePath).toBe(path.join(path.dirname(originalPath), 'original-file.test.ts'));
    });

    it('should generate test file path for Go', () => {
        const originalPath = 'original-file.go';
        const ext = 'go';
        const testFilePath = orchestrator.getTestFilePath(originalPath, ext);
        expect(testFilePath).toBe(path.join(path.dirname(originalPath), 'original-file_test.go'));
    });

    it('should generate test file path for Python', () => {
        const originalPath = 'original-file.py';
        const ext = 'py';
        const testFilePath = orchestrator.getTestFilePath(originalPath, ext);
        expect(testFilePath).toBe(path.join(path.dirname(originalPath), 'original-file_test.py'));
    });

    it('should generate test file path for Java', () => {
        const originalPath = 'original-file.java';
        const ext = 'java';
        const testFilePath = orchestrator.getTestFilePath(originalPath, ext);
        expect(testFilePath).toBe(path.join(path.dirname(originalPath), 'original-fileTest.java'));
    });

    it('should run and generate test code', async () => {
        const filePath = 'test-file.ts';
        const fileContent = 'console.log("Hello World!");';
        fs.writeFileSync(filePath, fileContent);

        const result = await orchestrator.run(filePath);
        expect(result.test).not.toBeUndefined();
        expect(result.test).not.toBeNull();

        fs.unlinkSync(filePath);
    });

    it('should run and generate test code with coverage data', async () => {
        const filePath = 'test-file.ts';
        const fileContent = 'console.log("Hello World!");';
        fs.writeFileSync(filePath, fileContent);

        const coverageData = { coverage: 50 };
        const result = await orchestrator.run(filePath, coverageData);
        expect(result.test).not.toBeUndefined();
        expect(result.test).not.toBeNull();
        expect(result.coverage).toBe(50);

        fs.unlinkSync(filePath);
    });
});