import { reactive, toRefs, computed } from 'vue'
import { getExperiences as getExperiencesAPI } from '@/api/experiences'

const getExperiences = () => {
  const state = reactive({
    experiences: {},
    error: null,
    isPending: false
  })

  const classifiedExperiences = computed(() => {
    const data = {}
    // 將每個活動類別內的資料，依照學期分類好
    for (const type in state.experiences) {
      data[type] = classifySemester(state.experiences[type])
    }
    return data
  })

  const reloadExperiences = async () => {
    try {
      state.isPending = true
      state.error = null
      const res = await getExperiencesAPI()
      state.experiences = res.data
    } catch (error) {
      state.error = error
    } finally {
      state.isPending = false
    }
  }
  reloadExperiences()

  return { ...toRefs(state), classifiedExperiences, reloadExperiences }
}

const classifySemester = (arr) => {
  return [...arr]
    .sort((a, b) => {
      return a.semester < b.semester ? 1 : -1 // 學期靠近的排在前面
    })
    .reduce((obj, experience) => {
      if (Array.isArray(obj[experience.semester])) {
        obj[experience.semester].push(experience)
      } else {
        obj[experience.semester] = [experience]
      }
      return obj
    }, {})
}

export default getExperiences
