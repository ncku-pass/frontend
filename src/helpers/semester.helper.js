//
// SEMESTER CHECKING FOR IMPORT REMINDER
// different logic from conversion as it is for showing reminder
//
export const isCurrentOrLastSemester = target => {
  return target === getCurrentSemester() || target === getLastSemester()
}

export const getCurrentSemester = () => {
  // start from 0
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear() - 1911

  // Jan => (year-1)-1
  // Feb - Jun => (year-1)-2
  // Jul - Dec => year-1
  if (month === 1) {
    return `${year - 1}-1`
  } else if (month >= 2 && month <= 6) {
    return `${year - 1}-2`
  } else {
    return `${year}-1`
  }
}

export const getLastSemester = () => {
  let current = getCurrentSemester()
  current = current.split('-').map(x => parseInt(x))

  if (current[1] === 1) {
    return `${current[0] - 1}-2`
  } else {
    return `${current[0]}-1`
  }
}

//
// SEMESTER DATE CONVERSION (same login in backend)
//
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
