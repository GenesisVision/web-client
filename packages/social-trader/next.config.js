const path = require("path");
const dotenv = require("dotenv");
const fonts = require("nextjs-fonts");
const withPlugins = require("next-compose-plugins");
const images = require("next-images");
const workers = require("@zeit/next-workers");
const withBundleAnalyzer = require("@next/bundle-analyzer");
const withTM = require("next-transpile-modules")(["shared", "gv-api-web"]);

const isProd = process.env.NODE_ENV === "production";

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true"
});

function create(path) {
  if (isProd) {
    dotenv.config({ path: ".env.production" });
  }
  dotenv.config({ path: ".env.local" });
  dotenv.config({ path: ".env" });

  const nextConfig = {
    serverRuntimeConfig: {
      apiUrl: process.env.SERVER_API_URL
    },
    publicRuntimeConfig: {
      apiUrl: process.env.REACT_APP_API_URL
    },
    webpack(config, { dev, webpack }) {
      config.devtool = false;
      for (const r of config.module.rules) {
        if (r.loader === "babel-loader") {
          r.options.sourceMaps = false;
        }
      }

      config.resolve.alias = {
        ...config.resolve.alias,
        "lodash.throttle": "lodash/throttle",
        "lodash.debounce": "lodash/debounce"
      };

      if (isProd) {
        config.resolve.alias["lodash"] = "lodash-es";
      }

      config.resolve.modules.push(path);
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
      return config;
    }
  };
  return withPlugins(
    [
      analyzer,
      [
        {
          typescript: {
            ignoreDevErrors: true
          }
        }
      ],
      fonts,
      images,
      [
        workers,
        {
          workerLoaderOptions: { inline: true }
        }
      ],
      [withTM]
    ],
    nextConfig
  );
}

module.exports = create(path.resolve("./src"));
