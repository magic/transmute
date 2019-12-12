import { escape } from '../../src/lib/index.mjs'

export default [
  { fn: escape('test'), expect: 'test', info: 'simple string is unchanged' },
  { fn: escape("test'test"), expect: "test\\'test", info: "' get escaped correctly" },
  { fn: escape('test"test'), expect: 'test\\"test', info: '" get escaped correctly' },
  { fn: escape('test`test'), expect: 'test\\`test', info: '` get escaped correctly' },
]
