import { is, version } from '@magic/test'

import transmute, { html, markdown, md } from '../src/index.mjs'

const spec = {
  html: 'fn',
  markdown: 'fn',
  md: 'fn',
}

export default [
  ...version(transmute, spec),
  { fn: () => html, expect: is.fn, info: 'transmute.html is a function' },
  {
    fn: () => html,
    expect: is.deep.eq(transmute.html),
    info: 'export default.html equals export const html',
  },
  { fn: () => markdown, expect: is.fn, info: 'transmute.markdown is a function' },
  {
    fn: () => markdown,
    expect: is.deep.eq(transmute.markdown),
    info: 'export default.markdown equals export const markdown',
  },
  { fn: () => md, expect: is.fn, info: 'transmute.md is a function' },
  { fn: () => md, expect: is.deep.eq(markdown), info: 'md and markdown exports are equal' },
  {
    fn: () => md,
    expect: is.deep.eq(transmute.markdown),
    info: 'transmute.md and transmute.markdown are the same function',
  },
  {
    fn: () => md,
    expect: is.deep.eq(transmute.md),
    info: 'transmute.md and export const md are the same function',
  },
]
