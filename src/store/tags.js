import { getTags as getTagsAPI, addTag as addTagAPI } from '@/api/tags'

const tags = {
  namespaced: true,
  state: () => ({
    tags: [],
    error: null,
    isPending: false
  }),
  mutations: {
    SET_TAGS (state, tags) {
      state.tags = tags
    },
    SET_STATUS (state, { error = null, isPending = false }) {
      state.error = error
      state.isPending = isPending
    }
  },
  actions: {
    initTags ({ dispatch, state }) {
      if (!state.tags.length) {
        dispatch('getTags')
      }
    },
    async getTags ({ commit }) {
      try {
        commit('SET_STATUS', { isPending: true, error: null })

        const { data } = await getTagsAPI()

        commit('SET_TAGS', data)
      } catch (error) {
        commit('SET_STATUS', { error })
      } finally {
        commit('SET_STATUS', { isPending: false })
      }
    },
    async addTag ({ commit, state }, newTag) {
      let res
      try {
        commit('SET_STATUS', { isPending: true, error: null })

        res = await addTagAPI(newTag)

        commit('SET_TAGS', [...state.tags, res.data[0]])
      } catch (error) {
        commit('SET_STATUS', { error })
      } finally {
        commit('SET_STATUS', { isPending: false })
      }
      return res.data[0]
    }
  }
}

export default tags
