import i18n from "i18next";
import detector from "i18next-browser-languagedetector";

import translationEN from "./translations/en";
import translationVI from "./translations/vi";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translations: translationEN,
  },
  vi: {
    translations: translationVI,
  },
};

i18n
  .use(initReactI18next)
  .use(detector)
  .init({
    resources,
    lng: localStorage.getItem("i18nextLng") || "en",
    fallbackLng: "en",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
