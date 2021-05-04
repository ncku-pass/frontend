import { reactive, toRefs } from 'vue'
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
    console.log(error)
  } finally {
    state.isPending = false
  }
}

const useAuth = () => {
  return { ...toRefs(state), login }
}

export default useAuth
