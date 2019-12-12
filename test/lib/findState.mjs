import { findState } from '../../src/lib/index.mjs'

const str = `
---
@state
{
  "key": "value",
  "number": 23
}
---

# markdown content
`

const invalidString = `
---
this markdown file is nothing but a comment.
`

export default [
  { fn: findState(str).state.key, expect: 'value', info: 'state key can be set' },
  {
    fn: findState(str).input.trim(),
    expect: '# markdown content',
    info: 'markdown content stays intact',
  },
  {
    fn: findState(invalidString).input,
    expect: invalidString,
    info: 'markdown content without state but comment stays intact',
  },
]
