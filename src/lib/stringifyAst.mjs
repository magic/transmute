import is from '@magic/types'
import cases from '@magic/cases'

export const stringifyAst = (ast, modules = []) => {
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
      if (mod.toLowerCase() === node.nodeName && mod !== node.nodeName) {
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
