import { html } from '../src/index.mjs'

import {
  h1,
  h1Long,
  h2,
  h3,
  h4,
  h5,
  link,
  code,
  codeNoLang,
  p,
  strong,
  italic,
  sentence,
  ul,
  ulSingle,
} from './.data/inputs.mjs'

export default [
  { fn: html(h1.html), expect: h1.magic, info: 'can handle h1' },
  { fn: html(h2.html), expect: h2.magic, info: 'can handle h2' },
  { fn: html(h3.html), expect: h3.magic, info: 'can handle h3' },
  { fn: html(h4.html), expect: h4.magic, info: 'can handle h4' },
  { fn: html(h5.html), expect: h5.magic, info: 'can handle h5' },
  { fn: html(link.html), expect: link.magic, info: 'can handle links' },
  { fn: html(code.html), expect: code.magic, info: 'can handle code blocks with language' },
  {
    fn: html(codeNoLang.html),
    expect: codeNoLang.magic,
    info: 'can handle code blocks without language',
  },
  {
    fn: html(p.html),
    expect: p.magic,
    info: 'can handle paragraphs',
  },
  { fn: html(strong.html), expect: strong.magic, info: 'can handle strong' },
  { fn: html(italic.html), expect: italic.magic, info: 'can handle italics' },
  { fn: html(sentence.html), expect: sentence.magic, info: 'can handle sentences' },
  { fn: html(ul.html), expect: ul.magic, info: 'can handle ul lists' },
  { fn: html(ulSingle.html), expect: ulSingle.magic, info: 'can handle ul lists' },
]
