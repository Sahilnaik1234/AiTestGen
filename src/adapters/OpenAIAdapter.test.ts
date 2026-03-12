import { OpenAIAdapter } from './OpenAIAdapter';
import axios from 'axios';
import { AIModelResponse } from './BaseAdapter';

describe('OpenAIAdapter', () => {
    let openAIAdapter: OpenAIAdapter;

    beforeEach(() => {
        openAIAdapter = new OpenAIAdapter();
        openAIAdapter.apiUrl = 'https://api.openai.com/v1/chat/completions';
        openAIAdapter.modelName = 'test-model';
        openAIAdapter.apiKey = 'test-api-key';
    });

    it('should generate test code with coverage context', async () => {
        const sourceCode = 'console.log("Hello World!");';
        const language = 'TypeScript';
        const fileName = 'example.ts';
        const coverageData = {
            coverage: 50,
            details: 'Some details about the coverage'
        };

        const response = await openAIAdapter.generateTest(sourceCode, language, fileName, coverageData);
        expect(response.testCode).toContain('console.log("Hello World!");');
        expect(response.explanation).toBe('Generated using OpenAI API');
    });

    it('should generate test code without coverage context', async () => {
        const sourceCode = 'console.log("Hello World!");';
        const language = 'TypeScript';
        const fileName = 'example.ts';

        const response = await openAIAdapter.generateTest(sourceCode, language, fileName);
        expect(response.testCode).toContain('console.log("Hello World!");');
        expect(response.explanation).toBe('Generated using OpenAI API');
    });

    it('should handle axios post error', async () => {
        jest.spyOn(axios, 'post').mockRejectedValueOnce({
            response: {
                data: {
                    error: {
                        message: 'Test error message'
                    }
                }
            }
        });

        const sourceCode = 'console.log("Hello World!");';
        const language = 'TypeScript';
        const fileName = 'example.ts';

        await expect(openAIAdapter.generateTest(sourceCode, language, fileName)).rejects.toThrowError('OpenAI API Error: Test error message');
    });

    it('should handle axios post error without response data', async () => {
        jest.spyOn(axios, 'post').mockRejectedValueOnce({
            message: 'Test error message'
        });

        const sourceCode = 'console.log("Hello World!");';
        const language = 'TypeScript';
        const fileName = 'example.ts';

        await expect(openAIAdapter.generateTest(sourceCode, language, fileName)).rejects.toThrowError('OpenAI API Error: Test error message');
    });

    it('should handle null or undefined coverage data', async () => {
        const sourceCode = 'console.log("Hello World!");';
        const language = 'TypeScript';
        const fileName = 'example.ts';

        const response1 = await openAIAdapter.generateTest(sourceCode, language, fileName, null);
        expect(response1.testCode).toContain('console.log("Hello World!");');
        expect(response1.explanation).toBe('Generated using OpenAI API');

        const response2 = await openAIAdapter.generateTest(sourceCode, language, fileName, undefined);
        expect(response2.testCode).toContain('console.log("Hello World!");');
        expect(response2.explanation).toBe('Generated using OpenAI API');
    });
});