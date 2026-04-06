import axios from 'axios';
import { AIModelAdapter, AIModelResponse } from './BaseAdapter';

export class OpenAIAdapter extends AIModelAdapter {
    private apiUrl: string = 'https://api.openai.com/v1/chat/completions';

    async generateTest(sourceCode: string, language: string, fileName: string, coverageData?: any, existingTestCode?: string): Promise<AIModelResponse> {
        let coverageContext = '';
        if (coverageData) {
            coverageContext = `
      COVERAGE CONTEXT:
      - Current Coverage: ${coverageData.coverage.toFixed(2)}%
      - Goal: Increase coverage to 100%.
      ${coverageData.details ? `- Specific missing parts: ${coverageData.details}` : ''}
      - Instruction: Analyze the code and identify which branches or lines might be missing based on the current percentage. Focus on edge cases and uncovered logical paths.
      `;
        }

        let existingCodeContext = '';
        if (existingTestCode) {
            existingCodeContext = `
      EXISTING TEST CODE:
      Below is the content of the current test file. 
      You MUST merge your new test cases INTO this existing suite. 
      Maintain existing imports and structure. 
      Do NOT delete any existing tests. 
      ONLY add new test cases that improve coverage.
      
      \`\`\`${language}
      ${existingTestCode}
      \`\`\`
      `;
        }

        const prompt = `
      You are an expert software engineer. Generate a comprehensive test suite for the following ${language} code.
      The source file is named "${fileName}".
      ${coverageContext}
      ${existingCodeContext}
      
      RULES FOR IMPORTS:
      - If the language is TypeScript or JavaScript, ensure you import/require the code WITHOUT the file extension (e.g., use './${fileName.split('.')[0]}').
      - For Java, always use JUnit Jupiter (JUnit 5).
      - For other languages, use their standard import conventions.

      RULES FOR TEST ACCURACY:
      - Follow industry best practices and ensure high code coverage (aim for 100%).
      - MENTAL EXECUTION: Trace the logic with specific values before writing any assertion.
      - JS DATE QUIRK: Note that in JavaScript, 'new Date(null)' evaluates to '1970-01-01', while 'new Date(undefined)' is 'Invalid Date'.
      - NO GUESSING: If the source code does not explicitly handle 'null' or 'undefined' with a guard, do not guess what it returns for those inputs. Stick to valid inputs that cover all lines and branches.
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
