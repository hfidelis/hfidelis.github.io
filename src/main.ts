import '@/styles.css'
import 'floating-vue/dist/style.css'

import SvgIcon from '@jamescoyle/vue-icon'
import FloatingVue from 'floating-vue'

import Layout from '@/layout/Layout.vue'
import Spinner from '@/components/spinner/Spinner.vue'
import FadeTransition from '@/components/fade-transition/FadeTransition.vue'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import i18n from '@/i18n'

const app = createApp(App)

app
  .use(router)
  .use(i18n)
  .use(FloatingVue)
  .component('SvgIcon', SvgIcon)
  .component('Layout', Layout)
  .component('Spinner', Spinner)
  .component('FadeTransition', FadeTransition)

app.mount('#app')
