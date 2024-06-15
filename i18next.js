// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Welcome": "Welcome",
      " Language": "Change Language",
      "Settings": "Settings"
    }
  },
  العربية: {
    translation: {
      "Welcome": "أهلا بك",
      "Language": "غير اللغة",
      "Settings": "الإعدادات",
      "Notifications": "الاشعارات"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON:'v3',
    resources,
    lng: 'العربية', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
