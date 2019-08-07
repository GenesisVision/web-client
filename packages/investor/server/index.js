const express = require("express");
const next = require("next");
const dotenv = require("dotenv");
const nextI18NextMiddleware = require("next-i18next/middleware");

const nextI18next = require("shared/i18n");

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

if (!dev) {
  dotenv.config({ path: ".env.production" });
}

const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));

  server.get("*", (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
