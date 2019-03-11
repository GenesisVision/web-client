import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    ns: ["translations"],
    defaultNS: "translations",
    preload: ["en"],
    whitelist: ["en"],
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true
    },
    backend: {
      loadPath: `${process.env.REACT_APP_BASENAME}locales/{{lng}}/{{ns}}.json`,
      queryStringParams: { v: "0.0.5" }
    }
  });

export default i18n;
