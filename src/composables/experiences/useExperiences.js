import { reactive, toRefs, computed } from 'vue'
import { getExperiences as getExperiencesAPI } from '@/api/experiences'
import { sortExperiences, classifySemester } from '@/helpers/index'

const state = reactive({
  experiences: {},
  error: null,
  isPending: false
})

// 將每個活動類別內的資料，依照學期分類好
const classifiedExperiences = computed(() => {
  const data = {}
  for (const type in state.experiences) {
    data[type] = classifySemester(state.experiences[type])
  }
  return data
})

// 把所有經驗整合到同一個array
const experiencesArray = computed(() => {
  const data = []
  for (const type in state.experiences) {
    data.push(...state.experiences[type])
  }
  return data
})

// 取得不重複的所有學期
const semesters = computed(() => {
  const semesters = []
  for (const type in classifiedExperiences.value) {
    semesters.push(...Object.keys(classifiedExperiences.value[type]))
  }
  return [...new Set(semesters)].sort((a, b) => {
    return a > b ? -1 : 1 // 學期靠近的排在前面
  })
})

const getExperiences = async () => {
  try {
    state.isPending = true
    state.error = null
    const res = await getExperiencesAPI()
    state.experiences = sortExperiences(res.data)
  } catch (error) {
    state.error = error
  } finally {
    state.isPending = false
  }
}

const useExperiences = () => {
  if (Object.keys(state.experiences).length === 0) {
    getExperiences()
  }

  return { ...toRefs(state), classifiedExperiences, experiencesArray, semesters, getExperiences }
}

export default useExperiences
