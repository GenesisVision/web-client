const dev = process.env.NODE_ENV !== "production";

module.exports = {
  presets: ["next/babel"],
  plugins: [["styled-components", { ssr: !dev, displayName: dev }]]
};
