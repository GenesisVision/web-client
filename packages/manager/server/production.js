const express = require("express");
const nextI18NextMiddleware = require("next-i18next/middleware");
const nextI18next = require("shared/i18n");

module.exports = async (app, port) => {
  const handle = app.getRequestHandler();
  await app.prepare();

  const platform = process.env.REACT_APP_PLATFORM;

  const server = express();
  const manager = express();

  manager.use(nextI18NextMiddleware(nextI18next));

  manager.get("*", (req, res) => handle(req, res));

  server.use("/" + platform, manager);
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
};
