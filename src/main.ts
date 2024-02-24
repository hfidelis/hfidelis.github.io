import '@/styles/app.scss'

import SvgIcon from '@jamescoyle/vue-icon'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import i18n from '@/i18n'

createApp(App)
  .use(router)
  .use(i18n)
  .component('SvgIcon', SvgIcon)
  .mount('#app')
