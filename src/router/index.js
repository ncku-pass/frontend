import { createRouter, createWebHistory } from 'vue-router'
import Experience from '../views/Experience.vue'
import Portfolio from '../views/Portfolio.vue'
import Landing from '../views/Landing.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/experience/:type?',
    name: 'Experience',
    component: Experience,
    props: (route) => ({ type: route.params.type || 'course' })
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
