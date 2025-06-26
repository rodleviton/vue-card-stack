/**
 * Utility functions for controlling function execution timing.
 * These functions help optimize performance by limiting how often functions are called.
 */

/**
 * A debounced function with additional control methods.
 */
export interface DebouncedFunction<Args extends unknown[]> {
  /** The debounced function */
  (...args: Args): void
  /** Cancel the pending execution */
  cancel(): void
  /** Execute the function immediately and cancel any pending execution */
  flush(...args: Args): void
}

/**
 * Creates a debounced function that delays invoking the provided function
 * until after wait milliseconds have elapsed since the last time the debounced function was invoked.
 *
 * This is useful for expensive operations that shouldn't run too frequently,
 * such as API calls, DOM updates, or resize event handlers.
 *
 * @template Args - The argument types of the function
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay (must be positive)
 * @returns A debounced version of the function with additional control methods
 *
 * @example
 * ```typescript
 * const handleResize = debounce(() => {
 *   console.log('Window resized');
 * }, 250);
 *
 * window.addEventListener('resize', handleResize);
 *
 * // Cancel pending execution
 * handleResize.cancel();
 *
 * // Execute immediately
 * handleResize.flush();
 * ```
 *
 * @throws {Error} When wait time is negative or not a number
 */
export function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  wait: number
): DebouncedFunction<Args> {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }

  if (typeof wait !== 'number' || wait < 0) {
    throw new Error('Wait time must be a positive number')
  }

  let timeout: ReturnType<typeof setTimeout> | undefined

  const debouncedFunction = function executedFunction(...args: Args) {
    const later = () => {
      timeout = undefined
      func(...args)
    }

    if (timeout !== undefined) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }

  debouncedFunction.cancel = function cancel() {
    if (timeout !== undefined) {
      clearTimeout(timeout)
      timeout = undefined
    }
  }

  debouncedFunction.flush = function flush(...args: Args) {
    debouncedFunction.cancel()
    func(...args)
  }

  return debouncedFunction
}

/**
 * A throttled function with additional control methods.
 */
export interface ThrottledFunction<Args extends unknown[]> {
  /** The throttled function */
  (...args: Args): void
  /** Cancel the pending execution */
  cancel(): void
  /** Execute the function immediately if not in throttle period */
  flush(...args: Args): void
}

/**
 * Creates a throttled function that only invokes the provided function
 * at most once per every wait milliseconds.
 *
 * Unlike debounce, throttle ensures the function is called at regular intervals
 * during a series of calls, making it ideal for smooth animations or scroll handlers.
 *
 * @template Args - The argument types of the function
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to throttle invocations to (must be positive)
 * @returns A throttled version of the function with additional control methods
 *
 * @example
 * ```typescript
 * const handleScroll = throttle(() => {
 *   console.log('Scrolling...');
 * }, 100);
 *
 * window.addEventListener('scroll', handleScroll);
 *
 * // Cancel pending execution
 * handleScroll.cancel();
 *
 * // Execute immediately if not in throttle period
 * handleScroll.flush();
 * ```
 *
 * @throws {Error} When wait time is negative or not a number
 */
export function throttle<Args extends unknown[]>(
  func: (...args: Args) => void,
  wait: number
): ThrottledFunction<Args> {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }

  if (typeof wait !== 'number' || wait < 0) {
    throw new Error('Wait time must be a positive number')
  }

  let inThrottle = false
  let timeout: ReturnType<typeof setTimeout> | undefined

  const throttledFunction = function executedFunction(...args: Args) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      timeout = setTimeout(() => {
        inThrottle = false
        timeout = undefined
      }, wait)
    }
  }

  throttledFunction.cancel = function cancel() {
    if (timeout !== undefined) {
      clearTimeout(timeout)
      timeout = undefined
    }
    inThrottle = false
  }

  throttledFunction.flush = function flush(...args: Args) {
    if (!inThrottle) {
      func(...args)
    }
  }

  return throttledFunction
}
