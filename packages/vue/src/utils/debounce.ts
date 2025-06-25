/**
 * Returns a debounced version of the given function that delays its execution until after a specified wait time has elapsed since the last call.
 *
 * The debounced function postpones invoking the original function until no calls have been made for the specified number of milliseconds.
 *
 * @param func - The function to debounce
 * @param wait - The delay in milliseconds before invoking the function
 * @returns A debounced function that delays execution of `func`
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Returns a throttled version of the given function that invokes at most once per specified interval.
 *
 * The throttled function calls the original function immediately on the first call, then ignores subsequent calls until the wait period has elapsed.
 *
 * @param func - The function to be throttled
 * @param wait - The minimum interval in milliseconds between allowed invocations
 * @returns A throttled function that enforces the specified invocation interval
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  };
}
