const jestConfig = require('./jest');

describe('Jest Configuration', () => {
  it('should have a preset', () => {
    expect(jestConfig.preset).toBe('ts-jest');
  });

  it('should have a test environment', () => {
    expect(jestConfig.testEnvironment).toBe('node');
  });

  it('should have a test match pattern', () => {
    expect(jestConfig.testMatch).toEqual(['**/*.test.ts', '**/*.test.js']);
  });

  it('should collect coverage from specific files', () => {
    expect(jestConfig.collectCoverageFrom).toEqual([
      '**/*.{ts,js}',
      '!**/node_modules/**',
      '!**/dist/**',
      '!**/coverage/**',
      '!**/*.test.{ts,js}',
      '!dashboard/**'
    ]);
  });

  it('should have a coverage threshold', () => {
    expect(jestConfig.coverageThreshold).toEqual({
      global: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70
      }
    });
  });

  it('should have a global coverage threshold with specific values', () => {
    const globalThreshold = jestConfig.coverageThreshold.global;
    expect(globalThreshold.branches).toBe(70);
    expect(globalThreshold.functions).toBe(70);
    expect(globalThreshold.lines).toBe(70);
    expect(globalThreshold.statements).toBe(70);
  });
});