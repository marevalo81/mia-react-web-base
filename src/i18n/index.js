import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./locales/es.json";
import en from "./locales/en.json";

const resources = {
  es: {
    translation: es,
  },
  en: {
    translation: en,
  },
};

const savedLanguage = localStorage.getItem("mia-language");

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage || "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (language) => {
  localStorage.setItem("mia-language", language);
});

export default i18n;
