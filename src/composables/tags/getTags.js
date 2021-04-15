import { reactive, toRefs } from 'vue'
import { getTags as getTagsAPI } from '@/api/tags'

const getTags = () => {
  const state = reactive({
    tags: [],
    error: null,
    isPending: false
  })

  const reloadTags = async () => {
    try {
      state.isPending = true
      state.error = null
      const res = await getTagsAPI()
      console.log(res)
      state.tags = res.data
    } catch (error) {
      state.error = error
      console.log(error)
    } finally {
      state.isPending = false
    }
  }
  reloadTags()

  return { ...toRefs(state), reloadTags }
}

export default getTags
