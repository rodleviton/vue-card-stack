/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered
 * @param {function} func - function to return
 * @param {number} wait - (n) milliseconds
 * @param {boolean} immediate - leading edge or trailing
 *
 * Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)
 */
export const debounce = (func, wait, immediate) => {
  let timeout;

  return function executedFunction() {
    // Store the context of this and any
    // parameters passed to executedFunction
    const context = this;
    const args = arguments;

    const later = function() {
      timeout = null;

      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};
