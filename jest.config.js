module.exports = {
  displayName: {
    name: 'MAD-LIBS',
    color: 'magenta',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/utils/Logger.js',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/$1',
    '^mocks/(.*)$': '<rootDir>/__mocks__/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },
};
