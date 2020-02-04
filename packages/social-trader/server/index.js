const next = require("next");
const dotenv = require("dotenv");
const server = require("./server");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

if (dev) {
  dotenv.config({ path: ".env.local" });
  dotenv.config({ path: ".env" });
  server(app);
} else {
  dotenv.config({ path: ".env.production" });
  dotenv.config({ path: ".env.local" });
  dotenv.config({ path: ".env" });
  server(app);
}
