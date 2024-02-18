import {
  createI18n,
  type VueMessageType,
  type LocaleMessages
} from 'vue-i18n';

import ptBrLocale from '@/locales/pt-BR.json';
import enUsLocale from '@/locales/en-US.json';

type LocaleDict = {
  [key: string]: LocaleMessages<VueMessageType>
};

const messages: LocaleDict = {
  'pt-BR': ptBrLocale,
  'en-US': enUsLocale,
};

const i18n = createI18n({
  fallbackLocale: 'pt-br',
  globalInjection: true,
  locale: 'pt-br',
  legacy: false,
  messages,
});

export default i18n;
