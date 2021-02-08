import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Protfolio from '../views/Protfolio.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/protfolio',
    name: 'Protfolio',
    component: Protfolio
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
