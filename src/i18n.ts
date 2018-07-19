import * as i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';
import { culturecode } from './config/URL_PARAM';

i18n.use(LanguageDetector).init({
  // we init with resources
  debug: true,
  fallbackLng: 'en',
  resources: {
    en: {
      translations: {
        'EF Privacy Policy': 'EF Privacy Policy',
        'Yes, I agree': 'Yes, I agree',
      },
    },
    id: {
      translations: {
        'EF Privacy Policy': 'Kebijakan pribadi',
        'Yes, I agree': 'Saya setuju',
      },
    },
    ru: {
      translations: {
        'EF Privacy Policy': 'Политика конфиденциальности',
        'Yes, I agree': 'Я согласен',
      },
    },
    zh: {
      translations: {
        'EF Privacy Policy': '隐私政策',
        'Yes, I agree': '我同意',
      },
    },
  },

  // have a common namespace used around the full app
  ns: ['translations'],
  // tslint:disable-next-line:object-literal-sort-keys
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
});

switch (culturecode) {
  case 'zh-CN':
    i18n.changeLanguage('zh');
    break;
  case 'id-ID':
    i18n.changeLanguage('id');
    break;
  case 'ru-RU':
    i18n.changeLanguage('ru');
    break;
  default:
    i18n.changeLanguage('en');
    break;
}

export default i18n;
