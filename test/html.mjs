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
  htmlModule,
  html as htmlLink,
  unescapeTest,
} from './.data/inputs.mjs'

export default [
  { fn: html(h1.html).rendered, expect: h1.magic, info: 'can handle h1' },
  { fn: html(h2.html).rendered, expect: h2.magic, info: 'can handle h2' },
  { fn: html(h3.html).rendered, expect: h3.magic, info: 'can handle h3' },
  { fn: html(h4.html).rendered, expect: h4.magic, info: 'can handle h4' },
  { fn: html(h5.html).rendered, expect: h5.magic, info: 'can handle h5' },
  { fn: html(link.html).rendered, expect: link.magic, info: 'can handle links' },
  {
    fn: html(code.html).rendered,
    expect: code.magic,
    info: 'can handle code blocks with language',
  },
  {
    fn: html(codeNoLang.html).rendered,
    expect: codeNoLang.magic,
    info: 'can handle code blocks without language',
  },
  {
    fn: html(p.html).rendered,
    expect: p.magic,
    info: 'can handle paragraphs',
  },
  { fn: html(strong.html).rendered, expect: strong.magic, info: 'can handle strong' },
  { fn: html(italic.html).rendered, expect: italic.magic, info: 'can handle italics' },
  { fn: html(sentence.html).rendered, expect: sentence.magic, info: 'can handle sentences' },
  { fn: html(ul.html).rendered, expect: ul.magic, info: 'can handle ul lists' },
  { fn: html(ulSingle.html).rendered, expect: ulSingle.magic, info: 'can handle ul lists' },

  {
    fn: html(unescapeTest.html).rendered,
    expect: unescapeTest.magic,
    info: 'can handle unescapes',
  },

  {
    fn: html(htmlModule.html, {}, ['ModuleName']).rendered,
    expect: htmlModule.magic,
    info: 'can handle MagicModules',
  },
]
