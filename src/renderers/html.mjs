import cases from '@magic/cases'
import is from '@magic/types'

import { stringDecode } from '../lib/index.mjs'

const handleContent = content => {
  if (is.empty(content)) {
    return ''
  }

  content = content.filter(a => (!is.string(a) ? a : a.trim()))

  if (is.array(content)) {
    if (content.length === 1) {
      let cnt = content[0]
      if (is.string(cnt)) {
        cnt = stringDecode(cnt)
      }

      return html(cnt)
    }

    content = `[${content.map(html).filter(a => a)}]`
  }

  if (!content) {
    content = ''
  }

  if (is.string(content)) {
    return stringDecode(content)
  }

  return content
}

const delimiters = ['"', "'", '`']

const handleAttrs = (attrs, tag) => {
  if (attrs) {
    attrs = Object.entries(attrs)
      .map(([key, val]) => {
        val = val.trim()

        if (tag === 'a' || tag === 'Link') {
          if (key === 'href') {
            key = 'to'
          }
        }

        key = cases.camel(key)

        if (!val) {
          return key
        }

        if (val.startsWith('[') || val.startsWith('{')) {
          return `${key}: ${val}`
        }

        return `${key}: '${val}'`
      })
      .filter(a => a)
      .join(', ')

    attrs = `{ ${attrs} }`
  } else {
    attrs = ''
  }

  return attrs
}

export const html = ast => {
  if (is.string(ast)) {
    if (!ast.trim()) {
      return ''
    }

    ast = stringDecode(ast)

    if (ast.includes('\n')) {
      ast = '`' + ast.split('\n').join('\n') + '`'
    } else {
      if (!ast.includes("'") || !ast.replace("\\'", '').includes("'")) {
        ast = `'${ast}'`
      } else if (!ast.includes('"')) {
        ast = `"${ast}"`
      } else if (!ast.includes('`')) {
        ast = '`' + ast + '`'
      } else {
        throw new Error(
          'Invalid string found. Either do not use all three of ", ` and \', or escape one of them.',
        )
      }
    }

    return ast
  }

  if (is.objectNative(ast)) {
    let { tag, attrs, content } = ast

    content = handleContent(content)
    if (is.string(content)) {
      content = stringDecode(content).trim()
    }

    attrs = handleAttrs(attrs, tag)

    if (attrs && content) {
      attrs += ', '
    }

    if (tag === 'a') {
      tag = 'Link'
    }

    if (tag === 'img') {
      tag = 'Img'
    }

    if (tag === 'strong') {
      tag = 'b'
    }

    if (tag === 'italic') {
      tag = 'em'
    }

    return `${tag}(${attrs}${content})`
  }

  return ast.map(html).filter(a => a)
}
