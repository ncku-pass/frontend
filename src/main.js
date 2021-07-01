import { createApp } from 'vue'
import '@/scss/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'

async function startApp () {
  if (localStorage.getItem('auth')) {
    await store.dispatch('auth/checkToken')
  }
  createApp(App).use(store).use(router).mount('#app')
}

startApp()
