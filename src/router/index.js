import { createRouter, createWebHistory } from 'vue-router'
import Experience from '../views/Experience.vue'
import Portfolio from '../views/Portfolio.vue'
import Landing from '../views/Landing.vue'
import useAuth from '@/composables/useAuth'

const { tokenStr } = useAuth()

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
    props: (route) => ({ type: route.params.type || 'course' }),
    meta: { requiresAuth: true }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  console.log(to)
  if (to.name === 'Landing' && tokenStr.value) {
    return {
      name: 'Experience'
    }
  }
  if (to.meta.requiresAuth && !tokenStr.value) {
    return {
      path: '/'
      // query: { redirect: to.fullPath }
    }
  }
})

export default router
