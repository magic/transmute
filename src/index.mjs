import fs from 'fs'
import path from 'path'

import marked from 'marked'
import posthtmlParser from 'posthtml-parser'

import log from '@magic/log'
import is from '@magic/types'

import {
  escape,
  findState,
  implantState,
  markedMagicRenderer,
  posthtmlMagicRenderer,
} from './lib/index.mjs'

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

  const implanted = implantState({ input: string, state })
  let md = marked(implanted, { renderer: markedMagicRenderer })

  // remove paragraphs around modules.
  modules.forEach(mod => {
    const inlineModules = ['a', 'Link', 'Img', 'img']

    if (md.includes(`<p><${mod}`) && !inlineModules.includes(mod)) {
      md = md.replace(`<p><${mod}`, `<${mod}`).replace(`</${mod}></p>`, `</${mod}>`)
    }
  })

  const out = html(md, state, modules, originalState)

  return out
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

  if (string.trim().startsWith('<h2>${stat')) {
    console.log({ implanted })
  }

  const ast = posthtmlParser(implanted)

  const out = posthtmlMagicRenderer(ast, modules)

  return { state, rendered: out, originalState }
}

export const md = markdown

export default {
  html,
  markdown,
  md,
}
