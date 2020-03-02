import marked from 'marked'
import helpers from 'marked/src/helpers.js'

const { cleanUrl, escape } = helpers

export const markedMagicRenderer = new marked.Renderer()

markedMagicRenderer.code = (code, infostring, escaped) => {
  let lang = (infostring || '').match(/\S*/)[0]

  if (!escaped) {
    code = code.replace(/</g, '&lt;')
  }

  if (!lang) {
    return `<Pre>${code}</Pre>\n`
  }

  lang = escape(lang, true)

  return `<Pre class="${lang}">${code}</Pre>`
}

markedMagicRenderer.codespan = text => `<Pre>${text}</Pre>`

markedMagicRenderer.link = (href, title, text) => {
  if (href === null) {
    return text
  }

  let out = `<Link to="${escape(href)}"`

  if (title) {
    out += ` title="${title}"`
  }

  if (text) {
    out += ` text="${text}"`
  }

  out += '></Link>'

  return out
}

markedMagicRenderer.image = (href, title, text) => {
  href = cleanUrl(this.options.sanitize, this.options.baseUrl, href)

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

markedMagicRenderer.heading = (text, level, raw, slugger) => {
  let id = slugger.slug(raw)
  let cssClass = ''

  if (raw.startsWith('#')) {
    let [setId, ...t] = raw.split(' ')

    text = t.join(' ')

    if (setId.endsWith('-')) {
      setId += text
    }

    id = slugger.slug(setId.substr(1))
  }

  if (text.startsWith('.')) {
    let [setClass, ...t] = raw.split(' ')

    text = t.join(' ')

    if (setClass.endsWith('-')) {
      setClass += text
    }

    cssClass = ` class="${slugger.slug(setClass)}"`
  }

  return `<h${level} id="${id}"${cssClass}>${text}</h${level}>\n`
}

markedMagicRenderer.html = html => {
  if (html.startsWith('<img')) {
    html = html.replace('<img', '<Img')
  }

  if (html.startsWith('<a')) {
    html = html.replace('<a', '<Link').replace('</a>', '</Link>')
  }

  return html
}

markedMagicRenderer.paragraph = text => {
  if (text.startsWith('<')) {
    const tagName = text.substr(1).split(' ')[0]

    const inlineTags = ['a', 'Link', 'img', 'Img', 'strong', 'b', 'i', 'em']

    if (inlineTags.includes(tagName)) {
      return `<p>${text}</p>\n`
    } else {
      return `${text}\n`
    }
  }

  return `<p>${text}</p>\n`
}
