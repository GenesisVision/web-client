module.exports = {
  jest: function(config) {
    config.transformIgnorePatterns = [config.transformIgnorePatterns[1]];
    config.setupFiles = ["<rootDir>/setupTests.ts"];
    config.collectCoverageFrom = ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts"];
    config.testMatch = [
      "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
    ];
    return config;
  }
};
