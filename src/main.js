import { createApp, computed } from 'vue'
import '@vueform/multiselect/themes/default.css'
import 'vue-toastification/dist/index.css'
import '@/scss/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'vue-toastification'
import { Vue3Mq } from 'vue3-mq'
import VueGtag from 'vue-gtag'

const toastConfig = {
  transition: 'Vue-Toastification__fade',
  timeout: 4000,
  position: 'top-center',
  draggable: true
}
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
    .use(Toast, toastConfig)
    .use(store)
    .use(router)
    .use(Vue3Mq, {
      breakpoints: {
        phone: 0,
        tablet: 768,
        laptop: 1280,
        desktop: 1370,
      }
    })
    .use(VueGtag, {
      appName: process.env.VUE_APP_GA_APP_NAME,
      pageTrackerEnabled: true,
      pageTrackerScreenviewEnabled: true,
      config: {
        id: process.env.VUE_APP_GA_ID,
      }
    }, router)
    .mount('#app')
}

startApp()
