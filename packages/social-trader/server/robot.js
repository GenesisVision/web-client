const cacheableResponse = require("cacheable-response");
const { SIGNUP_ROUTE, LOGIN_ROUTE } = require("../src/routes/app.routes");
const {
  FORGOT_PASSWORD_ROUTE
} = require("../src/pages/auth/forgot-password/forgot-password.routes");

const TTL_OK = 1000 * 60 * 60 * 24;
const TTL_ERROR = 1000 * 3;

const lineBreak = "\n";

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
        const userAgentLine = "User-agent: *";
        const siteMapLine = `Sitemap: ${url}/sitemap.xml`;
        const dissalowLines = [
          `Disallow: ${FORGOT_PASSWORD_ROUTE}`,
          `Disallow: ${LOGIN_ROUTE}`,
          `Disallow: ${SIGNUP_ROUTE}`,
          "Disallow: /?gclid=",
          "Disallow: /?utm_source=",
          "Disallow: /?yclid=",
          "Disallow: /_openstat"
        ];
        const disallowAllLine = "Disallow: /";
        const data =
          userAgentLine +
          lineBreak +
          (url
            ? dissalowLines.join(lineBreak) + lineBreak + siteMapLine
            : disallowAllLine);
        return {
          ttl: TTL_OK,
          data
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

      res.send(data);
    }
  });
};

module.exports = robotTxt;
