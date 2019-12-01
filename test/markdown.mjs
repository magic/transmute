import { md } from '../src/index.mjs'

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
  { fn: md(h1.md), expect: h1.magic, info: 'can handle h1' },
  {
    fn: md(h1Long.md),
    expect: h1Long.magic,
    info: 'can handle h1 in two lines',
  },
  { fn: md(h2.md), expect: h2.magic, info: 'can handle h2' },
  { fn: md(h3.md), expect: h3.magic, info: 'can handle h3' },
  { fn: md(h4.md), expect: h4.magic, info: 'can handle h4' },
  { fn: md(h5.md), expect: h5.magic, info: 'can handle h5' },
  { fn: md(link.md), expect: link.magic, info: 'can handle links' },
  {
    fn: md(code.md),
    expect: code.magic,
    info: 'can handle code blocks with language',
  },
  {
    fn: md(codeNoLang.md),
    expect: codeNoLang.magic,
    info: 'can handle code blocks without language',
  },
  {
    fn: md(p.md),
    expect: p.magic,
    info: 'can handle paragraphs',
  },
  { fn: md(strong.md), expect: strong.magic, info: 'can handle strong' },
  { fn: md(italic.md), expect: italic.magic, info: 'can handle italics' },
  { fn: md(sentence.md), expect: sentence.magic, info: 'can handle sentences' },
  { fn: md(ul.md), expect: ul.magic, info: 'can handle ul lists' },
  { fn: md(ulSingle.md), expect: ulSingle.magic, info: 'can handle ul lists' },
]
