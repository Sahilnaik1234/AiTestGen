export interface AIModelResponse {
    testCode: string;
    explanation?: string;
}

export abstract class AIModelAdapter {
    protected apiKey: string;
    protected modelName: string;

    constructor(apiKey: string, modelName: string) {
        this.apiKey = apiKey;
        this.modelName = modelName;
    }

    abstract generateTest(sourceCode: string, language: string, fileName: string, coverageData?: any, existingTestCode?: string): Promise<AIModelResponse>;
}
