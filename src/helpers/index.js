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
