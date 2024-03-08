import '@/styles/app.scss'

import 'floating-vue/dist/style.css'

import SvgIcon from '@jamescoyle/vue-icon'
import FloatingVue from 'floating-vue'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import i18n from '@/i18n'

createApp(App)
  .use(router)
  .use(i18n)
  .use(FloatingVue)
  .component('SvgIcon', SvgIcon)
  .mount('#app')
