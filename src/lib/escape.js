// escape string delimiters in the string
/** @param {string} str */
export const escape = str => str.replace(/'/g, "\\'").replace(/`/g, '\\`').replace(/"/g, '\\"')
