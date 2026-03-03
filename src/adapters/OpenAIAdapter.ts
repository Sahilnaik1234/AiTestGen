import axios from 'axios';
import { AIModelAdapter, AIModelResponse } from './BaseAdapter';

export class OpenAIAdapter extends AIModelAdapter {
    private apiUrl: string = 'https://api.openai.com/v1/chat/completions';

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
                this.apiUrl,
                {
                    model: this.modelName,
                    messages: [
                        { role: "system", content: "You are a helpful assistant that generates high quality test cases." },
                        { role: "user", content: prompt }
                    ]
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const text = response.data.choices[0].message.content;
            const codeMatch = text.match(/```(?:\w+)?\s*([\s\S]*?)```/);
            const testCode = codeMatch ? codeMatch[1].trim() : text.trim();

            return {
                testCode,
                explanation: "Generated using OpenAI API"
            };
        } catch (error: any) {
            throw new Error(`OpenAI API Error: ${error.response?.data?.error?.message || error.message}`);
        }
    }
}
