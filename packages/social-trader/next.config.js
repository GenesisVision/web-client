const nextConfigCreator = require("shared/next.config");
const path = require("path");

module.exports = nextConfigCreator.create(
  "social-trader",
  path.resolve("./src")
);
