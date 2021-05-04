import { reactive, toRefs } from 'vue'
import router from '@/router/index'
import { login as loginAPI } from '@/api/auth'

const state = reactive({
  tokenStr: localStorage.getItem('auth') || '',
  error: null,
  isPending: false
})

const login = async ({ studentId, password }) => {
  try {
    state.isPending = true
    state.error = null

    const { data } = await loginAPI({ studentId, password })

    state.tokenStr = data.tokenStr
    localStorage.setItem('auth', data.tokenStr)
  } catch (error) {
    state.error = error
  } finally {
    state.isPending = false
  }
}

const logout = () => {
  state.tokenStr = ''
  localStorage.removeItem('auth')
  router.push({ name: 'Landing' })
}

const useAuth = () => {
  return { ...toRefs(state), login, logout }
}

export default useAuth
