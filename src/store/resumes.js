import { getResumes as getResumesAPI, saveResume as saveResumeAPI } from '@/api/resumes'

const resumes = {
  namespaced: true,
  state: () => ({
    resumes: [],
    error: null,
    isPending: false
  }),
  mutations: {
    SET_RESUMES (state, resumes) {
      state.resumes = resumes
    },
    SET_STATUS (state, { error = null, isPending = false }) {
      state.error = error
      state.isPending = isPending
    }
  },
  actions: {
    async getResumes ({ commit }) {
      try {
        commit('SET_STATUS', { isPending: true, error: null })

        const { data } = await getResumesAPI()

        commit('SET_RESUMES', data)
      } catch (error) {
        commit('SET_STATUS', { error })
      } finally {
        commit('SET_STATUS', { isPending: false })
      }
    },
    async saveResume ({ commit }, { resumeId, data }) {
      try {
        commit('SET_STATUS', { isPending: true, error: null })

        const res = await saveResumeAPI(resumeId, data)
        console.log(res)
      } catch (error) {
        commit('SET_STATUS', { error })
      } finally {
        commit('SET_STATUS', { isPending: false })
      }
    }
  }
}

export default resumes
