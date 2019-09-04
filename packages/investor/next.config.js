//@ts-ignore
const tm = require("next-transpile-modules");
const sass = require("@zeit/next-sass");
const css = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");
const images = require("next-images");
const workers = require("@zeit/next-workers");
const path = require("path");
const dotenv = require("dotenv");

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  webpack(config, { dev, webpack, buildId, isServer }) {
    if (!dev) {
      dotenv.config({ path: ".env.production" });
    }
    dotenv.config({ path: ".env.local" });
    dotenv.config({ path: ".env" });
    config.resolve.modules.push(path.resolve("./src"));
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  },
  assetPrefix: isProd ? "/investor" : ""
};

module.exports = withPlugins(
  [
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
