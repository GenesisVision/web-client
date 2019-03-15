module.exports.getReportFiles = repoName => [
  `../(${repoName}|shared)/**`,
  `!../**/*.json`,
  `!../**/__tests__/**`,
  `!../**/?(*.)(spec|test).*`,
  `!../**/src/setupProxy.*`,
  `!../**/src/setupTests.*`,
  `!../**/*.js`
];
