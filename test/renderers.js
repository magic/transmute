import { html as htmlRenderer } from '../src/renderers/html.js'
import { markdown as markdownRenderer } from '../src/renderers/markdown.js'

/**
 * @param {string} tag
 * @param {Record<string, string>} [attrs]
 * @param {Array<string | import('posthtml-parser').NodeTag>} [content]
 * @returns {import('posthtml-parser').NodeTag}
 */
const node = (tag, attrs, content) => ({ tag, attrs, content })

/**
 * @param {string} href
 * @param {string} text
 * @param {string} title
 * @returns {import('marked').Tokens.Link}
 */
const linkToken = (href, text, title) => ({ type: 'link', raw: '', href, title, text, tokens: [] })

/**
 * @param {string} href
 * @param {string} text
 * @param {string} title
 * @returns {import('marked').Tokens.Image}
 */
const imageToken = (href, text, title) => ({ type: 'image', raw: '', href, title, text, tokens: [] })

/**
 * @param {string} text
 * @param {import('marked').Token[]} tokens
 * @returns {import('marked').Tokens.Paragraph}
 */
const paragraphToken = (text, tokens) => ({ type: 'paragraph', raw: '', text, tokens })

export default [
  // ---- renderers/html: attribute handling ----
  {
    fn: () => htmlRenderer([node('div', { hidden: '' }, [])]),
    expect: ['div({ hidden })'],
    info: 'bare attribute renders as key only',
  },
  {
    fn: () => htmlRenderer([node('div', { a: '', b: 'x' }, [])]),
    expect: ["div({ a, b: 'x' })"],
    info: 'mixes bare and valued attributes',
  },
  {
    fn: () => htmlRenderer([node('div', { 'data-items': '[1, 2]' }, ['x'])]),
    expect: ["div({ dataItems: [1, 2] }, 'x')"],
    info: 'array-like attribute values are not quoted',
  },
  {
    fn: () => htmlRenderer([node('div', { 'data-obj': '{"a": 1}' }, ['x'])]),
    expect: ["div({ dataObj: {\"a\": 1} }, 'x')"],
    info: 'object-like attribute values are not quoted',
  },
  {
    fn: () => htmlRenderer([node('a', { href: 'http://x.com' }, [])]),
    expect: ["Link({ to: 'http://x.com' })"],
    info: 'a tag renders as Link with href renamed to to',
  },
  {
    fn: () => htmlRenderer([node('img', { src: '/x.jpg', alt: 'x' }, [])]),
    expect: ["Img({ src: '/x.jpg', alt: 'x' })"],
    info: 'img tag renders as Img',
  },
  {
    fn: () => htmlRenderer([node('italic', undefined, ['x'])]),
    expect: ["em('x')"],
    info: 'italic tag renders as em',
  },
  {
    fn: () => htmlRenderer([node('div', { 'data-items': '[1, 2]' }, [])]),
    expect: ['div({ dataItems: [1, 2] })'],
    info: 'attributes without content have no trailing comma',
  },

  // ---- renderers/html: string quoting ----
  { fn: () => htmlRenderer('a\nb'), expect: '`a\nb`', info: 'newline strings use backticks' },
  {
    fn: () => htmlRenderer("it's"),
    expect: "\"it's\"",
    info: 'single quote strings use double quotes',
  },
  {
    fn: () => htmlRenderer('it\'s "a"'),
    expect: '`it\'s "a"`',
    info: 'strings with both quotes use backticks',
  },
  {
    fn: () => htmlRenderer('it\'s "a" `b`'),
    expect: "it\\'s \"a\" `b`",
    info: 'strings with all quote types fall back to escaping',
  },
  { fn: () => htmlRenderer(''), expect: '', info: 'empty string renders nothing' },
  { fn: () => htmlRenderer('   '), expect: '', info: 'whitespace-only string renders nothing' },

  // ---- renderers/html: structure ----
  {
    fn: () =>
      htmlRenderer([
        node('div', undefined, [node('p', undefined, ['a']), node('p', undefined, ['b'])]),
      ]),
    expect: ["div([p('a'),p('b')])"],
    info: 'multiple child nodes render as an array',
  },
  {
    fn: () => htmlRenderer(['x', 'y']),
    expect: ["'x'", "'y'"],
    info: 'multiple top-level strings render as an array',
  },

  // ---- renderers/markdown: code/codespan tokens ----
  {
    fn: () => markdownRenderer.code({ type: 'code', raw: '', text: 'hello', lang: 'js' }),
    expect: '<Pre class="js">hello</Pre>',
    info: 'code token with a language renders a Pre with class',
  },
  {
    fn: () => markdownRenderer.code({ type: 'code', raw: '', text: 'hello' }),
    expect: '<Pre>hello</Pre>\n',
    info: 'code token without a language renders a plain Pre',
  },
  {
    fn: () => markdownRenderer.codespan({ type: 'codespan', raw: '', text: 'x' }),
    expect: '<Pre lines="false">x</Pre>',
    info: 'codespan token renders a single-line Pre',
  },

  // ---- renderers/markdown: link/image tokens ----
  {
    fn: () => markdownRenderer.link(linkToken('http://x.com', 'link', 'my title')),
    expect: '<Link to="http://x.com" title="my title" text="link"></Link>',
    info: 'link token renders Link with title and text',
  },
  {
    fn: () =>
      markdownRenderer.link(
        /** @type {import('marked').Tokens.Link} */ (
          /** @type {unknown} */ ({ type: 'link', raw: '', href: null, text: 'no link', tokens: [] })
        ),
      ),
    expect: 'no link',
    info: 'link token with null href renders plain text',
  },
  {
    fn: () => markdownRenderer.image(imageToken('/x.jpg', 'alt txt', 'pic')),
    expect: '<Img src="/x.jpg" alt="alt txt" title="pic"/>',
    info: 'image token renders Img with alt and title',
  },
  {
    fn: () =>
      markdownRenderer.image(
        /** @type {import('marked').Tokens.Image} */ (
          /** @type {unknown} */ ({
            type: 'image',
            raw: '',
            href: null,
            title: '',
            text: 'fallback',
            tokens: [],
          })
        ),
      ),
    expect: 'fallback',
    info: 'image token with null href renders plain text',
  },

  // ---- renderers/markdown: headings ----
  {
    fn: () =>
      markdownRenderer.heading({
        type: 'heading',
        raw: '',
        depth: 1,
        text: '#my-id hello world',
        tokens: [],
      }),
    expect: '<h1 id="my-id">hello world</h1>\n',
    info: 'heading with # prefix sets a custom id',
  },
  {
    fn: () =>
      markdownRenderer.heading({
        type: 'heading',
        raw: '',
        depth: 1,
        text: '#my- hello world',
        tokens: [],
      }),
    expect: '<h1 id="my-hello-world">hello world</h1>\n',
    info: 'heading with # prefix ending in dash swallows the rest of the id',
  },
  {
    fn: () =>
      markdownRenderer.heading({
        type: 'heading',
        raw: '',
        depth: 2,
        text: '.my-class hello',
        tokens: [],
      }),
    expect: '<h2 id="my-class-hello" class="my-class">hello</h2>\n',
    info: 'heading with . prefix sets a custom class',
  },
  {
    fn: () =>
      markdownRenderer.heading({
        type: 'heading',
        raw: '',
        depth: 2,
        text: '.my- hello',
        tokens: [],
      }),
    expect: '<h2 id="my-hello" class="my-hello">hello</h2>\n',
    info: 'heading with . prefix ending in dash swallows the rest of the class',
  },
  {
    fn: () =>
      markdownRenderer.heading({
        type: 'heading',
        raw: '',
        depth: 3,
        text: 'plain heading',
        tokens: [],
      }),
    expect: '<h3 id="plain-heading">plain heading</h3>\n',
    info: 'plain heading is slugified into the id',
  },

  // ---- renderers/markdown: html passthrough ----
  {
    fn: () =>
      markdownRenderer.html({
        type: 'html',
        raw: '<img src="x.jpg" alt="y"/>',
        pre: false,
        block: false,
        text: '<img src="x.jpg" alt="y"/>',
      }),
    expect: '<Img src="x.jpg" alt="y"/>',
    info: 'img html token is renamed to Img',
  },
  {
    fn: () =>
      markdownRenderer.html({
        type: 'html',
        raw: '<a href="/x">y</a>',
        pre: false,
        block: false,
        text: '<a href="/x">y</a>',
      }),
    expect: '<Link href="/x">y</Link>',
    info: 'a html token is renamed to Link',
  },
  {
    fn: () =>
      markdownRenderer.html({ type: 'html', raw: '</a>', pre: false, block: false, text: '</a>' }),
    expect: '</Link>',
    info: 'closing a tag is renamed to closing Link',
  },
  {
    fn: () => markdownRenderer.html({ type: 'html', raw: '<br>', pre: false, block: false, text: '' }),
    expect: '<br>',
    info: 'html token without text falls back to raw',
  },

  // ---- renderers/markdown: paragraph single tokens ----
  {
    fn: () =>
      markdownRenderer.paragraph(paragraphToken('[t](http://x.com)', [linkToken('http://x.com', 't', 'tt')])),
    expect: '<Link to="http://x.com" title="tt" text="t"></Link>\n',
    info: 'single link paragraph token is not wrapped in p',
  },
  {
    fn: () =>
      markdownRenderer.paragraph(paragraphToken('![a](/x.jpg)', [imageToken('/x.jpg', 'a', 'pic')])),
    expect: '<Img src="/x.jpg" alt="a" title="pic"/>\n',
    info: 'single image paragraph token is not wrapped in p',
  },
  {
    fn: () =>
      markdownRenderer.paragraph(
        paragraphToken('`c`', [{ type: 'codespan', raw: '', text: 'c' }]),
      ),
    expect: '<Pre lines="false">c</Pre>\n',
    info: 'single codespan paragraph token is not wrapped in p',
  },
  {
    fn: () =>
      markdownRenderer.paragraph(
        paragraphToken('<a href="/x">y</a>', [
          { type: 'html', raw: '<a href="/x">y</a>', text: '<a href="/x">y</a>' },
        ]),
      ),
    expect: '<a href="/x">y</a>\n',
    info: 'single html paragraph token starting with <a is not wrapped in p',
  },
  {
    fn: () =>
      markdownRenderer.paragraph(
        paragraphToken('<IMG src="x.jpg"/>', [
          { type: 'html', raw: '<IMG src="x.jpg"/>', text: '<IMG src="x.jpg"/>' },
        ]),
      ),
    expect: '<IMG src="x.jpg"/>\n',
    info: 'single html paragraph token starting with <IMG is not wrapped in p',
  },
  {
    fn: () =>
      markdownRenderer.paragraph(
        paragraphToken('<span>x</span>', [
          { type: 'html', raw: '<span>x</span>', text: '<span>x</span>' },
        ]),
      ),
    expect: '<span>x</span>\n',
    info: 'paragraph of non-inline html token is returned unwrapped',
  },
  {
    fn: () =>
      markdownRenderer.paragraph(
        paragraphToken('<a href="/x">y</a>', [{ type: 'html', raw: '', text: '<a href="/x">y</a>' }]),
      ),
    expect: '<a href="/x">y</a>\n',
    info: 'single html paragraph token without raw falls back to text',
  },
  {
    // Defensive: no text and no tokens exercises the `|| ''` / `|| []` fallbacks.
    fn: () =>
      markdownRenderer.paragraph(
        /** @type {import('marked').Tokens.Paragraph} */ (/** @type {unknown} */ ({ raw: '' })),
      ),
    expect: '<p></p>\n',
    info: 'paragraph without text or tokens renders an empty p',
  },

  // ---- renderers/markdown: paragraph link with text content ----
  {
    fn: () =>
      markdownRenderer.paragraph(
        paragraphToken('<a href="/x">y</a>', [
          { type: 'html', raw: '<a href="/x">' },
          { type: 'text', raw: '', text: 'y' },
          { type: 'html', raw: '</a>' },
        ]),
      ),
    expect: '<a href="/x">y</a>\n',
    info: 'paragraph shaped like a complete link is not wrapped in p',
  },

  // ---- renderers/markdown: paragraph inline rendering ----
  {
    fn: () =>
      markdownRenderer.paragraph(
        paragraphToken('a [t](http://x.com) b', [
          { type: 'text', raw: '', text: 'a ' },
          linkToken('http://x.com', 't', 'tt'),
          { type: 'text', raw: '', text: ' b' },
        ]),
      ),
    expect: '<p>a <Link to="http://x.com" title="tt" text="t"></Link> b</p>\n',
    info: 'paragraph with link inline token renders Link inside p',
  },
  {
    fn: () =>
      markdownRenderer.paragraph(
        paragraphToken('mixed inline', [
          { type: 'strong', raw: '', text: 'bold', tokens: [{ type: 'text', raw: '', text: 'bold' }] },
          { type: 'em', raw: '', text: 'em' },
          { type: 'codespan', raw: '', text: 'c' },
          imageToken('/x.jpg', 'a', 'pic'),
        ]),
      ),
    expect:
      '<p><b>bold</b><em>em</em><Pre lines="false">c</Pre><Img src="/x.jpg" alt="a" title="pic"/></p>\n',
    info: 'paragraph renders strong, em, codespan and image inline tokens',
  },
  {
    fn: () => markdownRenderer.paragraph(paragraphToken('<em>hi</em>', [])),
    expect: '<p><em>hi</em></p>\n',
    info: 'paragraph starting with an inline tag is wrapped in p',
  },
  {
    fn: () => markdownRenderer.paragraph(paragraphToken('<div>x</div>', [])),
    expect: '<div>x</div>\n',
    info: 'paragraph starting with a block tag is not wrapped in p',
  },
  {
    fn: () => markdownRenderer.paragraph(paragraphToken('plain', [])),
    expect: '<p>plain</p>\n',
    info: 'plain paragraph renders in p',
  },
  {
    fn: () =>
      markdownRenderer.paragraph(
        paragraphToken('x', [
          // text token without a text field exercises the empty-string fallback
          { type: 'text', raw: '' },
        ]),
      ),
    expect: '<p></p>\n',
    info: 'text inline token without text renders empty',
  },
  {
    fn: () =>
      markdownRenderer.paragraph(
        paragraphToken('x', [
          // html token without raw or text exercises the empty-string fallback
          { type: 'html', raw: '' },
        ]),
      ),
    expect: '<p></p>\n',
    info: 'html inline token without raw or text renders empty',
  },

  // ---- renderers/markdown: misc ----
  {
    fn: () => markdownRenderer.strong({ type: 'strong', raw: '', text: 'b', tokens: [] }),
    expect: '<b>b</b>',
    info: 'strong renders b tag',
  },
]
