import { cloneDeep, isEqual } from 'lodash-es'
import {
  getResumes as getResumesAPI,
  addResume as addResumeAPI,
  saveResume as saveResumeAPI,
  deleteResume as deleteResumeAPI
} from '@/api/resumes'
import { useToast } from 'vue-toastification'

const toast = useToast()

const resumes = {
  namespaced: true,
  state: () => ({
    resumes: null,
    localResumes: null,
    error: null,
    isPending: false
  }),
  mutations: {
    SET_RESUMES (state, resumes) {
      state.resumes = resumes
    },
    SET_LOCAL_RESUMES (state, resumes) {
      state.localResumes = resumes
    },
    DELETE_RESUME (state, { resumeId }) {
      state.resumes = state.resumes.filter(resume => resume.id !== resumeId)
      state.localResumes = state.localResumes.filter(resume => resume.id !== resumeId)
    },
    SET_STATUS (state, { error = undefined, isPending = undefined }) {
      if (error !== undefined) state.error = error
      if (isPending !== undefined) state.isPending = isPending
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

        commit('SET_RESUMES', cloneDeep(data))
        commit('SET_LOCAL_RESUMES', cloneDeep(data))
      } catch (error) {
        commit('SET_STATUS', { error })
      } finally {
        commit('SET_STATUS', { isPending: false })
      }
    },
    async saveResume ({ commit, state }, { resume }) {
      try {
        commit('SET_STATUS', { isPending: true, error: null })

        if (resume.isLocal) {
          const { data } = await addResumeAPI(resume)
          state.resumes = [...state.resumes, cloneDeep(data)]

          const indexOfLocalResume = state.localResumes.findIndex(localResume => localResume.id === resume.id)
          state.localResumes[indexOfLocalResume] = cloneDeep(data)
        } else {
          const originResume = state.resumes.find(res => res.id === resume.id)

          // 檢查哪些卡片被刪掉了
          const originResumeCardsId = originResume.cards.map(card => card.id)
          const nowResumeCardsId = resume.cards.map(card => card.id)
          const deleteCardIds = [...originResumeCardsId].filter(id => !nowResumeCardsId.includes(id))

          // 檢查還在的卡片中，哪些經歷被刪掉了
          for (const card of resume.cards) {
            if (card.id !== 0) {
              const experiencesIdOfOriginCard = originResume.cards.find(({ id }) => id === card.id).experiences.map(exp => exp.id)
              const experiencesIdOfNowCard = card.experiences.map(exp => exp.id)
              const deleteExpIds = [...experiencesIdOfOriginCard].filter(id => !experiencesIdOfNowCard.includes(id))
              card.deleteExpIds = deleteExpIds
            }
          }

          const { data } = await saveResumeAPI(resume.id, { ...resume, deleteCardIds })

          const indexOfOriginResume = state.resumes.findIndex(originResume => originResume.id === resume.id)
          state.resumes[indexOfOriginResume] = cloneDeep(data)
          const indexOfLocalResume = state.localResumes.findIndex(localResume => localResume.id === resume.id)
          state.localResumes[indexOfLocalResume] = cloneDeep(data)
        }
      } catch (error) {
        toast.error(error.message)
        commit('SET_STATUS', { error })
      } finally {
        commit('SET_STATUS', { isPending: false })
      }
    },
    async deleteResume ({ commit }, { resumeId }) {
      await deleteResumeAPI(resumeId)
      commit('DELETE_RESUME', { resumeId })
    }
  },
  getters: {
    someResumesNotSaved (state) {
      return !isEqual(state.resumes, state.localResumes)
    }
  }
}

export default resumes
