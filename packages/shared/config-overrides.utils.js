// @ts-ignore
module.exports.getReportFiles = () => [
  `../shared/**`,
  `!../shared/**/*.json`,
  `!../shared/**/__tests__/**`,
  `!../shared/**/?(*.)(spec|test).*`,
  `!../shared/**/src/setupProxy.*`,
  `!../shared/**/src/setupTests.*`,
  `!../shared/**/*.js`
];
