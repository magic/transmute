import { stringDecode } from '../../src/lib/index.js'

export default [
  { fn: () => stringDecode('hello'), expect: 'hello', info: 'plain text unchanged' },
  {
    fn: () => stringDecode('&lt; &#39; &#8968;'),
    expect: "< ' ⌈",
    info: 'decodes html entities',
  },
  {
    fn: () => stringDecode('<div>&lt; &#39; &#8968;</div>'),
    expect: '<div>< \' ⌈</div>',
    info: 'decodes entities within html',
  },
]
