import fs from 'fs'
import path from 'path'

import log from '@magic/log'
import is from '@magic/types'

import marked from 'marked'
import parse5 from 'parse5'
import prettier from 'prettier'

import { escape, findState, implantState } from './lib/index.mjs'

export const markdown = (string, state = {}) => {
  const { input, state : st = {} } = findState(string)

  if (!is.empty(st)) {
    string = input
    state = { ...state, ...st }
  }

  const implanted = implantState({ input, state })
  const md = marked(implanted)

  return html(md, state)
}

export const html = (string, state = {}) => {
  const { input, state: st = {} } = findState(string)

  if (is.empty(st)) {
    state = { ...state, ...st }
    string = input
  }

  const implanted = implantState({ input: string, state })

  const ast = parse5.parseFragment(implanted)
  const out = stringifyAst(ast)

  return { state, rendered: out }
}

const stringifyAst = ast => {
  if (ast.nodeName === '#text') {
    return `'${escape(ast.value)}'`
  }

  const stringified = ast.childNodes.map(node => {
    let { value } = node

    if (node.nodeName === '#text') {
      let delimiter = "'"

      if (value.includes('\n')) {
        delimiter = '`'
        value = value.replace(/`/g, '\\`')
      } else if (value.includes('"') && !value.includes("'")) {
        delimiter = "'"
      } else if (value.includes("'") && !value.includes('"')) {
        delimiter = '"'
      } else if (value.includes('"') && value.includes("'")) {
        if (!value.includes('`')) {
          delimiter = '`'
        } else {
          value = escape(value)
        }
      }

      if (!value.trim()) {
        return ''
      }

      return `${delimiter}${value}${delimiter}`
    }

    let out = ''
    if (node.attrs && node.attrs.length) {
      out = node.attrs.map(({ name, value }) => `${name}: '${value}'`).join(', ')
    }

    if (out) {
      out = `{ ${out} }`
    }

    if (node.childNodes && node.childNodes.length) {
      const children = stringifyAst(node)

      if (out) {
        out += ', '
      }

      if (is.array(children)) {
        if (is.len.gt(children, 1)) {
          out += `[${children.join(', ')}]`
        } else if (is.len.eq(children, 1)) {
          out += children[0]
        }
      } else if (is.string(children)) {
        if (children.includes(',\n')) {
          out += `[${children}]`
        } else {
          out += children
        }
      } else {
        log.error('unknown children', 'please report this as a bug, including your input', children)
      }
    }

    if (node.tagName === 'a') {
      node.tagName = 'Link'
      out = out.replace('href:', 'to:')
    }

    return `${node.tagName}(${out})`
  })

  return stringified
    .map(a => a.trim())
    .filter(a => a)
    .join(',\n')
}

export const md = markdown

export default {
  html,
  markdown,
  md,
}
