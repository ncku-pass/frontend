import { reactive, toRefs, computed } from 'vue'
import { getExperiences as getExperiencesAPI } from '@/api/experiences'

const state = reactive({
  experiences: {},
  error: null,
  isPending: false
})

const getExperiences = () => {
  // 將每個活動類別內的資料，依照學期分類好
  const classifiedExperiences = computed(() => {
    const data = {}
    for (const type in state.experiences) {
      data[type] = classifySemester(state.experiences[type])
    }
    return data
  })
  // TODO: 修正資料沒更新的問題
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
    return [...new Set(semesters)]
  })

  const reloadExperiences = async () => {
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
  if (Object.keys(state.experiences).length === 0) {
    reloadExperiences()
  }

  return { ...toRefs(state), classifiedExperiences, experiencesArray, semesters, reloadExperiences }
}

const sortExperiences = (experiences) => {
  for (const type in experiences) {
    experiences[type].sort((a, b) => {
      return a.semester < b.semester ? 1 : -1 // 學期靠近的排在前面
    })
  }
  return experiences
}

const classifySemester = (arr) => {
  return arr.reduce((obj, experience) => {
    if (Array.isArray(obj[experience.semester])) {
      obj[experience.semester].push(experience)
    } else {
      obj[experience.semester] = [experience]
    }
    return obj
  }, {})
}

export default getExperiences
