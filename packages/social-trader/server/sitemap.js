const sitemap = require("sitemap");
const fetch = require("isomorphic-unfetch");
const cacheableResponse = require("cacheable-response");

const programRoute = program => `invest/programs/${program}`;
const fundRoute = fund => `invest/funds/${fund}`;
const followRoute = follow => `invest/follow/${follow}`;
const assetRoute = asset => `asset/${asset}`;

const TTL_OK = 1000 * 60 * 60 * 24;
const TTL_ERROR = 1000 * 3;
const MONTHLY = "monthly";
const ALWAYS = "always";
const DAILY = "daily";

const generateSitemap = dev => {
  if (dev) {
    /*return async ({ res }) => {
      return res.status(500).end();
    };*/
  }
  return cacheableResponse({
    get: async () => {
      try {
        const hostname = process.env.HOSTNAME;

        if (hostname === undefined || typeof hostname !== "string")
          throw Error("process.env.HOSTNAME is not defined");

        const map = new sitemap.SitemapStream({
          hostname
        });

        const response = await fetch(
          process.env.REACT_APP_API_URL + "/v2.0/platform/sitemap"
        );
        const pages = await response.json();

        // Program details pages
        pages.programs.forEach(program => {
          map.write({ url: programRoute(program), changefreq: ALWAYS });
        });

        // Fund details pages
        pages.funds.forEach(fund => {
          map.write({ url: fundRoute(fund), changefreq: ALWAYS });
        });

        // Follow details pages
        pages.follow.forEach(follow => {
          map.write({ url: followRoute(follow), changefreq: ALWAYS });
        });

        // Asset details pages
        pages.actives.forEach(asset => {
          map.write({
            url: assetRoute(asset),
            changefreq: MONTHLY,
            priority: 0.8
          });
        });

        // Fund list page
        map.write({ url: "invest/funds", changefreq: ALWAYS, priority: 0.7 });
        // Follow list page
        map.write({ url: "invest/follow", changefreq: ALWAYS, priority: 0.7 });
        // Programs list page
        map.write({
          url: "invest/programs",
          changefreq: ALWAYS,
          priority: 0.7
        });

        // Landing page
        map.write({ url: "", changefreq: DAILY, priority: 0.9 });
        // Invest page
        map.write({ url: "invest", changefreq: DAILY, priority: 0.7 });
        // Trading page
        map.write({ url: "trade", changefreq: MONTHLY, priority: 0.7 });
        // Referral program page
        map.write({
          url: "referral-program",
          changefreq: MONTHLY,
          priority: 0.7
        });
        // FAQ page
        map.write({ url: "faq", changefreq: MONTHLY, priority: 0.8 });
        // Glossary page
        map.write({ url: "glossary", changefreq: MONTHLY, priority: 0.8 });
        // AML-manual page
        map.write({ url: "aml-manual", changefreq: MONTHLY, priority: 0.8 });
        // Privacy policy page
        map.write({
          url: "privacy-policy",
          changefreq: MONTHLY,
          priority: 0.8
        });
        // Terms page
        map.write({ url: "terms", changefreq: MONTHLY, priority: 0.8 });
        // Downloads page
        map.write({ url: "downloads", changefreq: MONTHLY, priority: 0.7 });

        map.end();

        const data = await sitemap.streamToPromise(map);

        return {
          data,
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

      res.send(data);
    }
  });
};

module.exports = generateSitemap;
