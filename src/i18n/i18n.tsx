import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './translation.en';
import bnTranslation from './translation.bn';

const resources = {
  en: {
    translation: enTranslation,
  },
  bn: {
    translation: bnTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'bn',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
