import {
  type VueMessageType,
  type LocaleMessages
} from 'vue-i18n'

import Locale from '@/types/i18n/Locale'

type LocaleDict = {
  [key in Locale]: LocaleMessages<VueMessageType | any>
}

export default LocaleDict
