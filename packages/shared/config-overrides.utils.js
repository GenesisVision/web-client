module.exports.getReportFiles = repoName => [
  `../(${repoName}|shared)/**`,
  `!../(${repoName}|shared)**/*.json`,
  `!../(${repoName}|shared)**/__tests__/**`,
  `!../(${repoName}|shared)**/?(*.)(spec|test).*`,
  `!../(${repoName}|shared)**/src/setupProxy.*`,
  `!../(${repoName}|shared)**/src/setupTests.*`
];
