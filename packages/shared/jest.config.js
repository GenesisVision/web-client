module.exports = {
  setupFiles: ["<rootDir>/setupTests.ts"],
  collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts"],
  testMatch: [
    // "<rootDir>/**/__tests__/**/*.ts?(x)",
    "<rootDir>/**/*.ts"
    // "<rootDir>/**/__tests__/**/*.ts?(x)",
    // "<rootDir>/!**!/?(*.)+(spec|test).ts?(x)",
    // "<rootDir>/!**!/__tests__/!**!/!*.{js,jsx,ts,tsx}",
    // "<rootDir>/!**/?(*.)+(spec|test).{js,jsx,ts,tsx}"
  ]
};
