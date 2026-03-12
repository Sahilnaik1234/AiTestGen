module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts', '**/*.test.js'],
    collectCoverageFrom: [
        '**/*.{ts,js}',
        '!**/node_modules/**',
        '!**/dist/**',
        '!**/coverage/**',
        '!**/*.test.{ts,js}',
        '!dashboard/**'
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
