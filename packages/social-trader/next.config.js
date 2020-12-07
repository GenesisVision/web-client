const path = require("path");
const dotenv = require("dotenv");
const fonts = require("nextjs-fonts");
const withPlugins = require("next-compose-plugins");
const images = require("next-images");
const workers = require("@zeit/next-workers");
const withBundleAnalyzer = require("@next/bundle-analyzer");
const withTM = require("next-transpile-modules")(["shared", "gv-api-web"]);

const isProd = process.env.NODE_ENV === "production";

const enablePreact = true;

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
    experimental: {
      modern: true,
      polyfillsOptimization: true
    },
    serverRuntimeConfig: {
      apiUrl: process.env.SERVER_API_URL
    },
    publicRuntimeConfig: {
      apiUrl: process.env.REACT_APP_API_URL
    },
    webpack(config, { isServer }) {
      if (isServer && enablePreact) {
        // Move Preact into the framework chunk instead of duplicating in routes:
        const splitChunks =
          config.optimization && config.optimization.splitChunks;
        if (splitChunks) {
          const cacheGroups = splitChunks.cacheGroups;
          const test = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/;
          if (cacheGroups.framework) {
            cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
              test
            });
            // if you want to merge the 2 small commons+framework chunks:
            // cacheGroups.commons.name = 'framework';
          }
        }

        // mark `preact` stuffs as external for server bundle to prevent duplicate copies of preact
        config.externals.push(
          /^(preact|preact-render-to-string|preact-context-provider)([\\/]|$)/
        );
      }

      if (true && enablePreact) {
        config.resolve.alias = {
          ...config.resolve.alias,
          react: "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat"
        };
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
