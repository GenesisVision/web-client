const dotenvExtended = require("dotenv-extended");
const dotenv = require("dotenv");
const getenv = require("getenv");

dotenvExtended.load();
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

module.exports = (on, config) => {
  config.testUserName = getenv.string("CYPRESS_TEST_USER_NAME", "");
  config.testUserPassword = getenv.string("CYPRESS_TEST_USER_PASSWORD", "");
  config.baseUrl = getenv.string("CYPRESS_BASE_URL", "");
  return config;
};
