const nextJest = require('next/jest');
const tsconfig = require("./tsconfig.json")
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig)

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test
  // environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper,
  // moduleNameMapper: {
  //   // Handle module aliases (this will be automatically configured for you soon)
  //   '^@/components/(.*)$': '<rootDir>/components/$1',
  //   '^@/pages/(.*)$': '<rootDir>/pages/$1',
  // },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
      "<rootdir>/__tests__/__mocks__/"
  ]
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which
// is async
module.exports = createJestConfig(customJestConfig);
