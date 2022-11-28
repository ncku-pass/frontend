const expQuickEdit = {
  namespaced: true,
  state: () => ({
    quickEditMode: true,
    deleteExpIds: [],
    editExpTags: [],
  }),
  mutations: {
    TOGGLE_QUICK_MODE(state) {
      state.quickEditMode = !state.quickEditMode
      state.isQuickEditDirty = false
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
    }
  },
  getters: {
    isQuickEditDirty(state) {
      return state.deleteExpIds.length !== 0 || state.editExpTags.length !== 0
    }
  }
}

export default expQuickEdit
