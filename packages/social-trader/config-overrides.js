const { rewireConfig } = require("../shared/config-overrides.utils");

module.exports = function override(config, env) {
  return rewireConfig(config, env);
};
