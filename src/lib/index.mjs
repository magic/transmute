export { LexLex } from './LexLex.mjs'

// escape string delimiters in the string with escaped string delimiters
export const escape = str =>
  str
    .replace(/'/g, "\\'")
    .replace(/`/g, '\\`')
    .replace(/"/g, '\\"')

// find and extract the page state from both markdown and html vars.
export const findState = input => {
  if (input.trim().startsWith('---')) {
    const splinters = input.split('---')

    // bail early, not a state declaration.
    if (splinters.length < 3) {
      return { input }
    }

    const stateJson = splinters[1]
    input = splinters[2]

    if (stateJson.trim().startsWith('@state')) {
      const state = JSON.parse(stateJson.replace('@state', ''))
      return {
        state,
        input,
      }
    }
  }

  return {
    input,
  }
}

// using eval to be able to expand variables in the template string.
// TODO: find a way to do this without eval
export const implantState = ({ input, state }) => eval('`' + input.replace(/`/g, '\\`') + '`')
