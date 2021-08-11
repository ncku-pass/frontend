import { createApp } from 'vue'
import '@vueform/multiselect/themes/default.css'
import 'vue-toastification/dist/index.css'
import '@/scss/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'vue-toastification'

const toastConfig = {
  transition: 'Vue-Toastification__fade',
  timeout: 2500,
  position: 'top-center',
  draggable: true
}

async function startApp () {
  if (localStorage.getItem('auth')) {
    await store.dispatch('auth/checkToken')
  }
  createApp(App)
    .use(Toast, toastConfig)
    .use(store)
    .use(router)
    .mount('#app')
}

startApp()
