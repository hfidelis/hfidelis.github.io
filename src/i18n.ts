import {
  createI18n,
  type I18nOptions,
} from 'vue-i18n'

import LocaleDict from '@/types/i18n/LocaleDict'

import ptBR from '@/locales/pt-BR.json'
import enUS from '@/locales/en-US.json'

const messages: LocaleDict = {
  'pt-BR': ptBR,
  'en-US': enUS,
}

const options: I18nOptions = {
  fallbackLocale: 'pt-BR',
  globalInjection: true,
  locale: 'pt-BR',
  legacy: false,
  messages,
}

const i18n = createI18n(options)

export default i18n