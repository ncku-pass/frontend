import { getExperiences as getExperiencesAPI } from '@/api/experiences'
import { sortExperiences, classifySemester } from '@/helpers/index'

const experiences = {
  namespaced: true,
  state: () => ({
    experiences: null,
    error: null,
    isPending: false
  }),
  mutations: {
    SET_EXPERIENCES (state, experiences) {
      state.experiences = experiences
    },
    SET_STATUS (state, { error = undefined, isPending = undefined }) {
      if (error !== undefined) state.error = error
      if (isPending !== undefined) state.isPending = isPending
    }
  },
  actions: {
    initExperiences ({ commit, state, dispatch }) {
      if (!state.experiences) {
        dispatch('getExperiences')
      }
    },
    async getExperiences ({ commit }) {
      try {
        commit('SET_STATUS', { isPending: true, error: null })

        const { data } = await getExperiencesAPI()

        commit('SET_EXPERIENCES', sortExperiences(data))
      } catch (error) {
        commit('SET_STATUS', { error })
      } finally {
        commit('SET_STATUS', { isPending: false })
      }
    }
  },
  getters: {
    /**
     * 把所有經驗整合到同一個array
     */
    experiencesArray (state) {
      const arr = []
      for (const type in state.experiences) {
        arr.push(...state.experiences[type])
      }
      return arr
    },
    /**
     * 將每個活動類別內的資料，依照學期分類好
     */
    classifiedExperiences (state) {
      const experiences = {}
      for (const type in state.experiences) {
        experiences[type] = classifySemester(state.experiences[type])
      }
      return experiences
    },
    /**
     * 取得不重複的所有學期
     */
    semesters (state) {
      const semesters = []
      for (const type in state.experiences) {
        semesters.push(...state.experiences[type].map(exp => exp.semester))
      }
      return [...new Set(semesters)].sort((a, b) => {
        return a > b ? -1 : 1 // 學期靠近的排在前面
      })
    }
  }
}

export default experiences
