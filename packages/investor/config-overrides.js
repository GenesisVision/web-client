const rewireYarnWorkspaces = require("react-app-rewire-yarn-workspaces");
const path = require("path");

module.exports = function override(config, env) {
  const plugin = config.resolve.plugins.find(plugin => "appSrcs" in plugin);
  if (plugin && plugin.appSrcs) {
    const root = plugin.appSrcs[0];
    plugin.appSrcs.push(path.join(root, "..", "..", "shared"));
  }
  return rewireYarnWorkspaces(config, env);
};
