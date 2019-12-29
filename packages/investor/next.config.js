const nextConfigCreator = require("shared/next.config");
const path = require("path");

module.exports = nextConfigCreator.create("investor", path.resolve("./src"));
