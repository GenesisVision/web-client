const next = require("next");
const dotenv = require("dotenv");
const devServer = require("./dev");
const prodServer = require("./production");

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

if (dev) {
  devServer(app, port);
} else {
  dotenv.config({ path: ".env.production" });
  prodServer(app, port);
}
