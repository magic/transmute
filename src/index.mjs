import fs from 'fs'
import path from 'path'

import log from '@magic/log'
import is from '@magic/types'
import cases from '@magic/cases'

import marked from 'marked'
import parse5 from 'parse5'

import { escape, findState, implantState } from './lib/index.mjs'

export const markdown = (string, state = {}, modules = []) => {
  const { input, state: st = {} } = findState(string)

  if (!is.empty(st)) {
    string = input
    state = { ...state, ...st }
  }

  const implanted = implantState({ input, state })
  const md = marked(implanted)
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

const stringifyAst = (ast, modules = []) => {
  if (ast.nodeName === '#text') {
    return `'${escape(ast.value)}'`
  }

  modules.forEach(mod => {
    if (mod.toLowerCase() === ast.nodeName) {
      ast.nodeName = mod
      ast.tagName = mod
    }
  })

  const stringified = ast.childNodes.map(node => {
    let { value } = node

    modules.forEach(mod => {
      if (mod.toLowerCase() === node.nodeName) {
        node.nodeName = mod
        node.tagName = mod
      }
    })

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
      out = node.attrs.map(({ name, value }) => `${cases.camel(name)}: '${value}'`).join(', ')
    }

    if (out) {
      out = `{ ${out} }`
    }

    if (node.childNodes && node.childNodes.length) {
      const children = stringifyAst(node, modules)

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

    if (out === "{ state: 'state' }") {
      out = 'state'
    } else if (out.includes("{ state: '' }")) {
      out = out.replace("{ state: '' }", 'state')
    } else if (out.includes("state: 'state'")) {
      out = out.replace("state: 'state'", 'state')
    } else if (out.includes("state: ''")) {
      out = out.replace("state: ''", 'state')
    }

    const result = `${node.tagName}(${out})`
    return result
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
