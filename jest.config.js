module.exports = {
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    moduelFileExtensions: ['js', 'ts'],
    testMatch: ['**/test/**/*.test.ts'],
    testEnvironment: 'node'
}