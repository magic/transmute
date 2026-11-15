import is from '@magic/types'

const bracketRegExp = /(\${|{{).*(}|}})/gim

/**
 * @param {{ input: string, state: Record<string, unknown> }} params
 * @returns {string}
 */
export const implantState = ({ input, state }) => {
  const matches = input.match(bracketRegExp)

  if (matches && matches.length) {
    matches.forEach(match => {
      let val = undefined

      let transformedMatch = match
      // substr seems to change match.length after removing the first 2 chars,
      // so the second argument needs to take that into account be removing 3 or 4 characters.
      if (match.startsWith('$')) {
        transformedMatch = transformedMatch.substr(2, match.length - 3)
      } else if (match.startsWith('{{')) {
        transformedMatch = transformedMatch.substr(2, match.length - 4)
      }

      transformedMatch = transformedMatch.replace('state.', '').trim()

      if (transformedMatch.includes('.')) {
        const subMatches = transformedMatch.split('.')
        let curState = state

        subMatches.forEach(subM => {
          if (is.undefined(curState[subM])) {
            curState = /** @type {Record<string, unknown>} */ (
              /** @type {unknown} */ (curState[subM])
            )
            val = curState
          } else {
            val = undefined
          }
        })
      }

      if (state[transformedMatch]) {
        val = state[transformedMatch]
      }

      if (is.undefined(val)) {
        throw new Error(`Unknown State variable ${match}, val: ${val}, url: ${state.url}`)
      }

      if (is.array(val)) {
        val = val.join(' ')
      }

      input = input.replace(match, /** @type {string} */ (val))
    })
  }

  return input
}
