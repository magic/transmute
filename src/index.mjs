import marked from 'marked'
import posthtmlParser from 'posthtml-parser'

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

  if (is.array(out.rendered) && is.length(out.rendered, 1)) {
    out.rendered = out.rendered[0]
  }

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

  const parser = posthtmlParser.default ? posthtmlParser.default : posthtmlParser

  const ast = parser(implanted)

  let out = renderers.html(ast)

  if (is.array(out) && is.length(out, 1)) {
    out = out[0]
  }

  return { state, rendered: out, originalState }
}

export const md = markdown

export default {
  html,
  markdown,
  md,
}
