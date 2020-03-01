import defaults from 'marked/src/defaults.js'
import helpers from 'marked/src/helpers.js'

const { cleanUrl,  escape } = helpers

export class MarkedMagicRenderer {
  constructor(options) {
    this.options = options || defaults;
  }

  code(code, infostring, escaped) {
    const lang = (infostring || '').match(/\S*/)[0]

    if (!lang) {
      return 'Pre(`' + code + '`),\n'
    }

    lang = escape(lang, true)

    return "Pre({ class: '" + lang + "' }, `" + code + '`),\n'
  }

  blockquote = quote => 'blockquote(`' + quote + '`),\n'

  html = html => {
    if (!html.includes('<')) {
      console.log({html});
      html = `'${html}'`
      return html
    }

    html = html.trim()

    let selfClosing = false
    if (html.endsWith('/>')) {
      selfClosing = true
    }

    if (selfClosing) {
      console.log('SELF CLOSING');
      // remove leading <
      html = html.substr(1)
      // remove trailing />
      html = html.substr(0, html.length - 2)

      console.log(html)
    }

    // get tagName
    const tagName = html.substr(1).split(' ')[0]

    let [head, body] = html.split('>')

    body = body && body.replace('/>', '').replace(`</${tagName}`, '').trim()

    if (body) {
      body = this.html(body)
    }

    const rege = /<tagName/gim

    const args = head.replace(`<${tagName}`, '').replace(' state ', ' state="state" ')

    const argRegex = / .*?=".*?"/gim

    let matches = args.match(argRegex)

    if (matches) {
      matches = Object.fromEntries(matches.map(match => {
        const [first, ...rest] = match.split('=')
        return [first.trim(), rest.join('=').trim()]
      }))
    }

    console.log({ tagName, head, matches, args, body })

    return ''
  }

  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      return `h${level}({ id: '${this.options.headerPrefix + slugger.slug(raw)}' }, '${text}'),\n`
    }

    // ignore IDs
    return `h${level}('${text}'),\n`
  }

  hr = () => 'hr(),\n'

  list(body, ordered, start) {
    const type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';

    return `${type}${startatt}([\n${body}]),\n`
  }

  listitem = text => `li(${this.html(text)}),\n`

  checkbox = checked => {
    checked = checked ? "checked: '', " : ''

    return `input({ ${checked}disabled: '', type: 'checkbox' })`
  }

  paragraph = text => `p(${this.html(text)}),\n`

  table = (header, body) => {
    if (body) {
      body = `tbody(${this.html(body)}),\n`
    } else {
      body = ''
    }

    return `table([thead(${this.html(header)}), ${body}]),\n`
  }

  tablerow = content => `tr(${this.html(content)}),\n`

  tablecell = (content, flags) => {
    const type = flags.header ? 'th' : 'td';

    const tag = flags.align
      ? `${type}({ align: '${flags.align}' }, `
      : `${type}(`

    return `${tag}${this.html(content)}),`
  };

  // span level renderer
  strong = (text) => `strong(${this.html(text)})`

  em = text => `em(${this.html(text)})`

  codespan = text => 'Pre(`' + text + '`),'

  br = () => 'br(),\n'

  del = text => `del(${this.html(text)}),`

  link = (href, title, text) => {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href)

    if (href === null) {
      return text
    }

    let out = `<a href="${escape(href)}"`

    if (title) {
      out += `, title="${title}"`
    }

    out += `>${this.html(text)}</a>,`

    return out
  }

  image = (href, title, text) => {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);

    if (href === null) {
      return text
    }

    let out = `Img({ src: '${href}', alt: '${text}'`

    if (title) {
      out += `, title: '${title}'`
    }

    out += ' }),'

    return out
  }

  text = (text) => text
}
