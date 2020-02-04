const rewireYarnWorkspaces = require("react-app-rewire-yarn-workspaces");
const rewireReactHotLoader = require("react-app-rewire-hot-loader");

const reportFiles = [
  `../shared/**`,
  `!../shared/**/*.json`,
  `!../shared/**/__tests__/**`,
  `!../shared/**/?(*.)(spec|test).*`,
  `!../shared/**/src/setupProxy.*`,
  `!../shared/**/src/setupTests.*`,
  `!../shared/**/*.js`
];

const getReportFiles = config => {
  let tsChecker = config.plugins.find(plugin => "reportFiles" in plugin);
  tsChecker.reportFiles = [...tsChecker.reportFiles, ...reportFiles];
  return config;
};

const addAlias = (config, env) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    "lodash.throttle": "lodash/throttle",
    "lodash.debounce": "lodash/debounce",
    "react-dom": "@hot-loader/react-dom"
  };
  if (env === "production") {
    config.resolve.alias["lodash"] = "lodash-es";
  }
  return config;
};

const addRules = config => {
  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: "worker-loader" }
  });
  return config;
};

module.exports.rewireConfig = (config, env) => {
  config.output = { ...config.output, globalObject: "this" };
  const configWithReports = getReportFiles(config);
  const configWithRules = addRules(configWithReports);
  const configWithAliases = addAlias(configWithRules, env);
  const rhl = rewireReactHotLoader(configWithAliases, env);
  return rewireYarnWorkspaces(rhl, env);
};
