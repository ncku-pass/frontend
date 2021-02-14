import { createRouter, createWebHistory } from 'vue-router'
import Experience from '../views/Experience.vue'
import Protfolio from '../views/Protfolio.vue'

const routes = [
  {
    path: '/experience/:type?',
    name: 'Experience',
    component: Experience,
    props: true
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
