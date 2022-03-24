import { getTags as getTagsAPI, addTag as addTagAPI, deleteTag as deleteTagAPI } from '@/api/tags'

const tags = {
  namespaced: true,
  state: () => ({
    tags: [],
    error: null,
    isPending: false
  }),
  mutations: {
    SET_TAGS(state, tags) {
      state.tags = tags
    },
    SET_STATUS(state, { error = undefined, isPending = undefined }) {
      if (error !== undefined) state.error = error
      if (isPending !== undefined) state.isPending = isPending
    }
  },
  actions: {
    initTags({ dispatch, state }) {
      if (!state.tags.length) {
        dispatch('getTags')
      }
    },
    async getTags({ commit }) {
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
    async addTag({ commit, state }, newTag) {
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
    },
    async deleteTag({ dispatch, commit, state }, tagId) {
      let res
      try {
        commit('SET_STATUS', { isPending: true, error: null })

        res = await deleteTagAPI(tagId)
        await dispatch('experiences/getExperiences', null, { root: true })

        const newTags = state.tags.filter(tag => tag.id !== tagId)
        commit('SET_TAGS', newTags)
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
