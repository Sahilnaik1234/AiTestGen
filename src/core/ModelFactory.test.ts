import { ModelFactory } from './ModelFactory';
import { AIModelAdapter } from '../adapters/BaseAdapter';
import { GeminiAdapter } from '../adapters/GeminiAdapter';
import { OpenAIAdapter } from '../adapters/OpenAIAdapter';
import { GroqAdapter } from '../adapters/GroqAdapter';

describe('ModelFactory', () => {
    it('should create a GeminiAdapter', () => {
        const apiKey = 'test-api-key';
        const modelName = 'gemini-1.5-flash';
        const adapter = ModelFactory.createAdapter('gemini', apiKey, modelName);
        expect(adapter).toBeInstanceOf(GeminiAdapter);
        expect(adapter).toHaveProperty('apiKey', apiKey);
        expect(adapter).toHaveProperty('modelName', modelName);
    });

    it('should create a GeminiAdapter with default model name', () => {
        const apiKey = 'test-api-key';
        const adapter = ModelFactory.createAdapter('gemini', apiKey, undefined);
        expect(adapter).toBeInstanceOf(GeminiAdapter);
        expect(adapter).toHaveProperty('apiKey', apiKey);
        expect(adapter).toHaveProperty('modelName', 'gemini-1.5-flash');
    });

    it('should create an OpenAIAdapter', () => {
        const apiKey = 'test-api-key';
        const modelName = 'gpt-4o';
        const adapter = ModelFactory.createAdapter('openai', apiKey, modelName);
        expect(adapter).toBeInstanceOf(OpenAIAdapter);
        expect(adapter).toHaveProperty('apiKey', apiKey);
        expect(adapter).toHaveProperty('modelName', modelName);
    });

    it('should create an OpenAIAdapter with default model name', () => {
        const apiKey = 'test-api-key';
        const adapter = ModelFactory.createAdapter('openai', apiKey, undefined);
        expect(adapter).toBeInstanceOf(OpenAIAdapter);
        expect(adapter).toHaveProperty('apiKey', apiKey);
        expect(adapter).toHaveProperty('modelName', 'gpt-4o');
    });

    it('should create a GroqAdapter', () => {
        const apiKey = 'test-api-key';
        const modelName = 'llama-3.3-70b-versatile';
        const adapter = ModelFactory.createAdapter('groq', apiKey, modelName);
        expect(adapter).toBeInstanceOf(GroqAdapter);
        expect(adapter).toHaveProperty('apiKey', apiKey);
        expect(adapter).toHaveProperty('modelName', modelName);
    });

    it('should create a GroqAdapter with default model name', () => {
        const apiKey = 'test-api-key';
        const adapter = ModelFactory.createAdapter('groq', apiKey, undefined);
        expect(adapter).toBeInstanceOf(GroqAdapter);
        expect(adapter).toHaveProperty('apiKey', apiKey);
        expect(adapter).toHaveProperty('modelName', 'llama-3.3-70b-versatile');
    });

    it('should throw an error for unsupported model type', () => {
        const apiKey = 'test-api-key';
        const modelName = 'unsupported-model';
        expect(() => ModelFactory.createAdapter('unsupported', apiKey, modelName)).toThrowError(`Unsupported model type: unsupported`);
    });

    it('should throw an error for null model type', () => {
        const apiKey = 'test-api-key';
        const modelName = 'unsupported-model';
        expect(() => ModelFactory.createAdapter(null, apiKey, modelName)).toThrowError(`Unsupported model type: null`);
    });

    it('should throw an error for undefined model type', () => {
        const apiKey = 'test-api-key';
        const modelName = 'unsupported-model';
        expect(() => ModelFactory.createAdapter(undefined, apiKey, modelName)).toThrowError(`Unsupported model type: undefined`);
    });
});