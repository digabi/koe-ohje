export const debounce = (func: () => void, wait: number, immediate?: boolean) => {
  let timeout: number
  return function() {
    const context = this
    const args = arguments

    const later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    const callNow = immediate && !timeout
    window.clearTimeout(timeout)
    timeout = window.setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
