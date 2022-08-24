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
