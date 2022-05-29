import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector  from "i18next-browser-languagedetector";
import TranslationEn from "./translations/en.json"
import TranslationAr from "./translations/ar.json"
const resources = {
  en: {
    translation: TranslationEn
  },
  ar: {
    translation: TranslationAr
  }
};

i18n
  .use(LanguageDetector) // passes i18n down to react-i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
        useSuspense: false
    }
  });

  export default i18n;