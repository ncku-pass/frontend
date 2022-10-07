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
