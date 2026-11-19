import { escape, escapeHtml } from '../../src/lib/index.js'

export default [
  { fn: escape('test'), expect: 'test', info: 'simple string is unchanged' },
  { fn: escape("test'test"), expect: "test\\'test", info: "' get escaped correctly" },
  { fn: escape('test"test'), expect: 'test\\"test', info: '" get escaped correctly' },
  { fn: escape('test`test'), expect: 'test\\`test', info: '` get escaped correctly' },
  {
    fn: escapeHtml('a < b > c & d'),
    expect: 'a &lt; b &gt; c &amp; d',
    info: 'escapes html special characters',
  },
  {
    fn: escapeHtml('&amp;'),
    expect: '&amp;amp;',
    info: 'ampersands are escaped first',
  },
  { fn: escapeHtml('test'), expect: 'test', info: 'simple string is unchanged' },
]
