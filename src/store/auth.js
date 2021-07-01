import router from '@/router/index'
import { login as loginAPI, register as registerAPI, checkToken as checkTokenAPI } from '@/api/auth'

const auth = {
  namespaced: true,
  state: () => ({
    tokenStr: localStorage.getItem('auth') || '',
    error: null,
    isPending: false
  }),
  mutations: {
    SET_TOKEN (state, token) {
      state.tokenStr = token
      localStorage.setItem('auth', token)
    },
    REMOVE_TOKEN (state) {
      state.tokenStr = ''
      localStorage.removeItem('auth')
      router.push({ name: 'Landing' })
    },
    SET_STATUS (state, { error = null, isPending = false }) {
      state.error = error
      state.isPending = isPending
    }
  },
  actions: {
    async login ({ commit }, { studentId, password }) {
      try {
        commit('SET_STATUS', { isPending: true, error: null })

        const { data } = await loginAPI({ studentId, password })

        commit('SET_TOKEN', data.tokenStr)
      } catch (error) {
        commit('SET_STATUS', { error })
      } finally {
        commit('SET_STATUS', { isPending: false })
      }
    },
    logout ({ commit }) {
      commit('REMOVE_TOKEN')
    },
    async register ({ commit }, {
      email,
      name,
      password,
      confirmPassword,
      studentId,
      major,
      graduationYear
    }) {
      try {
        commit('SET_STATUS', { isPending: true, error: null })

        const { data } = await registerAPI({
          email,
          name,
          password,
          confirmPassword,
          studentId,
          major,
          graduationYear: ~~graduationYear // ~~ 把string轉成number
        })

        commit('SET_TOKEN', data.tokenStr)
      } catch (error) {
        commit('SET_STATUS', { error })
      } finally {
        commit('SET_STATUS', { isPending: false })
      }
    },
    async checkToken ({ commit }) {
      try {
        await checkTokenAPI()
      } catch (error) {
        commit('REMOVE_TOKEN')
        router.push({ name: 'Landing' })
      }
    }
  },
  getters: {
  }
}

export default auth
