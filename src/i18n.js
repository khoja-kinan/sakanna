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
            "opt": "Optional",
            "get":"Get In Touch",
            "con":"Contact Us",
            "locae":"Saudi Arabia - AL Khobar",
            "submit": "Submit Now",

          },
          footer: {
            INFORMAITION: "INFORMAITION",
            "Contact Us": "Contact Us",
            "About Us": "About Us",
            "Privacy Policy": "Privacy Policy",
            "Terms of Service": " Terms of Service",
            "follow us": "follow us",
            "rights": "© 2022 Sakanna. All rights reserved"
          },
          SearchBar:{
            "com": "Community",
            "bed": "Bedrooms",
            "price": "Price",
            "search": "Search Properties",
            "reg": "Register Your Interest",
          },
          Comunity: {
            "feel": "FELL THE FRESHNESS ",
            "res": "Residence ",
            "plan": "Residence Plan ",
            "prop": "PROPERTIES",
            "types": "Types",
            "area": "Area",
            "count": "Total Count In Project :",
            "bedno": "Bedroom Number :",
            "recption": "Reception :",
            "gus_to": "Guest Toilet :",
            "bed1": "Bedroom 1 :",
            "bed2": "Bedroom 2 : ",
            "master": "Master Bedroom : ",
            "dress": "Dressing room : ",
            "master_t": "Master Room Toilet : ",
            "kitchen": "Kitchen : ",
            "bath": "Bathroom :",
            "maid": "Maid Room :",
            "maid_t": "Maid Room Toilet : ",
            "storage": "Storage :",
            "land": "Laundry :",
            // "types": "Types",
            "Location": "Location ",
            "map": "VIEW ON GOOGLE MAP ",
            "resedd": "Residence",
            "design": "Design",
            "interior": "Interior",
          },
          Results :{
            "chk":"CHECK",
            "result":"Results"
          },
          
        },
      },
      ar: {
        translation: {
          home: {
            COMMUNITIES: "مجتماعاتنا",
            "LATEST LAUNCHES": "أحدث مشاريعنا",
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
            "Message": "رسالتك",
            "Message is a required field.": "الرسالة مطلوبة",
            "Mail sent successfully.": "تم ارسال الرسالة بنجاح .",
            "get":"لمتابعة جديدنا",
            "con":"تواصل معنا",
            "opt": "اختياري",
            "submit": "ارسل الرسالة",
            "locae":"المملكة العربية السعودية - الخبر",
          },
          footer: {
            "INFORMAITION": "معلومات",
            "Contact Us": "تواصل معنا",
            "About Us": "عن سكنا",
            "Privacy Policy": "سياسة الخصوصية",
            "Terms of Service": " شروط الخدمة",
            "follow us": "تابعنا",
            "rights": " سكنا العقارية ٢٠٢٢ جميع الحقوق محفوظة © "
          },
          SearchBar:{
            "com": "المجمع",
            "bed": "عدد الغرف",
            "price": "السعر",
            "search": "ابحث",
            "reg": "سجل اهتمامك",

          },
          Comunity: {
            "feel": "تمتع بالهواءالمنعش ",
            "res": "مجمع ",
            "plan": "مخطط المجمع  ",
            "types": "العقارات",
            "prop": "نمط ",
            "area": "المساحة",
            "count": "عدد الشقق في المشروع:",
            "bedno": "عدد غرف النوم:",
            "recption": "الاستقبال :",
            "gus_to": "تواليت الضيوف:",
            "bed1": "غرفة نوم 1 :",
            "bed2": "غرفة نوم 2 : ",
            "master": "غرفة نوم رئيسية : ",
            "dress": "غرفة الملابس : ",
            "master_t": "تواليت الغرفة الرئيسية ",
            "kitchen": "المطبخ : ",
            "bath": "الحمام :",
            "maid": "غرفة الخدم :",
            "maid_t": "تواليت غرفة الخدم : ",
            "storage": "التخزين :",
            "land": "غرفة الغسيل  :",
            "Location": "الموقع ",
            "map": "عرض على خريطة جوجل",
            "resedd": "مجمع",
            "design": "التصميم",
            "interior": "الداخلي",
          },
          Results :{
            "chk":"اختر",
            "result":"نتائج البحث"
          }
        },
      },
    },
  });

export default i18n;
