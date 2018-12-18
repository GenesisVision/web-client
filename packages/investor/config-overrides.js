const rewireYarnWorkspaces = require("react-app-rewire-yarn-workspaces");
const path = require("path");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

module.exports = function override(config, env) {
  const plugin = config.resolve.plugins.find(
    plugin => plugin instanceof ModuleScopePlugin
  );
  if (plugin && plugin.appSrcs) {
    const root = plugin.appSrcs[0];
    plugin.appSrcs.push(path.join(root, "..", "..", "shared"));
  }
  return rewireYarnWorkspaces(config, env);
};
