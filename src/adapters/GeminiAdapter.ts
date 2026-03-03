import axios from 'axios';
import { AIModelAdapter, AIModelResponse } from './BaseAdapter';

export class GeminiAdapter extends AIModelAdapter {
    private apiUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models';

    async generateTest(sourceCode: string, language: string): Promise<AIModelResponse> {
        const prompt = `
      You are an expert software engineer. Generate a comprehensive test suite for the following ${language} code.
      Follow industry best practices and ensure high code coverage.
      Return ONLY the test code inside triple backticks.

      Source Code:
      \`\`\`${language}
      ${sourceCode}
      \`\`\`
    `;

        try {
            const response = await axios.post(
                `${this.apiUrl}/${this.modelName}:generateContent?key=${this.apiKey}`,
                {
                    contents: [{ parts: [{ text: prompt }] }]
                }
            );

            const text = response.data.candidates[0].content.parts[0].text;
            const codeMatch = text.match(/```(?:\w+)?\s*([\s\S]*?)```/);
            const testCode = codeMatch ? codeMatch[1].trim() : text.trim();

            return {
                testCode,
                explanation: "Generated using Gemini API"
            };
        } catch (error: any) {
            throw new Error(`Gemini API Error: ${error.response?.data?.error?.message || error.message}`);
        }
    }
}
