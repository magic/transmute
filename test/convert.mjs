import { convertMarkdown, convertHtml } from '../src/index.mjs'

import * as inputs from "./.data/inputs.mjs"

export default [
  { fn: convertMarkdown(inputs.h1.md), expect: inputs.h1.magic, info: 'can handle h1' },
  { fn: convertMarkdown(inputs.h1Long.md), expect: inputs.h1Long.magic, info: 'can handle h1 in two lines' },
  { fn: convertMarkdown(inputs.h2.md), expect: inputs.h2.magic, info: 'can handle h2' },
  { fn: convertMarkdown(inputs.h3.md), expect: inputs.h3.magic, info: 'can handle h3' },
  { fn: convertMarkdown(inputs.h4.md), expect: inputs.h4.magic, info: 'can handle h4' },
  { fn: convertMarkdown(inputs.h5.md), expect: inputs.h5.magic, info: 'can handle h5' },
  { fn: convertMarkdown(inputs.link.md), expect: inputs.link.magic, info: 'can handle links' },
  { fn: convertMarkdown(inputs.code.md), expect: inputs.code.magic, info: 'can handle code blocks with language' },
  { fn: convertMarkdown(inputs.codeNoLang.md), expect: inputs.codeNoLang.magic, info: 'can handle code blocks without language' },
  { fn: convertMarkdown(inputs.paragraph.md), expect: inputs.paragraph.magic, info: 'can handle paragraphs' },
  { fn: convertMarkdown(inputs.strong.md), expect: inputs.strong.magic, info: 'can handle strong' },
  { fn: convertMarkdown(inputs.italic.md), expect: inputs.italic.magic, info: 'can handle italics' },
  { fn: convertMarkdown(inputs.sentence.md), expect: inputs.sentence.magic, info: 'can handle sentences' },
  { fn: convertMarkdown(inputs.ul.md), expect: inputs.ul.magic, info: 'can handle ul lists' },

  { fn: convertHtml(inputs.h1.html), expect: inputs.h1.magic, info: 'can handle h1' },
  { fn: convertHtml(inputs.h2.html), expect: inputs.h2.magic, info: 'can handle h2' },
  { fn: convertHtml(inputs.h3.html), expect: inputs.h3.magic, info: 'can handle h3' },
  { fn: convertHtml(inputs.h4.html), expect: inputs.h4.magic, info: 'can handle h4' },
  { fn: convertHtml(inputs.h5.html), expect: inputs.h5.magic, info: 'can handle h5' },
  { fn: convertHtml(inputs.link.html), expect: inputs.link.magic, info: 'can handle links' },
  { fn: convertHtml(inputs.code.html), expect: inputs.code.magic, info: 'can handle code blocks with language' },
  { fn: convertHtml(inputs.codeNoLang.html), expect: inputs.codeNoLang.magic, info: 'can handle code blocks without language' },
  { fn: convertHtml(inputs.paragraph.html), expect: inputs.paragraph.magic, info: 'can handle paragraphs' },
  { fn: convertHtml(inputs.strong.html), expect: inputs.strong.magic, info: 'can handle strong' },
  { fn: convertHtml(inputs.italic.html), expect: inputs.italic.magic, info: 'can handle italics' },
  { fn: convertHtml(inputs.sentence.html), expect: inputs.sentence.magic, info: 'can handle sentences' },
  { fn: convertHtml(inputs.ul.html), expect: inputs.ul.magic, info: 'can handle ul lists' },
]
