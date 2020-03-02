import is from '@magic/types'

const handleContent = content => {
  if (is.array(content)) {
    if (content.length === 1) {
      return posthtmlMagicRenderer(content[0])
    }

    content = `[${content.map(posthtmlMagicRenderer).filter(a => a)}]`
  }

  if (!content) {
    content = ''
  }

  return content
}

const handleAttrs = attrs => {
  if (attrs) {
    attrs = Object.entries(attrs)
      .map(([key, val]) => (!val ? key : `${key}: '${val}'`))
      .filter(a => a)
      .join(', ')

    attrs = `{ ${attrs} }`
  } else {
    attrs = ''
  }

  return attrs
}

export const posthtmlMagicRenderer = (ast, modules) => {
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

  return ast.map(posthtmlMagicRenderer).filter(a => a)
}
