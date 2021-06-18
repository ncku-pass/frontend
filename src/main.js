import { createApp } from 'vue'
import '@/scss/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import useAuth from '@/composables/useAuth'

async function startApp () {
  const { checkToken } = useAuth()
  if (localStorage.getItem('auth')) {
    await checkToken()
  }
  createApp(App).use(store).use(router).mount('#app')
}

startApp()
