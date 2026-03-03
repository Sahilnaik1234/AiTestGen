import axios from 'axios';
import { AIModelAdapter, AIModelResponse } from './BaseAdapter';

export class GroqAdapter extends AIModelAdapter {
    private apiUrl: string = 'https://api.groq.com/openai/v1/chat/completions';

    async generateTest(sourceCode: string, language: string, fileName: string): Promise<AIModelResponse> {
        const prompt = `
      You are an expert software engineer. Generate a comprehensive test suite for the following ${language} code.
      The source file is named "${fileName}".
      
      RULES FOR IMPORTS:
      - If the language is TypeScript or JavaScript, ensure you import/require the code WITHOUT the file extension (e.g., use './${fileName.split('.')[0]}').
      - For other languages, use their standard import conventions.

      RULES FOR TEST ACCURACY:
      - Follow industry best practices and ensure high code coverage (aim for 100%).
      - MENTAL EXECUTION: Before writing an assertion for an edge case (like null, undefined, or specific dates), mentally trace the code logic to ensure the expected value is 100% correct.
      - FORMATTING: Do not assume the code returns more data than what appears in the logic (e.g., if the code formats 'YYYY-MM-DD', do not assert 'YYYY-MM-DD-HH-MM').
      - ONLY test for errors if the source code specifically 'throws' or 'raises' them.
      - Return ONLY the test code inside triple backticks.

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
                    ],
                    temperature: 0.2
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
                explanation: `Generated using Groq API (${this.modelName})`
            };
        } catch (error: any) {
            throw new Error(`Groq API Error: ${error.response?.data?.error?.message || error.message}`);
        }
    }
}
