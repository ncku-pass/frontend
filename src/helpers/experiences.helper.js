/**
 * 把每種活動經驗按照學期進行排序
 * @param {object} experiences 從API（getExperiences）得到的資料
 * @returns {object} 排序完的資料
 */
import * as formSchema from '@/components/Experience/AddExp/experienceSchema'

export const sortExperiences = experiences => {
  const obj = Object.assign(experiences)
  for (const type in obj) {
    obj[type] = orderBySemester(obj[type], 'desc')
  }
  return obj
}

export const orderBySemester = (arr, order = 'desc') => {
  if (order === 'desc') {
    return [...arr].sort((a, b) => (a.semester < b.semester ? 1 : -1))
  } else {
    return [...arr].sort((a, b) => (a.semester < b.semester ? -1 : 1))
  }
}

/**
 * 把活動經驗依照學期分類
 * @param {array} arr Experience[]
 * @returns {object} 以學期為key的Object
 */
export const classifyBySemester = arr => {
  return arr.reduce((obj, experience) => {
    if (Array.isArray(obj[experience.semester])) {
      obj[experience.semester].push(experience)
    } else {
      obj[experience.semester] = [experience]
    }
    return obj
  }, {})
}

export const canImportFromSchool = type => {
  return type === 'course' || type === 'activity'
}

export const generateEmptyExp = (type) => {
  const schema = formSchema[type]
  const emptyExp = {}
  schema.forEach(item => {
    emptyExp[item.key] = item.defaultValue
  })
  return emptyExp
}
