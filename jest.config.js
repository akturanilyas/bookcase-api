module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.test.(ts)'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testTimeout: 10000,
};
