module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/examples/**/*.test.ts', '**/examples/**/*.test.js'],
    collectCoverageFrom: [
        'examples/**/*.ts',
        'examples/**/*.js',
        '!examples/**/*.test.ts',
        '!examples/**/*.test.js'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
