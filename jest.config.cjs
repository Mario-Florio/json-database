
module.exports = {
  testEnvironment: 'node',          // Node environment for your tests
  testMatch: [                      // Where Jest will look for test files
    '**/__tests__/**/*.test.js',
  ],
  moduleFileExtensions: ['js'],     // Only .js files
  verbose: true,                    // Show each test result
  bail: false,                      // Continue running all tests even if some fail
};

