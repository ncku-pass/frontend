const expQuickEdit = {
  namespaced: true,
  state: () => ({
    quickEditMode: false,
    deleteExpIds: null,
    editExpTags: null,
    isQuickEditDirty: false,
  }),
  mutations: {
    TOGGLE_QUICK_MODE(state) {
      state.quickEditMode = !state.quickEditMode
      state.isQuickEditDirty = false;
    }
  }
}

export default expQuickEdit
