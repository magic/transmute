import marked from 'marked'
import { parser } from 'posthtml-parser'

import is from '@magic/types'

import { findState, implantState } from './lib/index.mjs'

import * as renderers from './renderers/index.mjs'

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
  let md = marked(implanted, { renderer: renderers.markdown })

  const out = html(md, state, originalState)

  return out
}

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
