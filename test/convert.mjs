import { markdown, html } from '../src/index.mjs'

import * as inputs from "./.data/inputs.mjs"

export default [
  { fn: markdown(inputs.h1.md), expect: inputs.h1.magic, info: 'can handle h1' },
  { fn: markdown(inputs.h1Long.md), expect: inputs.h1Long.magic, info: 'can handle h1 in two lines' },
  { fn: markdown(inputs.h2.md), expect: inputs.h2.magic, info: 'can handle h2' },
  { fn: markdown(inputs.h3.md), expect: inputs.h3.magic, info: 'can handle h3' },
  { fn: markdown(inputs.h4.md), expect: inputs.h4.magic, info: 'can handle h4' },
  { fn: markdown(inputs.h5.md), expect: inputs.h5.magic, info: 'can handle h5' },
  { fn: markdown(inputs.link.md), expect: inputs.link.magic, info: 'can handle links' },
  { fn: markdown(inputs.code.md), expect: inputs.code.magic, info: 'can handle code blocks with language' },
  { fn: markdown(inputs.codeNoLang.md), expect: inputs.codeNoLang.magic, info: 'can handle code blocks without language' },
  { fn: markdown(inputs.paragraph.md), expect: inputs.paragraph.magic, info: 'can handle paragraphs' },
  { fn: markdown(inputs.strong.md), expect: inputs.strong.magic, info: 'can handle strong' },
  { fn: markdown(inputs.italic.md), expect: inputs.italic.magic, info: 'can handle italics' },
  { fn: markdown(inputs.sentence.md), expect: inputs.sentence.magic, info: 'can handle sentences' },
  { fn: markdown(inputs.ul.md), expect: inputs.ul.magic, info: 'can handle ul lists' },

  { fn: html(inputs.h1.html), expect: inputs.h1.magic, info: 'can handle h1' },
  { fn: html(inputs.h2.html), expect: inputs.h2.magic, info: 'can handle h2' },
  { fn: html(inputs.h3.html), expect: inputs.h3.magic, info: 'can handle h3' },
  { fn: html(inputs.h4.html), expect: inputs.h4.magic, info: 'can handle h4' },
  { fn: html(inputs.h5.html), expect: inputs.h5.magic, info: 'can handle h5' },
  { fn: html(inputs.link.html), expect: inputs.link.magic, info: 'can handle links' },
  { fn: html(inputs.code.html), expect: inputs.code.magic, info: 'can handle code blocks with language' },
  { fn: html(inputs.codeNoLang.html), expect: inputs.codeNoLang.magic, info: 'can handle code blocks without language' },
  { fn: html(inputs.paragraph.html), expect: inputs.paragraph.magic, info: 'can handle paragraphs' },
  { fn: html(inputs.strong.html), expect: inputs.strong.magic, info: 'can handle strong' },
  { fn: html(inputs.italic.html), expect: inputs.italic.magic, info: 'can handle italics' },
  { fn: html(inputs.sentence.html), expect: inputs.sentence.magic, info: 'can handle sentences' },
  { fn: html(inputs.ul.html), expect: inputs.ul.magic, info: 'can handle ul lists' },
]
