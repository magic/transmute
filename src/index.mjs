import fs from 'fs'
import path from 'path'

import log from '@magic/log'
import is from '@magic/types'

import marked from 'marked'
import parse5 from 'parse5'
import prettier from 'prettier'

const escape = str => str.replace(/'/g, "\\'")

export const markdown = input => {
  const md = marked(input)
  return html(md)
}

export const html = input => {
  const ast = parse5.parseFragment(input)
  const out = stringifyAst(ast)

  return out
}

const stringifyAst = ast => {
  if (ast.nodeName === '#text') {
    return `'${escape(ast.value)}'`
  }

  const stringified = ast.childNodes.map(node => {
    if (node.nodeName === '#text') {
      return node.value.trim() ? `'${escape(node.value)}'` : ''
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

    if (node.tagName) {
      if (node.tagName === 'a') {
        node.tagName = 'Link'
        out = out.replace('href:', 'to:')
      }
      return `${node.tagName}(${out})`
    } else if (out) {
      return out
    }
  })

  return stringified
    .filter(a => a)
    .map(a => a.trim())
    .join(',\n')
}

export const md = markdown

export default {
  html,
  markdown,
  md,
}
