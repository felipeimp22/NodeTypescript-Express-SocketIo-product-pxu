module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      "^@utils/(.*)$": "<rootDir>/src/utils/$1"
    }
  };
  

// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   maxWorkers: 1,
//   maxConcurrency: 1,
// };