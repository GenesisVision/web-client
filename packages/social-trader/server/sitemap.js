const sitemap = require("sitemap");
const fetch = require("isomorphic-unfetch");
const { brotliCompressSync } = require("zlib");
const cacheableResponse = require("cacheable-response");

const programRoute = program => `invest/programs/${program}`;
const fundRoute = fund => `invest/funds/${fund}`;
const followRoute = follow => `invest/follow/${follow}`;
const userRoute = user => `users/${user}`;
const assetRoute = asset => `asset/${asset}`;

const TTL_OK = 1000 * 60 * 60 * 24;
const TTL_ERROR = 1000 * 3;
const MONTHLY = "monthly";
const ALWAYS = "always";
const DAILY = "daily";

const generateSitemap = dev => {
  if (dev) {
    console.info("dev");
    return async ({ res }) => {
      return res.status(500).end();
    };
  }
  return cacheableResponse({
    get: async () => {
      console.log("generate simemap.xml");
      try {
        const url = process.env.HOSTNAME;
        console.info(process.env.HOSTNAME);
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
          map.write({ url: programRoute(program), changefreq: ALWAYS });
        });

        pages.funds.forEach(fund => {
          map.write({ url: fundRoute(fund), changefreq: ALWAYS });
        });

        pages.follow.forEach(follow => {
          map.write({ url: followRoute(follow), changefreq: ALWAYS });
        });

        pages.users.forEach(user => {
          map.write({ url: userRoute(user), changefreq: ALWAYS });
        });

        pages.actives.forEach(asset => {
          map.write({
            url: assetRoute(asset),
            changefreq: MONTHLY,
            priority: 0.8
          });
        });

        map.write({ url: "invest/funds", changefreq: ALWAYS, priority: 0.7 });
        map.write({ url: "invest/follow", changefreq: ALWAYS, priority: 0.7 });
        map.write({
          url: "invest/programs",
          changefreq: ALWAYS,
          priority: 0.7
        });

        map.write({ url: "", changefreq: DAILY, priority: 0.9 });
        map.write({ url: "invest", changefreq: DAILY, priority: 0.7 });
        map.write({ url: "trading", changefreq: MONTHLY, priority: 0.7 });
        map.write({
          url: "referral-program",
          changefreq: MONTHLY,
          priority: 0.7
        });
        map.write({ url: "faq", changefreq: MONTHLY, priority: 0.8 });
        map.write({ url: "glossary", changefreq: MONTHLY, priority: 0.8 });
        map.write({ url: "aml-manual", changefreq: MONTHLY, priority: 0.8 });
        map.write({
          url: "privacy-policy",
          changefreq: MONTHLY,
          priority: 0.8
        });
        map.write({ url: "terms", changefreq: MONTHLY, priority: 0.8 });
        map.write({ url: "downloads", changefreq: MONTHLY, priority: 0.7 });

        map.end();

        const data = await sitemap.streamToPromise(map);

        return {
          data: brotliCompressSync(data),
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
      res.header("Content-Encoding", "br");

      res.send(data);
    }
  });
};

module.exports = generateSitemap;
