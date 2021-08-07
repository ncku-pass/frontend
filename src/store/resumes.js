import {
  getResumes as getResumesAPI,
  saveResume as saveResumeAPI,
  deleteResume as deleteResumeAPI
} from '@/api/resumes'

const resumes = {
  namespaced: true,
  state: () => ({
    resumes: null,
    error: null,
    isPending: false
  }),
  mutations: {
    SET_RESUMES (state, resumes) {
      state.resumes = resumes
    },
    DELETE_RESUME (state, { resumeId }) {
      state.resumes = state.resumes.filter(resume => resume.id !== resumeId)
    },
    SET_STATUS (state, { error = null, isPending = false }) {
      state.error = error
      state.isPending = isPending
    }
  },
  actions: {
    initResumes ({ state, dispatch }) {
      if (!state.resumes) {
        dispatch('getResumes')
      }
    },
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
    },
    async deleteResume ({ commit }, { resumeId }) {
      await deleteResumeAPI(resumeId)
      commit('DELETE_RESUME', { resumeId })
    }
  }
}

export default resumes
