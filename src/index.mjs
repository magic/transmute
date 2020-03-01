import fs from 'fs'
import path from 'path'

import log from '@magic/log'
import is from '@magic/types'

import marked from 'marked'
import parse5 from 'parse5'

import { escape, findState, stringifyAst, implantState, MarkedMagicRenderer } from './lib/index.mjs'

export const markdown = (string, state = {}, modules = [], originalState = {}) => {
  const { input, state: st = {} } = findState(string)

  if (!is.empty(st)) {
    string = input
    state = { ...state, ...st }

    originalState = {
      ...originalState,
      ...st,
    }
  }

  const renderer = new MarkedMagicRenderer()

  const implanted = implantState({ input: string, state })
  let md = marked(implanted, { renderer })

  // remove paragraphs around modules.
  modules.forEach(mod => {
    if (md.includes(`<p><${mod}`)) {
      md = md.replace(`<p><${mod}`, `<${mod}`).replace(`</${mod}></p>`, `</${mod}>`)
    }
  })

  // const out = html(md, state, modules, originalState)

  console.log({ md })

  return { state, rendered: md, originalState }
}

export const html = (string, state = {}, modules = [], originalState = {}) => {
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

  const ast = parse5.parseFragment(implanted)

  const out = stringifyAst(ast, modules)

  console.log(out);

  return out
}

export const md = markdown

export default {
  html,
  markdown,
  md,
}
