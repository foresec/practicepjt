//allowJs + JsDoc 코멘트를 통해 기존 js코드(를 망치고 싶지 않을 때) ts체크가 가능

// @ts-check
/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */

export function init(config) {
  return true;
}


/**
 * Exits the project
 * @param {number} code
 * @returns {number}
 */
export function exit(code) {
  return code + 1;
}
