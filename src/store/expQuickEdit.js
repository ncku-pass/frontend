const expQuickEdit = {
  namespaced: true,
  state: () => ({
    quickEditMode: false,
    deleteExpIds: null,
    editExpTags: null,
  }),
  mutations: {
    TOGGLE_QUICK_MODE(state) {
      state.quickEditMode = !state.quickEditMode
    }
  }
}

export default expQuickEdit
