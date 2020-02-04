const NextI18Next = require("next-i18next").default;

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["de"],
  defaultNS: "translations",
  browserLanguageDetection: false,
  localePath: typeof window === "undefined" ? "public/locales" : "locales"
});

module.exports = NextI18NextInstance;

module.exports.withTranslation = NextI18NextInstance.withTranslation;
module.exports.appWithTranslation = NextI18NextInstance.appWithTranslation;
module.exports.useTranslation = NextI18NextInstance.useTranslation;
