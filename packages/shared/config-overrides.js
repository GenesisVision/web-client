const rewireYarnWorkspaces = require("react-app-rewire-yarn-workspaces");

module.exports = {
  jest: function(config) {
    config.setupFiles = ["<rootDir>/setupTests.ts"];
    config.collectCoverageFrom = ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts"];
    config.testMatch = [
      "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
    ];
    return config;
  }
};
