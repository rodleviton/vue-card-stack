export const debounce = <F extends (...args: []) => void>(func: F, waitFor: number) => {
  let timeout = 0

  const debounced = (...args: []) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), waitFor)
  }

  return debounced as (...args: Parameters<F>) => ReturnType<F>
}
