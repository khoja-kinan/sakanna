import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    fallbacklng: "en",
    debug: false,

    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          "home": {
            "COMMUNITIES": "COMMUNITIES",
            "LATEST LAUNCHES": "LATEST LAUNCHES",
            "Follow us on Social Media": "Follow us on Social Media",
          },
          "nav": {
            "CALL US": "CALL US",
            "SALES & SUPPORT": "SALES & SUPPORT",
            "Contact Us": "Contact Us",
          },
          "contactus": {
            "Your name": "Your name",
            "Name is a required field.": "Name is a required field.",
            "Your email": "Your email",
            "Email is a required field.": "Email is a required field.",
            "Email invalid.": "Email invalid.",
            "Your number": "Your number",
            "Message": "Message",
            "Message is a required field.": "Message is a required field.",
            "Mail sent successfully.": "Mail sent successfully.",
            "opt": "Optional",
            "get": "Get In Touch",
            "con": "Contact Us",
            "locae": "Saudi Arabia - AL Khobar ",
            "locae-b": " Al-Jazirah Building",
            "submit": "Submit Now",
          },
          "footer": {
            "INFORMAITION": "INFORMAITION",
            "Contact Us": "Contact Us",
            "About Us": "About Us",
            "Privacy Policy": "Privacy Policy",
            "Terms of Service": " Terms of Service",
            "follow us": "follow us",
            "rights": "© 2022 Sakanna. All rights reserved",
          },
          "SearchBar": {
            "com": "Community",
            "bed": "Bedrooms",
            "price": "Price",
            "search": "Search Properties",
            "reg": "Register Your Interest",
          },
          "Comunity": {
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
            "1f": "1st Floor",
            "2f": "2nd Floor",
            "3f": "3rd Floor",
            "4f": "4th Floor",
            "5f": "5th Floor",
            "6f": "6th Floor",
            "7f": "7th Floor",
            "8f": "8th Floor",
            "9f": "9th Floor",
            "10f": "10th Floor",
            "11f": "11th Floor",
            "12f": "12th Floor",
            "13f": "13th Floor",
          },
          "Results": {
            "chk": "CHECK",
            "result": "Results",
          },
          "Dashboard": {
            "signInWelcome": "Hi, Welcome Back",
            "signInTitle": "Sign in to Sakanna",
            "signInInstructions": "Enter your details below.",
            "loginFormValidEmail": "Email must be a valid email address",
            "loginFormRequiredEmail": "Email is required",
            "loginFormRequiredPass": "Password is required",
            "loginFormEmail": "Email address",
            "loginFormPass": "Password",
            loginFormForgetPass: "Forgot password ?",
            loginFormForgetRememberMe: "Remember me",
            loginFormLoginButton: "Login",
            dashboardAppWelcome: "Hi, Welcome back",
            sideBarDashboard: "dashboard",
            sideBarUser: "users",
            sideBarSpecializations: "specializations",
            sideBarprivileges: "privileges",
            sideBarMedals: "medals",
            sideBarCountries: "countries",
            AccountPopoverLogout: "Logout",
            /*Comunities */
            sideBarComunities: "Comunities",
            ComunitiesPageTitle: "Comunities",
            ComunitiesPageSearchPlaceHolder: "Search Comunities...",
            ComunitiesAddNew: "Add New",
            ComunityDialogArName: "Arabic Name",
            ComunityDialogEnName: "English name",
            ComunityDialogArDescription: "Arabic Description",
            ComunityDialogEnDescription: "English Description",
            ComunityDialogLatitude: "Latitude",
            ComunityDialogLongitude: "Longitude",
            ComunityDialogLocation: "Location",
            ComunityDialoglocation_description_Ar:
              "Arabic Location Description",
            ComunityDialoglocation_description_En:
              "English Location Description",
            ComunityDialoglocation_image: "Location Image",
            ComunityDialoType: "Type",
          },
        },
      },
      ar: {
        translation: {
          "home": {
            "COMMUNITIES": "مجتماعاتنا",
            "LATEST LAUNCHES": "أحدث مشاريعنا",
            "Follow us on Social Media": "تابعنا على مواقع التواصل الاجتماعي ",
          },
          "nav": {
            "CALL US": "اتصل بنا ",
            "SALES & SUPPORT": "دعم المبيعات",
            "Contact Us": "راسلنا",
          },
          "contactus": {
            "Your name": "اسمك",
            "Name is a required field.": "الاسم مطلوب",
            "Your email": "بريدك الإلكتروني",
            "Email is a required field.": "البريد الإلكتروني مطلوب",
            "Email invalid.": "بريد اللكتروني غير صالح",
            "Your number": "رقم هاتفك",
            "Message": "رسالتك",
            "Message is a required field.": "الرسالة مطلوبة",
            "Mail sent successfully.": "تم ارسال الرسالة بنجاح .",
            "get": "لمتابعة جديدنا",
            "con": "تواصل معنا",
            "opt": "اختياري",
            "submit": "ارسل الرسالة",
            "locae": " المملكة العربية السعودية - الخبر",
            "locae-b": "  بناء الجزيرة ",
          },
          "footer": {
            "INFORMAITION": "معلومات",
            "Contact Us": "تواصل معنا",
            "About Us": "عن سكنا",
            "Privacy Policy": "سياسة الخصوصية",
            "Terms of Service": " شروط الخدمة",
            "follow us": "تابعنا",
            "rights": " سكنا العقارية ٢٠٢٢ جميع الحقوق محفوظة © ",
          },
          "SearchBar": {
            "com": "المجمع",
            "bed": "عدد الغرف",
            "price": "السعر",
            "search": "ابحث",
            "reg": "سجل اهتمامك",
          },
          "Comunity": {
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
          "Results": {
            "chk": "اختر",
            "result": "نتائج البحث",
          },
          Dashboard: {
            signInWelcome: "مرحبأً، أهلاً بعودتك",
            signInTitle: "تسجيل الدخول الى سكنا",
            signInInstructions: "يرجى ادخال بيانات اعتمادك.",
            loginFormValidEmail: "يجب ادخال صيغة بريد الكتروني صحيحة",
            loginFormRequiredEmail: "يرجى ادخال بريد التكتروني",
            loginFormRequiredPass: "يرجى ادخال كلمة المرور",
            loginFormEmail: "البريد الالكتروني",
            loginFormPass: "كلمة المرور",
            loginFormForgetPass: "هل نسيت كلمة المرور ؟",
            loginFormForgetRememberMe: "تذكرني",
            loginFormLoginButton: "تسجيل الدخول",
            dashboardAppWelcome: "أهلاً بك",
            sideBarDashboard: "لوحة التحكم",
            sideBarUser: "المستخدمين",
            sideBarSpecializations: "الاختصاصات",
            sideBarprivileges: "الصلاحيات",
            sideBarMedals: "الميداليات",
            sideBarCountries: "الدول",
            AccountPopoverLogout: "تسجيل الخروج",
            /*Comunities */
            sideBarComunities: "المجتمعات",
            ComunitiesPageTitle: "المجتمعات",
            ComunitiesPageSearchPlaceHolder: "ابحث عن مجتمع...",
            ComunitiesAddNew: "إضافة جديد",
            ComunityDialogArName: "الاسم العربي",
            ComunityDialogEnName: "الاسم الاجنبي",
            ComunityDialogArDescription: "الوصف العربي",
            ComunityDialogEnDescription: "الوصف الاجنبي",
            ComunityDialogLatitude: "خط العرض",
            ComunityDialogLongitude: "خط الطول",
            ComunityDialogLocation: "الموقع",
            ComunityDialoglocation_description_Ar: "الوصف العربي للموقع",
            ComunityDialoglocation_description_En: "الوصف الاجنبي للموقع",
            ComunityDialoglocation_image: "صورة الموقع",
            ComunityDialoType: "النوع",
          },
        },
      },
    },
  });

export default i18n;
/* 
   
   {t("Dashboard.ComunitiesAddNew")} 
   
   const { t } = useTranslation();
   
   
   */
