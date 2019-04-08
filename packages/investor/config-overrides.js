const getReportFiles = require("../shared/config-overrides.utils")
  .getReportFiles;
const rewireYarnWorkspaces = require("react-app-rewire-yarn-workspaces");

module.exports = function override(config, env) {
  let tsChecker = config.plugins.find(plugin => "reportFiles" in plugin);
  tsChecker.reportFiles = [...tsChecker.reportFiles, ...getReportFiles()];
  config.plugins = config.plugins.filter(plugin => !plugin.fullBuildTimeout);
  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: "worker-loader" }
  });
  return rewireYarnWorkspaces(config, env);
};
