import cases from '@magic/cases'
import is from '@magic/types'

import { stringDecode } from '../lib/index.js'

/**
 * @typedef {import('posthtml-parser').NodeTag} NodeTag
 * @typedef {string | number | NodeTag} NodeValue
 */

/**
 * @param {Array<NodeValue>} content
 * @returns {string | Array<string>}
 */
const handleContent = content => {
  if (is.empty(content)) {
    return ''
  }

  /** @type {Array<NodeValue> | string} */
  let out = content.filter(a => (!is.string(a) ? a : a.trim()))

  if (is.array(out)) {
    if (out.length === 1) {
      let cnt = out[0]
      if (is.string(cnt)) {
        cnt = stringDecode(cnt)
      }

      return html(cnt)
    }

    out = `[${out.map(html).filter(a => a)}]`
  }

  if (!out) {
    out = ''
  }

  if (is.string(out)) {
    return stringDecode(out)
  }

  return out
}

/**
 * @param {Record<string, string | number | boolean> | undefined} attrs
 * @param {string | boolean | undefined} tag
 * @returns {string}
 */
const handleAttrs = (attrs, tag) => {
  if (!attrs) {
    return ''
  }

  const out = Object.entries(attrs)
    .map(([key, rawVal]) => {
      const val = /** @type {string} */ (rawVal)
      const trimmed = val.trim()

      let outKey = key

      if ((tag === 'a' || tag === 'Link') && outKey === 'href') {
        outKey = 'to'
      }

      outKey = cases.camel(outKey)

      if (!trimmed) {
        return outKey
      }

      if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
        return `${outKey}: ${trimmed}`
      }

      return `${outKey}: '${trimmed}'`
    })
    .filter(a => a)
    .join(', ')

  return `{ ${out} }`
}

/**
 * @param {NodeValue | Array<NodeValue>} ast
 * @returns {string | Array<string>}
 */
export const html = ast => {
  if (is.string(ast)) {
    if (!ast.trim()) {
      return ''
    }

    ast = stringDecode(ast)

    if (ast.includes('\n')) {
      ast = '`' + ast + '`'
    } else {
      if (!ast.includes("'")) {
        ast = `'${ast}'`
      } else if (!ast.includes('"')) {
        ast = `"${ast}"`
      } else if (!ast.includes('`')) {
        ast = '`' + ast + '`'
      } else {
        ast = ast
          .split("'")
          .map(a => (a.endsWith('\\') ? a.substr(0, a.length - 1) : a))
          .join("\\'")
      }
    }

    return ast
  }

  if (is.objectNative(ast)) {
    const node = /** @type {NodeTag} */ (ast)
    let { tag } = node
    const rawContent = node.content

    let content = handleContent(/** @type {Array<NodeValue>} */ (rawContent))

    let attrs = handleAttrs(node.attrs, tag)

    if (attrs && !is.empty(content)) {
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

    if (is.string(content)) {
      content = stringDecode(content.trim())
    }

    if (is.empty(content)) {
      content = ''
    }

    return `${tag}(${attrs}${content})`
  }

  const nodes = /** @type {Array<NodeValue>} */ (ast)
  const out = /** @type {Array<string>} */ (nodes.map(html))

  return out.filter(a => a)
}
