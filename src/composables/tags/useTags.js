import { reactive, toRefs } from 'vue'
import { getTags as getTagsAPI } from '@/api/tags'

const state = reactive({
  tags: [],
  error: null,
  isPending: false
})

const getTags = async () => {
  try {
    state.isPending = true
    state.error = null
    const res = await getTagsAPI()
    state.tags = res.data
  } catch (error) {
    state.error = error
    console.log(error)
  } finally {
    state.isPending = false
  }
}

const useTags = () => {
  if (!state.tags.length) {
    getTags()
  }

  return { ...toRefs(state), getTags }
}

export default useTags
