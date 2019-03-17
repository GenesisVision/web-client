const getReportFiles = require("../shared/config-overrides.utils")
  .getReportFiles;
const rewireYarnWorkspaces = require("react-app-rewire-yarn-workspaces");

module.exports = function override(config, env) {
  let tsChecker = config.plugins.find(plugin => "reportFiles" in plugin);
  tsChecker.reportFiles = getReportFiles("manager");
  return rewireYarnWorkspaces(config, env);
};
