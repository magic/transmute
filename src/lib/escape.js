// escape string delimiters in the string
/** @param {string} str */
export const escape = str => str.replace(/'/g, "\\'").replace(/`/g, '\\`').replace(/"/g, '\\"')

// escape html special characters in strings that are injected into html strings,
// so they render as text instead of being parsed as tags.
/** @param {string} str */
export const escapeHtml = str =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
