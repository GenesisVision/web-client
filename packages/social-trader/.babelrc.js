const dev = process.env.NODE_ENV !== "production";

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "babel-plugin-styled-components",
      {
        pure: true,
        minify: true,
        transpileTemplateLiterals: true,
        fileName: dev,
        displayName: dev,
        ssr: true
      }
    ]
  ]
};
