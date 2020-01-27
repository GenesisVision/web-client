const { brotliCompressSync } = require("zlib");
const cacheableResponse = require("cacheable-response");

const TTL_OK = 1000 * 60 * 60 * 24;
const TTL_ERROR = 1000 * 3;

const robotTxt = dev => {
  if (dev) {
    return async ({ res }) => {
      return res.status(500).end();
    };
  }
  return cacheableResponse({
    get: async () => {
      try {
        const url = process.env.HOSTNAME;
        return {
          ttl: TTL_OK,
          data: brotliCompressSync(`User-agent: *
${url ? `Sitemap: ${url}/sitemap.xml` : "Disallow: /"}`)
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

      res.header("Content-Type", "text/plain");
      res.header("Content-Encoding", "br");

      res.send(data);
    }
  });
};

module.exports = robotTxt;
