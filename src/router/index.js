import { createRouter, createWebHistory } from 'vue-router'
import Experience from '../views/Experience.vue'
import Portfolio from '../views/Portfolio.vue'

const routes = [
  {
    path: '/experience/:type?',
    name: 'Experience',
    component: Experience,
    props: true
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
