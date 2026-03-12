import './BaseAdapter';

describe('AIModelAdapter', () => {
  class TestAIModelAdapter extends AIModelAdapter {
    generateTest(sourceCode: string, language: string, fileName: string, coverageData?: any): Promise<AIModelResponse> {
      return Promise.resolve({ testCode: 'testCode' });
    }
  }

  let adapter: TestAIModelAdapter;

  beforeEach(() => {
    adapter = new TestAIModelAdapter('apiKey', 'modelName');
  });

  it('should create an instance with apiKey and modelName', () => {
    expect(adapter.apiKey).toBe('apiKey');
    expect(adapter.modelName).toBe('modelName');
  });

  it('should call generateTest with required parameters', async () => {
    const generateTestSpy = jest.spyOn(adapter, 'generateTest');
    await adapter.generateTest('sourceCode', 'language', 'fileName');
    expect(generateTestSpy).toHaveBeenCalledTimes(1);
    expect(generateTestSpy).toHaveBeenCalledWith('sourceCode', 'language', 'fileName', undefined);
  });

  it('should call generateTest with optional coverageData parameter', async () => {
    const generateTestSpy = jest.spyOn(adapter, 'generateTest');
    await adapter.generateTest('sourceCode', 'language', 'fileName', { coverage: 100 });
    expect(generateTestSpy).toHaveBeenCalledTimes(1);
    expect(generateTestSpy).toHaveBeenCalledWith('sourceCode', 'language', 'fileName', { coverage: 100 });
  });

  it('should return a Promise with AIModelResponse', async () => {
    const response = await adapter.generateTest('sourceCode', 'language', 'fileName');
    expect(response).toEqual({ testCode: 'testCode' });
  });

  it('should handle empty sourceCode', async () => {
    const response = await adapter.generateTest('', 'language', 'fileName');
    expect(response).toEqual({ testCode: 'testCode' });
  });

  it('should handle empty language', async () => {
    const response = await adapter.generateTest('sourceCode', '', 'fileName');
    expect(response).toEqual({ testCode: 'testCode' });
  });

  it('should handle empty fileName', async () => {
    const response = await adapter.generateTest('sourceCode', 'language', '');
    expect(response).toEqual({ testCode: 'testCode' });
  });

  it('should handle null sourceCode', async () => {
    const response = await adapter.generateTest(null as any, 'language', 'fileName');
    expect(response).toEqual({ testCode: 'testCode' });
  });

  it('should handle null language', async () => {
    const response = await adapter.generateTest('sourceCode', null as any, 'fileName');
    expect(response).toEqual({ testCode: 'testCode' });
  });

  it('should handle null fileName', async () => {
    const response = await adapter.generateTest('sourceCode', 'language', null as any);
    expect(response).toEqual({ testCode: 'testCode' });
  });

  it('should handle undefined sourceCode', async () => {
    const response = await adapter.generateTest(undefined as any, 'language', 'fileName');
    expect(response).toEqual({ testCode: 'testCode' });
  });

  it('should handle undefined language', async () => {
    const response = await adapter.generateTest('sourceCode', undefined as any, 'fileName');
    expect(response).toEqual({ testCode: 'testCode' });
  });

  it('should handle undefined fileName', async () => {
    const response = await adapter.generateTest('sourceCode', 'language', undefined as any);
    expect(response).toEqual({ testCode: 'testCode' });
  });
});