const express = require("express");
const nextI18NextMiddleware = require("next-i18next/middleware").default;
const nextI18next = require("../src/i18n");
const cacheableResponse = require("cacheable-response");
const generateSitemap = require("./sitemap");
const robotTxt = require("./robot");

module.exports = async app => {
  const handle = app.getRequestHandler();

  const ssrCache = cacheableResponse({
    ttl: 1000 * 60 * 5,
    get: async ({ req, res, pagePath, queryParams }) => ({
      data: await app.renderToHTML(req, res, pagePath, queryParams)
    }),
    send: ({ data, res }) => res.send(data)
  });

  await app.prepare();
  const dev = process.env.NODE_ENV !== "production";
  const sitemap = generateSitemap(dev);
  const robot = robotTxt(dev);

  const server = express();
  const port = process.env.PORT || 3000;
  await nextI18next.initPromise;
  server.use(nextI18NextMiddleware(nextI18next));

  server.get("/robots.txt", (req, res) =>
    robot({ req, res, pagePath: "/robots.txt" })
  );

  server.get("/sitemap.xml", (req, res) =>
    sitemap({ req, res, pagePath: "/sitemap.xml" })
  );
  server.get("/", (req, res) => ssrCache({ req, res, pagePath: "/" }));
  server.get("*", (req, res) => handle(req, res));
  server.post("*", (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
};
