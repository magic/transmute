import transmute, { html, md } from '../src/index.js'

/** @param {Record<string, unknown>} state */
const stateBlock = state => `---
@state
${JSON.stringify(state)}
---
<h1 id="hi">Hello ${'$'}{state.name}</h1>`

/** @param {Record<string, unknown>} state */
const mdStateBlock = state => `---
@state
${JSON.stringify(state)}
---
# Hello ${'$'}{state.name}`

export default [
  {
    fn: () => md('# Hello ${state.name}', { name: 'world' }).rendered,
    expect: ["h1({ id: 'hello-world' }, 'Hello world')"],
    info: 'markdown implants state variables from the state argument',
  },
  {
    fn: () => html('<h1 id="hi">Hello {{state.name}}</h1>', { name: 'world' }).rendered,
    expect: ["h1({ id: 'hi' }, 'Hello world')"],
    info: 'html implants state variables from the state argument',
  },
  {
    fn: () => html(stateBlock({ name: 'world' })).rendered,
    expect: ["h1({ id: 'hi' }, 'Hello world')"],
    info: 'html implants state variables from an @state block in the input',
  },
  {
    fn: () => md(mdStateBlock({ name: 'world' })).rendered,
    expect: ["h1({ id: 'hello-world' }, 'Hello world')"],
    info: 'markdown implants state variables from an @state block in the input',
  },
  {
    fn: () => md('# Hello ${state.name}', { name: 'world' }).state,
    expect: { name: 'world' },
    info: 'returned state contains the merged state',
  },
  {
    fn: () => html(stateBlock({ name: 'world' })).originalState,
    expect: { name: 'world' },
    info: 'returned originalState contains state parsed from the @state block',
  },
  {
    fn: () => html('<p>a\nb</p>').rendered,
    expect: ['p(`a\nb`)'],
    info: 'multi-line text content is wrapped in backticks',
  },
  {
    fn: () => html('<p>a</p><p>b</p>').rendered,
    expect: ["p('a')", "p('b')"],
    info: 'multiple top-level elements render as an array',
  },
  {
    fn: () => html('<img src="/x.jpg" alt="x"/>').rendered,
    expect: ["Img({ src: '/x.jpg', alt: 'x' })"],
    info: 'img element renders as Img with attributes',
  },
  {
    fn: () => html('<div hidden>x</div>').rendered,
    expect: ["div({ hidden }, 'x')"],
    info: 'bare attributes render as key only',
  },
  {
    fn: () => md('# #my-id hello world').rendered,
    expect: ["h1({ id: 'my-id' }, 'hello world')"],
    info: 'markdown heading with # prefix sets a custom id',
  },
  {
    fn: () => md('## .my-class hello').rendered,
    expect: ["h2({ id: 'my-class-hello', class: 'my-class' }, 'hello')"],
    info: 'markdown heading with . prefix sets a custom class',
  },
  {
    fn: () => md('[t](http://x.com "my title")').rendered,
    expect: ["Link({ to: 'http://x.com', title: 'my title', text: 't' })"],
    info: 'markdown link with title keeps the title attribute',
  },
  {
    fn: () => md('![a](/x.jpg "pic")').rendered,
    expect: ["Img({ src: '/x.jpg', alt: 'a', title: 'pic' }, [])"],
    info: 'markdown image with title keeps the title attribute',
  },
  {
    fn: () => md('bold **strong** text').rendered,
    expect: ["p(['bold ',b('strong'),' text'])"],
    info: 'paragraph mixing text and strong renders an array of children',
  },
  {
    fn: () => transmute.md('paragraph').rendered,
    expect: ["p('paragraph')"],
    info: 'default export md works like the named export',
  },
]
