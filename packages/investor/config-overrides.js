const getReportFiles = require("../shared/config-overrides.utils")
  .getReportFiles;
const rewireYarnWorkspaces = require("react-app-rewire-yarn-workspaces");

module.exports = function override(config, env) {
  let tsChecker = config.plugins.find(plugin => "reportFiles" in plugin);
  config.output = { ...config.output, globalObject: "this" };
  config.resolve.alias = {
    ...config.resolve.alias,
    lodash: "lodash-es",
    "lodash.throttle": "lodash-es/throttle",
    "lodash.debounce": "lodash-es/debounce"
  };
  tsChecker.reportFiles = [...tsChecker.reportFiles, ...getReportFiles()];
  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: "worker-loader" }
  });
  return rewireYarnWorkspaces(config, env);
};
