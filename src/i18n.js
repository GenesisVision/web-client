import { reactI18nextModule } from "react-i18next";
import Backend from "i18next-xhr-backend";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
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
      queryStringParams: { v: "0.0.1" }
    }
  });

export default i18n;
