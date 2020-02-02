const path = require("path");
const dotenv = require("dotenv");
const tm = require("next-transpile-modules");
const sass = require("@zeit/next-sass");
const css = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");
const images = require("next-images");
const workers = require("@zeit/next-workers");
const withBundleAnalyzer = require("@next/bundle-analyzer");

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
      sass,
      css,
      images,
      [
        workers,
        {
          workerLoaderOptions: { inline: true }
        }
      ],
      [
        tm,
        {
          transpileModules: ["shared", "gv-api-web"]
        }
      ]
    ],
    nextConfig
  );
}

module.exports = create(path.resolve("./src"));
