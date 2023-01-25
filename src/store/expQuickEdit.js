import { concat, dropWhile, uniqBy } from 'lodash-es'
import { deleteExps, editExperienceTags } from '@/api/experiences'

const expQuickEdit = {
  namespaced: true,
  state: () => ({
    quickEditMode: false,
    selectedExpIds: [],
    singleEditExpId: null,
    deleteExpIds: [],
    editExpTags: [],
  }),
  mutations: {
    SET_EDIT_MODE(state, mode) {
      state.quickEditMode = mode
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
    SET_SINGLE_EDIT_EXP_ID(state, expId) {
      state.singleEditExpId = expId
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
      state.editExpTags = dropWhile(state.editExpTags, item => expIds.includes(item.experienceId))
    },
    SET_EDIT_EXP_TAGS(state, expTags) {
      state.editExpTags = expTags
    },
  },
  actions: {
    TOGGLE_QUICK_EDIT_MODE({ state, commit, dispatch }) {
      commit('SET_EDIT_MODE', !state.quickEditMode)
      commit('SET_DELETE_EXP_ID', [])
      commit('SET_SELECTED_EXP_ID', [])
      commit('SET_EDIT_EXP_TAGS', [])

      if (!state.quickEditMode) {
        dispatch('experiences/getExperiences', {}, { root: true })
      }
    },
    APPEND_TAG_CHANGES({ state, commit, rootState }, { newTags, includeAllTags }) {
      const expTags = []
      const targetExpIds = state.singleEditExpId === null ? state.selectedExpIds : [state.singleEditExpId]

      for (const expId of targetExpIds) {
        const target = rootState.experiences.experiences[rootState.experiences.activeTab].find(exp => exp.id === expId)

        // combine original and new tags - full obj list for state, id list for later api call
        const combinedTags = includeAllTags ? newTags : uniqBy(concat(target.tags, newTags), 'id')
        const combinedTagsIds = combinedTags.map(tag => tag.id)
        expTags.push({ experienceId: expId, tagIds: combinedTagsIds })

        target.tags = combinedTags
        commit('experiences/UPDATE_EXPERIENCE', { id: expId, experience: target }, { root: true })
      }
      commit('SET_EDIT_EXP_TAGS', expTags)
      commit('SET_SELECTED_EXP_ID', [])
    },
    REMOVE_TAG_FROM_EXP({ state, commit, rootState }, { expId, tagId }) {
      // update state.exp for display
      const expTarget = rootState.experiences.experiences[rootState.experiences.activeTab].find(exp => exp.id === expId)
      expTarget.tags = expTarget.tags.filter(tag => tag.id !== tagId)
      commit('experiences/UPDATE_EXPERIENCE', { id: expId, experience: expTarget }, { root: true })

      // update this state for api
      const expTagTarget = state.editExpTags.find(expTag => expTag.experienceId === expId)
      const targetTagIds = expTarget.tags.map(tag => tag.id)
      if (expTagTarget) {
        expTagTarget.tagIds = targetTagIds
      } else {
        state.editExpTags.push({ experienceId: expId, tagIds: targetTagIds })
      }
    },
    CONFIRM_QUICK_EDIT_CHANGE({ state, dispatch }) {
      if (state.editExpTags?.length > 0) {
        editExperienceTags(state.editExpTags)
      }

      if (state.deleteExpIds?.length > 0) {
        deleteExps({ ids: state.deleteExpIds })
      }

      // reset quick edit mode (wait for delete to complete)
      setTimeout(function() {
        dispatch('TOGGLE_QUICK_EDIT_MODE')
      }, 300)
    }
  },
  getters: {
    isQuickEditDirty(state) {
      return state.deleteExpIds.length !== 0 || state.editExpTags.length !== 0
    }
  }
}

export default expQuickEdit
