const express = require("express");
const nextI18NextMiddleware = require("next-i18next/middleware");
const nextI18next = require("shared/i18n");

module.exports = async (app, port) => {
  const handle = app.getRequestHandler();
  await app.prepare();

  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));
  server.get("*", (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
};
