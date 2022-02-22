const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  timers: 'fake',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/scripts/jest.setup.ts'],
  moduleNameMapper: { '^@/src/(.*)$': '<rootDir>/src/$1' },
}

module.exports = createJestConfig(customJestConfig)
