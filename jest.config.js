const { makeJestConfig } = require('jest-simple-config');

const config = makeJestConfig({
  setupFilesAfterEnv: ['./tests/setupTests.js'],
  testMatch: ['**/tests/**/*.jest.js'],
  collectCoverageFrom: ['./index.js'],
});

module.exports = config;
