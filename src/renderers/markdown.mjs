import { Renderer } from 'marked'

export const markdown = new Renderer()

/* overwrite builtin markdown functions to use @magic modules */

markdown.code = (code, infostring) => {
  let lang = (infostring || '').match(/\S*/)[0]

  if (!lang) {
    return `<Pre>${code}</Pre>\n`
  }

  return `<Pre class="${lang}">${code}</Pre>`
}

markdown.codespan = text => `<Pre lines="false">${text}</Pre>`

markdown.link = (href, title, text) => {
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

markdown.image = (href, title, text) => {
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

markdown.heading = (text, level, raw, slugger) => {
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

markdown.html = html => {
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

markdown.paragraph = text => {
  if (text.startsWith('<')) {
    const tagName = text.substr(1).split(' ')[0].split('>')[0]

    const inlineTags = ['a', 'img', 'strong', 'b', 'i', 'em']

    if (inlineTags.includes(tagName)) {
      return `<p>${text}</p>\n`
    } else {
      return `${text}\n`
    }
  }

  return `<p>${text}</p>\n`
}

markdown.strong = text => `<b>${text}</b>`
