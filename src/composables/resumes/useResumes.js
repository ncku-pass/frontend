import { reactive, toRefs } from 'vue'
import { getResumes as getResumesAPI, saveResume as saveResumeAPI } from '@/api/resumes'

const state = reactive({
  resumes: [],
  error: null,
  isPending: false
})

const getResumes = async () => {
  try {
    state.isPending = true
    state.error = null
    const res = await getResumesAPI()
    state.resumes = res.data
  } catch (error) {
    state.error = error
    console.log(error)
  } finally {
    state.isPending = false
  }
}

const saveResume = async (resumeId, data) => {
  try {
    state.isPending = true
    state.error = null
    const res = await saveResumeAPI(resumeId, data)
    console.log(res)
  } catch (error) {
    state.error = error
    console.log(error)
  } finally {
    state.isPending = false
  }
}

const useResumes = () => {
  if (!state.resumes.length) {
    getResumes()
  }

  return { ...toRefs(state), getResumes, saveResume }
}

export default useResumes
