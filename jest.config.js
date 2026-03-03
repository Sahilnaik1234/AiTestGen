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
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    }
};
