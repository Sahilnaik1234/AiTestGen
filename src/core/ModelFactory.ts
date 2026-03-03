import { AIModelAdapter } from '../adapters/BaseAdapter';
import { GeminiAdapter } from '../adapters/GeminiAdapter';
import { OpenAIAdapter } from '../adapters/OpenAIAdapter';
import { GroqAdapter } from '../adapters/GroqAdapter';

export class ModelFactory {
    static createAdapter(type: string, apiKey: string, modelName: string): AIModelAdapter {
        switch (type.toLowerCase()) {
            case 'gemini':
                return new GeminiAdapter(apiKey, modelName || 'gemini-1.5-flash');
            case 'openai':
                return new OpenAIAdapter(apiKey, modelName || 'gpt-4o');
            case 'groq':
                return new GroqAdapter(apiKey, modelName || 'llama-3.3-70b-versatile');
            default:
                throw new Error(`Unsupported model type: ${type}`);
        }
    }
}
