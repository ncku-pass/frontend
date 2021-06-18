import { reactive, toRefs } from 'vue'
import router from '@/router/index'
import { login as loginAPI, register as registerAPI, checkToken as checkTokenAPI } from '@/api/auth'

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

const register = async ({
  email,
  name,
  password,
  confirmPassword,
  studentId,
  major,
  graduationYear
}) => {
  try {
    state.isPending = true
    state.error = null
    const { data } = await registerAPI({
      email,
      name,
      password,
      confirmPassword,
      studentId,
      major,
      graduationYear: ~~graduationYear // ~~ 把string轉成number
    })
    state.tokenStr = data.tokenStr
    localStorage.setItem('auth', data.tokenStr)
  } catch (err) {
    state.error = err
  } finally {
    state.isPending = false
  }
}

const checkToken = async () => {
  try {
    await checkTokenAPI()
  } catch (error) {
    state.tokenStr = ''
    localStorage.removeItem('auth')
  }
}

const useAuth = () => {
  return { ...toRefs(state), login, logout, register, checkToken }
}

export default useAuth
