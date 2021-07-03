import { computed } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Experience from '../views/Experience.vue'
import Portfolio from '../views/Portfolio.vue'
import Landing from '../views/Landing.vue'
import Register from '../views/Register.vue'

const tokenStr = computed(() => store.state.auth.tokenStr)

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
    props: (route) => {
      if (route.params.type && ['course', 'activity', 'competition', 'work', 'certificate', 'other'].indexOf(route.params.type) === -1) {
        return { type: 'course' }
      }
      return { type: route.params.type || 'course' }
    },
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
