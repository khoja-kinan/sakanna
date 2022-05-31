import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector) // passes i18n down to react-i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbacklng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    debug: true,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    resources: {
      en: {
        translation: {
          home: {
            COMMUNITIES: "COMMUNITIES",
            "LATEST LAUNCHES": "LATEST LAUNCHES",
            "Follow us on Social Media": "Follow us on Social Media",
          },
          nav: {
            "CALL US": "CALL US",
            "SALES & SUPPORT": "SALES & SUPPORT",
            "Contact Us": "Contact Us",
          },
          contactus: {
            "Your name": "Your name",
            "Name is a required field.": "Name is a required field.",
            "Your email": "Your email",
            "Email is a required field.": "Email is a required field.",
            "Email invalid.": "Email invalid.",
            "Your number": "Your number",
            Message: "Message",
            "Message is a required field.": "Message is a required field.",
            "Mail sent successfully.": "Mail sent successfully.",
          },
          footer: {
            INFORMAITION: "INFORMAITION",
            "Contact Us": "Contact Us",
            "About Us": "About Us",
            "Privacy Policy": "Privacy Policy",
            "Terms of Service": " Terms of Service",
            "follow us": "follow us",
          },
        },
      },
      ar: {
        translation: {
          home: {
            COMMUNITIES: "مجتماعاتنا",
            "LATEST LAUNCHES": "LATEST LAUNCHES",
            "Follow us on Social Media": "تابعنا على مواقع التواصل الاجتماعي ",
          },
          nav: {
            "CALL US": "اتصل بنا ",
            "SALES & SUPPORT": "دعم المبيعات",
            "Contact Us": "راسلنا",
          },
          contactus: {
            "Your name": "اسمك",
            "Name is a required field.": "الاسم مطلوب",
            "Your email": "بريدك الإلكتروني",
            "Email is a required field.": "البريد الإلكتروني مطلوب",
            "Email invalid.": "بريد اللكتروني غير صالح",
            "Your number": "رقم هاتفك",
            Message: "رسالتك",
            "Message is a required field.": "الرسالة مطلوبة",
            "Mail sent successfully.": "تم ارسال الرسالة بنجاح .",
          },
          footer: {
            INFORMAITION: "معلومات",
            "Contact Us": "تواصل معنا",
            "About Us": "عن سكنا",
            "Privacy Policy": "سياسة الخصوصية",
            "Terms of Service": " شروط الخدمة",
            "follow us": "تابعنا",
          },
        },
      },
    },
  });

export default i18n;
