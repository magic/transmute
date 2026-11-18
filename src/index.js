import is from '@magic/types'

import { marked } from 'marked'
import { parser } from 'posthtml-parser'
import { findState, implantState } from './lib/index.js'
import * as renderers from './renderers/index.js'

/**
 * @typedef {Record<string, unknown>} State
 */

/**
 * @param {string} string
 * @param {State} [state]
 * @param {object} [originalState]
 */
export const markdown = (string, state = {}, originalState = {}) => {
  const { input, state: st = {} } = findState(string)

  if (!is.empty(st)) {
    string = input
    state = { ...state, ...st }

    originalState = {
      ...originalState,
      ...st,
    }
  }

  const implanted = implantState({ input: string, state })
  const md = marked(implanted, { renderer: renderers.markdown, async: false })

  const out = html(md, state, originalState)

  return out
}

/**
 * @param {string} string
 * @param {State} [state]
 * @param {object} [originalState]
 */
export const html = (string, state = {}, originalState = {}) => {
  const { input, state: st = {} } = findState(string)

  if (!is.empty(st)) {
    state = { ...state, ...st }
    string = input
    originalState = {
      ...originalState,
      ...st,
    }
  }

  const implanted = implantState({ input: string, state })

  const ast = parser(implanted)

  const out = renderers.html(ast)

  return { state, rendered: out, originalState }
}

export const md = markdown

export default {
  html,
  markdown,
  md,
}
