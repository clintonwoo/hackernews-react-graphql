module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec).ts?(x)'],
  verbose: true,
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig-server.json',
    },
  },
};
