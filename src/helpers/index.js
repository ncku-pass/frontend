/**
 * 把每種活動經驗按照學期進行排序
 * @param {object} experiences 從API（getExperiences）得到的資料
 * @returns {object} 排序完的資料
 */
export const sortExperiences = experiences => {
  const obj = Object.assign(experiences)
  for (const type in obj) {
    obj[type] = orderBySemester(obj[type], 'desc')
  }
  return obj
}

export const orderBySemester = (arr, order = 'desc') => {
  if (order === 'desc') {
    return [...arr].sort((a, b) => a.semester < b.semester ? 1 : -1)
  } else {
    return [...arr].sort((a, b) => a.semester < b.semester ? -1 : 1)
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

export const semesterToDate = (semester = '110-2') => {
  const [year, term] = semester.split('-')
  if (term === '1') {
    const dateString = `${~~year + 1911}-09-01`
    return new Date(dateString)
  } else {
    const dateString = `${~~year + 1912}-02-01`
    return new Date(dateString)
  }
}

export const dateToSemester = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  if (month >= 9) {
    return `${year - 1911}-1`
  } else if (month >= 2) {
    return `${year - 1912}-2`
  } else {
    return `${year - 1912}-1`
  }
}
