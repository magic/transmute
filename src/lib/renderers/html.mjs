import is from '@magic/types'

const handleContent = content => {
  if (is.array(content)) {
    if (content.length === 1) {
      return html(content[0])
    }

    content = `[${content.map(html).filter(a => a)}]`
  }

  if (!content) {
    content = ''
  }

  return content
}

const delimiters = ['"', "'", '`']

const handleAttrs = attrs => {
  if (attrs) {
    attrs = Object.entries(attrs)
      .map(([key, val]) => {
        val = val.trim()

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

    if (ast.includes('\n')) {
      ast = '`' + ast.split('\n').join('\n') + '`'
    } else {
      ast = `'${ast}'`
    }

    return ast
  }

  if (is.objectNative(ast)) {
    let { tag, attrs, content } = ast

    content = handleContent(content)
    if (is.string(content)) {
      content = content.trim()
    }

    attrs = handleAttrs(attrs)

    if (attrs && content) {
      attrs += ', '
    }

    return `${tag}(${attrs}${content})`
  }

  return ast.map(html).filter(a => a)
}
