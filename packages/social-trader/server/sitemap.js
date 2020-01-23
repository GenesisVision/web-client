const sitemap = require("sitemap");
const fetch = require("isomorphic-unfetch");
const { gzipSync } = require("zlib");
const cacheableResponse = require("cacheable-response");

const programRoute = program => `invest/programs/${program}`;
const fundRoute = fund => `invest/funds/${fund}`;
const followRoute = follow => `invest/follow/${follow}`;
const userRoute = user => `users/${user}`;
const assetRoute = asset => `asset/${asset}`;

const TTL_OK = 1000 * 60 * 60 * 24;
const TTL_ERROR = 1000 * 3;

const generateSitemap = cacheableResponse({
  get: async () => {
    console.log("generate simemap.xml");
    try {
      const url = process.env.HOSTNAME;
      if (url === undefined || typeof url !== "string")
        throw Error("process.env.HOSTNAME is not defined");

      const map = new sitemap.SitemapStream({
        hostname: process.env.HOSTNAME
      });

      const response = await fetch(
        process.env.REACT_APP_API_URL + "/v2.0/platform/sitemap"
      );
      const pages = await response.json();

      pages.programs.forEach(program => {
        map.write({ url: programRoute(program) });
      });

      pages.funds.forEach(fund => {
        map.write({ url: fundRoute(fund) });
      });

      pages.follow.forEach(follow => {
        map.write({ url: followRoute(follow) });
      });

      pages.users.forEach(user => {
        map.write({ url: userRoute(user) });
      });

      pages.actives.forEach(asset => {
        map.write({ url: assetRoute(asset) });
      });

      map.end();

      const data = await sitemap.streamToPromise(map);

      return {
        data: gzipSync(data),
        ttl: TTL_OK
      };
    } catch (e) {
      return { data: null, error: e.message, ttl: TTL_ERROR };
    }
  },
  send: ({ data, res, error }) => {
    if (typeof error === "string") {
      console.error(error);
      return res.status(500).end();
    }

    res.header("Content-Type", "application/xml");
    res.header("Content-Encoding", "gzip");

    res.send(data);
  }
});

module.exports = generateSitemap;
