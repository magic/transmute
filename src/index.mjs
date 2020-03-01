import fs from 'fs'
import path from 'path'

import log from '@magic/log'
import is from '@magic/types'

import marked from 'marked'
import parse5 from 'parse5'

import { escape, findState, stringifyAst, implantState } from './lib/index.mjs'

export const markdown = (string, state = {}, modules = []) => {
  const { input, state: st = {} } = findState(string)

  if (!is.empty(st)) {
    string = input
    state = { ...state, ...st }
  }

  const implanted = implantState({ input, state })
  let md = marked(implanted)

  // remove paragraphs around modules.
  modules.forEach(mod => {
    if (md.includes(`<p><${mod}`)) {
      md = md.replace(`<p><${mod}`, `<${mod}`).replace(`</${mod}></p>`, `</${mod}>`)
    }
  })

  const out = html(md, state, modules)

  return out
}

export const html = (string, state = {}, modules = []) => {
  const { input, state: st = {} } = findState(string)

  if (!is.empty(st)) {
    state = { ...state, ...st }
    string = input
  }

  const implanted = implantState({ input: string, state })

  const ast = parse5.parseFragment(implanted)

  const out = stringifyAst(ast, modules)
  return { state, rendered: out }
}

export const md = markdown

export default {
  html,
  markdown,
  md,
}
