import { createRouter, createWebHistory } from 'vue-router'
import Experience from '../views/Experience.vue'
import Portfolio from '../views/Portfolio.vue'
import Landing from '../views/Landing.vue'
import Register from '../views/Register.vue'
import useAuth from '@/composables/useAuth'

const { tokenStr } = useAuth()

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/experience/:type?',
    name: 'Experience',
    component: Experience,
    props: (route) => ({ type: route.params.type || 'course' }),
    meta: { requiresAuth: true, layout: 'AppLayout' }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio,
    meta: { requiresAuth: true, layout: 'AppLayout' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  // TODO: 進入每一個route的時候應該要檢查JWT Token是否合法。(現在暫時的作法是打出API後檢查Status code 是否為401)
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
