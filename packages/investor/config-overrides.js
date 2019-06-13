const getReportFiles = require("../shared/config-overrides.utils")
  .getReportFiles;
const rewireYarnWorkspaces = require("react-app-rewire-yarn-workspaces");
const rewireReactHotLoader = require("react-app-rewire-hot-loader");

module.exports = function override(config, env) {
  let tsChecker = config.plugins.find(plugin => "reportFiles" in plugin);
  config.output = { ...config.output, globalObject: "this" };
  config.resolve.alias = {
    ...config.resolve.alias,
    "lodash.throttle": "lodash/throttle",
    "lodash.debounce": "lodash/debounce",
    "react-dom": "@hot-loader/react-dom"
  };
  if (env === "production") {
    config.resolve.alias["lodash"] = "lodash-es";
  }
  tsChecker.reportFiles = [...tsChecker.reportFiles, ...getReportFiles()];
  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: "worker-loader" }
  });
  const rhl = rewireReactHotLoader(config, env);
  return rewireYarnWorkspaces(rhl, env);
};
