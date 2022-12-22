import { createApp, computed } from 'vue'
import App from './App.vue'

// plugin
import router from './router'
import store from './store'
import VueGtag from 'vue-gtag'
import { Vue3Mq } from 'vue3-mq'

// styles
import '@/scss/index.scss'

import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import '@/scss/_theme.scss'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'

// icon
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

const someResumesNotSaved = computed(() => store.getters['resumes/someResumesNotSaved'])
window.onbeforeunload = () => {
  if (someResumesNotSaved.value) {
    return true
  }
}

async function startApp() {
  if (localStorage.getItem('auth')) {
    await store.dispatch('auth/checkToken')
  }
  createApp(App)
    .use(store)
    .use(router)
    .use(PrimeVue)
    .use(Vue3Mq, {
      breakpoints: {
        mobile: 0,
        tablet: 768,
        laptop: 1280,
        desktop: 1440,
      }
    })
    .use(mdiVue, { icons: mdijs })
    .use(VueGtag, {
      appName: process.env.VUE_APP_GA_APP_NAME,
      pageTrackerEnabled: true,
      pageTrackerScreenviewEnabled: true,
      config: {
        id: process.env.VUE_APP_GA_ID,
      }
    }, router)
    .use(ToastService)
    .use(ConfirmationService)
    .component('Button', Button)
    .component('ConfirmDialog', ConfirmDialog)
    .mount('#app')
}

startApp()
