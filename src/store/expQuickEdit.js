import { dropWhile } from 'lodash-es'

const expQuickEdit = {
  namespaced: true,
  state: () => ({
    quickEditMode: true,
    isQuickEditDirty: false,
    selectedExpIds: [],
    deleteExpIds: [],
    editExpTags: [],
  }),
  mutations: {
    SET_EDIT_MODE(state, mode) {
      state.quickEditMode = mode
    },
    SET_DIRTY(state, dirty) {
      state.isQuickEditDirty = dirty
    },
    SET_SELECTED_EXP_ID(state, expIds) {
      state.selectedExpIds = expIds
    },
    EDIT_SELECTED_EXP_ID(state, { expId, select }) {
      if (select && !state.selectedExpIds.includes(expId)) {
        state.selectedExpIds.push(expId)
      } else if (!select) {
        state.selectedExpIds = state.selectedExpIds.filter(target => target !== expId)
      }
    },
    SET_DELETE_EXP_ID(state, expIds) {
      state.deleteExpIds = expIds
    },
    APPEND_DELETE_EXP_ID(state, expIds) {
      if (typeof expIds === 'string') {
        expIds = [expIds]
      }

      if (state.deleteExpIds?.length < 1) {
        state.deleteExpIds = expIds
      } else {
        state.deleteExpIds = [...state.deleteExpIds, ...expIds]
      }

      // remove deleted expIds from selectedIds
      state.selectedExpIds = dropWhile(state.selectedExpIds, id => expIds.includes(id))
    },
    SET_EDIT_EXP_TAGS(state, expTags) {
      state.editExpTags = expTags
    },
  },
  actions: {
    TOGGLE_QUICK_EDIT_MODE({ state, commit, dispatch }) {
      commit('SET_EDIT_MODE', !state.quickEditMode)
      commit('SET_DIRTY', false)
      commit('SET_DELETE_EXP_ID', [])
      commit('SET_SELECTED_EXP_ID', [])
      commit('SET_EDIT_EXP_TAGS', [])

      if (!state.quickEditMode) {
        dispatch('experiences/getExperiences', {}, { root: true })
      }
    },
    APPEND_TAG_CHANGES({ state, commit, rootState }, newTags) {
      const expTags = []
      const newTagIds = []
      newTags.forEach(tag => newTagIds.push(tag.id))

      for (const expId of state.selectedExpIds) {
        const target = rootState.experiences.experiences[rootState.experiences.activeTab].find(exp => exp.id === expId)

        const targetTagIds = []
        target?.tags?.forEach(tag => targetTagIds.push(tag.id))

        const fullTags = targetTagIds.length === 0 ? newTagIds : [...new Set([...targetTagIds, ...newTagIds])]
        expTags.push({ experienceId: expId, fullTags })

        target.tags.push(...newTags)
        commit('experiences/UPDATE_EXPERIENCE', { id: expId, experience: target }, { root: true })
      }
      commit('SET_EDIT_EXP_TAGS', expTags)
      commit('SET_SELECTED_EXP_ID', [])
    }
  },
  getters: {
    isQuickEditDirty(state) {
      return state.deleteExpIds.length !== 0 || state.editExpTags.length !== 0
    }
  }
}

export default expQuickEdit
