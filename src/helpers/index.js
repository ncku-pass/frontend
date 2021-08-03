/**
 * 把每種活動經驗按照學期進行排序
 * @param {object} experiences 從API（getExperiences）得到的資料
 * @returns {object} 排序完的資料
 */
export const sortExperiences = (experiences) => {
  const obj = Object.assign(experiences)
  for (const type in obj) {
    obj[type].sort((a, b) => {
      return a.semester < b.semester ? 1 : -1 // 學期靠近的排在前面
    })
  }
  return obj
}

/**
 * 把活動經驗依照學期分類
 * @param {array} arr Experience[]
 * @returns {object} 以學期為key的Object
 */
export const classifySemester = (arr) => {
  return arr.reduce((obj, experience) => {
    if (Array.isArray(obj[experience.semester])) {
      obj[experience.semester].push(experience)
    } else {
      obj[experience.semester] = [experience]
    }
    return obj
  }, {})
}

export const debounce = (func, delay = 250) => {
  let timer = null

  return (...args) => {
    const context = this

    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}
