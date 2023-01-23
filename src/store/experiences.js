import {
  getExperiences as getExperiencesAPI,
  addExperience as addExperienceAPI,
  updateExperience as updateExperienceAPI,
  importExperiences as importExperiencesAPI
} from '@/api/experiences'
import { getNCKUExperiences as getNCKUExperiencesAPI } from '@/api/ncku-portal'
import { sortExperiences, classifyBySemester, orderBySemester } from '@/helpers/experiences.helper'
import { KeyNoPairedError } from '@/config'
import {
  covertActivitiesToExps,
  covertClubsToExps,
  covertCoursesToExps,
  uniqueActivities,
} from '@/helpers/nckuData.helper'

const experiences = {
  namespaced: true,
  state: () => ({
    experiences: null,
    nckuExperiences: null,
    error: null,
    isPending: false,
    activeTab: 'course',
  }),
  mutations: {
    SET_EXPERIENCES(state, experiences) {
      state.experiences = experiences
    },
    SET_NCKU_EXPERIENCES(state, nckuExperiences) {
      state.nckuExperiences = nckuExperiences
    },
    ADD_EXPERIENCE(state, { type, experience }) {
      const expArray = state.experiences[type]
      let i = 0
      while (i < expArray.length && expArray[i].semester > experience.semester) {
        i++
      }
      expArray.splice(i, 0, experience)
    },
    UPDATE_EXPERIENCE(state, { id, experience }) {
      const expArray = state.experiences[experience.type]
      expArray.some((exp, i) => {
        if (exp.id === id) {
          expArray[i] = experience
          return true
        }
        return false
      })
    },
    SET_STATUS(state, { error = undefined, isPending = undefined }) {
      if (error !== undefined) state.error = error
      if (isPending !== undefined) state.isPending = isPending
    },
    SET_ACTIVE_TAB(state, activeTab) {
      if (['course', 'activity', 'competition', 'work', 'certificate', 'other'].includes(activeTab)) {
        state.activeTab = activeTab
      }
    }
  },
  actions: {
    initExperiences({ state, dispatch }) {
      if (!state.experiences) {
        dispatch('getExperiences')
      }
    },
    async getExperiences({ commit }) {
      try {
        commit('SET_STATUS', { isPending: true, error: null })

        const { data } = await getExperiencesAPI()

        commit('SET_EXPERIENCES', sortExperiences(data))
      } catch (error) {
        commit('SET_STATUS', { error })
      } finally {
        commit('SET_STATUS', { isPending: false })
      }
    },
    async addExperience(
      { commit },
      { name, position, description, feedback, semester, link, type, tags, categories, dateStart, dateEnd }
    ) {
      const { data } = await addExperienceAPI({
        name,
        position,
        description,
        feedback,
        semester,
        link,
        type,
        tags,
        categories,
        dateStart,
        dateEnd
      })
      commit('ADD_EXPERIENCE', { type, experience: data })
    },
    async updateExperience({ commit, dispatch }, { id, experience }) {
      const { data } = await updateExperienceAPI(id, experience)
      commit('UPDATE_EXPERIENCE', { id: data.id, experience: data })
      dispatch('resumes/getResumes', {}, { root: true })
    },
    async IMPORT_NCKU_EXP({ commit }, experiences) {
      try {
        commit('SET_STATUS', { isPending: true, error: null })

        const { data } = await importExperiencesAPI(experiences)

        data.forEach(experience => {
          commit('ADD_EXPERIENCE', {
            type: experience.type,
            experience
          })
        })
      } catch (error) {
        commit('SET_STATUS', { error })
      } finally {
        commit('SET_STATUS', { isPending: false })
      }
    },
    async FETCH_NCKU_DATA({ commit, rootState }) {
      if (!rootState.auth.key || !rootState.auth.keyval) {
        throw new KeyNoPairedError('沒有key / keyval')
      }
      const res = await getNCKUExperiencesAPI({
        key: rootState.auth.key,
        keyval: rootState.auth.keyval
      })
      const data = res.data?.data
      if (!data) {
        throw new KeyNoPairedError(res.data.msg)
      }

      const course = covertCoursesToExps(data.course)
      const club = covertClubsToExps(data.club)
      const activity = covertActivitiesToExps(uniqueActivities(data.activity))

      commit('SET_NCKU_EXPERIENCES', {
        course: orderBySemester(course),
        activity: orderBySemester([...club, ...activity])
      })
    }
  },
  getters: {
    /**
     * 把所有經驗整合到同一個array
     */
    experiencesArray(state) {
      const arr = []
      for (const type in state.experiences) {
        arr.push(...state.experiences[type])
      }
      return arr
    },
    // 將每個活動類別內的資料，依照學期分類好
    classifiedExperiences(state) {
      const experiences = {}
      for (const type in state.experiences) {
        experiences[type] = classifyBySemester(state.experiences[type])
      }
      return experiences
    },
    NCKU_EXP_BY_TYPE_SEM(state) {
      if (!state.nckuExperiences) {
        return null
      }
      return {
        course: classifyBySemester(
          state.nckuExperiences.course.filter(nckuExp => {
            return !state.experiences?.course?.find(exp => exp.name === nckuExp.name && exp.semester === nckuExp.semester)
          })
        ),
        activity: classifyBySemester(
          state.nckuExperiences.activity.filter(nckuExp => {
            return !state.experiences?.activity?.find(
              exp => exp.name === nckuExp.name && exp.semester === nckuExp.semester
            )
          })
        )
      }
    },
    /**
     * 取得不重複的所有學期
     */
    semesters(state, getters) {
      const semesters = new Set()
      for (const exp of getters.experiencesArray) {
        semesters.add(exp.semester)
      }
      return [...semesters].sort((a, b) => {
        return a > b ? -1 : 1 // 學期靠近的排在前面
      })
    },
    /**
     * 取得有使用到，且不重複的所有Tag
     */
    tags(state, getters) {
      const tags = new Set()
      for (const exp of getters.experiencesArray) {
        for (const tag of exp.tags) {
          tags.add(tag)
        }
      }
      return [...tags]
    },
    // return undefined if not found
    experienceByTypeAndId(state) {
      return (type, id) => {
        return state.experiences?.[type]?.filter(exp => exp.id === id)?.[0]
      }
    },
  }
}

export default experiences
