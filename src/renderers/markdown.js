import { Renderer } from 'marked'

export const markdown = new Renderer()

// Slugger implementation (removed from marked v5+)
// No deduplication - reset state for each slugify call
const slugify = str => {
  let s = str
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
  return s
}

/* overwrite builtin markdown functions to use @magic modules */

markdown.code = token => {
  const { text, lang } = token
  const language = (lang || '').match(/\S*/)[0]

  if (!language) {
    return `<Pre>${text}</Pre>\n`
  }

  return `<Pre class="${language}">${text}</Pre>`
}

markdown.codespan = token => `<Pre lines="false">${token.text}</Pre>`

markdown.link = token => {
  const { href, title, text } = token
  if (href === null) {
    return text
  }

  let out = `<Link to="${href}"`

  if (title) {
    out += ` title="${title}"`
  }

  if (text) {
    out += ` text="${text}"`
  }

  out += '></Link>'

  return out
}

markdown.image = token => {
  const { href, title, text } = token
  if (href === null) {
    return text
  }

  let out = `<Img src="${href}"`

  if (text) {
    out += ` alt="${text}"`
  }

  if (title) {
    out += ` title="${title}"`
  }

  out += '/>'

  return out
}

markdown.heading = token => {
  let { text, depth } = token
  let id = slugify(text)
  let cssClass = ''

  if (text.startsWith('#')) {
    let [setId, ...t] = text.split(' ')

    text = t.join(' ')

    if (setId.endsWith('-')) {
      setId += text
    }

    id = slugify(setId.substr(1))
  }

  if (text.startsWith('.')) {
    let [setClass, ...t] = text.split(' ')

    text = t.join(' ')

    if (setClass.endsWith('-')) {
      setClass += text
    }

    cssClass = ` class="${slugify(setClass)}"`
  }

  return `<h${depth} id="${id}"${cssClass}>${text}</h${depth}>\n`
}

markdown.html = token => {
  let html = token.text || token.raw
  if (html.startsWith('<img')) {
    html = html.replace('<img', '<Img')
  }

  if (html.startsWith('<a')) {
    html = html.replace('<a', '<Link').replace('</a>', '</Link>')
  }

  if (html.startsWith('</a>')) {
    html = html.replace('</a>', '</Link>')
  }

  return html
}

markdown.paragraph = token => {
  const text = token.text || ''
  const inlineTokens = token.tokens || []

  // Check if single token that shouldn't be wrapped in <p>
  if (inlineTokens.length === 1) {
    const t = inlineTokens[0]
    if (t.type === 'link') {
      let out = `<Link to="${t.href}"`
      if (t.title) out += ` title="${t.title}"`
      out += ` text="${t.text}"></Link>`
      return out + '\n'
    }
    if (t.type === 'image') {
      let out = `<Img src="${t.href}"`
      if (t.text) out += ` alt="${t.text}"`
      if (t.title) out += ` title="${t.title}"`
      return out + '/>\n'
    }
    if (t.type === 'codespan') {
      return `<Pre lines="false">${t.text}</Pre>\n`
    }
    // Single html token that starts with block-level tag
    if (t.type === 'html') {
      const raw = t.raw || t.text || ''
      if (
        raw.startsWith('<a ') ||
        raw.startsWith('<img') ||
        raw.startsWith('<A ') ||
        raw.startsWith('<IMG')
      ) {
        return raw + '\n'
      }
    }
  }

  // Check if paragraph is a standalone block element (link with text content)
  // If tokens are [html, text, html] pattern representing a complete link, don't wrap
  if (inlineTokens.length === 3) {
    const [open, content, close] = inlineTokens
    if (
      open?.type === 'html' &&
      close?.type === 'html' &&
      content?.type === 'text' &&
      open?.raw?.startsWith('<a ') &&
      close?.raw === '</a>'
    ) {
      return text + '\n'
    }
  }

  // Render inline tokens
  const renderInline = tokens => {
    return tokens
      .map(t => {
        if (t.type === 'link') {
          let out = `<Link to="${t.href}"`
          if (t.title) out += ` title="${t.title}"`
          out += ` text="${t.text}"></Link>`
          return out
        }
        if (t.type === 'strong' || t.type === 'em') {
          const inner = t.tokens ? renderInline(t.tokens) : t.text
          const tag = t.type === 'strong' ? 'b' : 'em'
          return `<${tag}>${inner}</${tag}>`
        }
        if (t.type === 'codespan') {
          return `<Pre lines="false">${t.text}</Pre>`
        }
        if (t.type === 'image') {
          let out = `<Img src="${t.href}"`
          if (t.text) out += ` alt="${t.text}"`
          if (t.title) out += ` title="${t.title}"`
          out += '/>'
          return out
        }
        return t.text || ''
      })
      .join('')
  }

  if (text.startsWith('<')) {
    const tagName = text.substr(1).split(' ')[0].split('>')[0]

    const inlineTags = ['a', 'img', 'strong', 'b', 'i', 'em']

    if (inlineTags.includes(tagName)) {
      return `<p>${text}</p>\n`
    } else {
      return `${text}\n`
    }
  }

  const rendered = inlineTokens.length ? renderInline(inlineTokens) : text
  return `<p>${rendered}</p>\n`
}

markdown.strong = token => `<b>${token.text}</b>`
