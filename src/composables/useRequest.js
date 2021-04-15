import { reactive, toRefs } from 'vue'

export const useRequest = apiCall => {
  const state = reactive({
    data: [],
    error: null,
    isPending: false
  })

  const statefulApiCall = async (...data) => {
    try {
      state.isPending = true
      state.error = null
      const res = await apiCall(...data)
      console.log(res)
      state.data = res.data
    } catch (error) {
      state.error = error
    } finally {
      state.isPending = false
    }
  }

  return { ...toRefs(state), [apiCall.name]: statefulApiCall }
}
