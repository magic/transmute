import fs from 'fs'
import os from 'os'
import path from 'path'

import { runCli } from '../../src/bin/index.js'

const uniqueFile = () =>
  path.join(os.tmpdir(), `transmute-test-${Date.now()}-${Math.random().toString(36).slice(2)}.js`)

/**
 * @param {Partial<import('@magic/cli').ParsedCLI>} [overrides]
 * @returns {import('@magic/cli').ParsedCLI}
 */
const cli = overrides => ({
  env: {},
  argv: {},
  args: {},
  commands: {},
  errors: [],
  ...overrides,
})

/**
 * @param {string} input
 * @param {boolean} isMarkdown
 * @param {Record<string, unknown>} args
 * @returns {Promise<string>}
 */
const runToFile = async (input, isMarkdown, args) => {
  const file = uniqueFile()
  try {
    await runCli(input, isMarkdown, cli({ args: { ...args, output: [file] } }))
    return fs.readFileSync(file, 'utf8')
  } finally {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
    }
  }
}

export default [
  {
    fn: async () => runToFile('<p>hello</p>', false, { noPretty: true }),
    expect: "p('hello')",
    info: 'writes unformatted html output to the output file',
  },
  {
    fn: async () => runToFile('# hi', true, { noPretty: true }),
    expect: "h1({ id: 'hi' }, 'hi')",
    info: 'writes unformatted markdown output to the output file',
  },
  {
    fn: async () => runToFile('<p>hello</p>', false, {}),
    expect: "p('hello')\n",
    info: 'pretty-prints output through prettier by default',
  },
  {
    fn: async () => runToFile('<p>a</p><p>b</p>', false, { noPretty: true }),
    expect: "[p('a'),p('b')]",
    info: 'joins multiple top-level elements into an array',
  },
  {
    fn: async () => runToFile('<p>a</p><p>b</p>', false, {}),
    expect: ";[p('a'), p('b')]\n",
    info: 'pretty-prints multiple top-level elements into an array',
  },
  {
    fn: async () => runToFile('<p>hello</p>', false, { noPretty: true, addWrapper: true }),
    expect: 'export default [\np(\'hello\'),\n]',
    info: 'wraps output in an export default array when addWrapper is set',
  },
  {
    fn: async () => {
      const dir = path.join(
        os.tmpdir(),
        `transmute-test-dir-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      )
      const file = path.join(dir, 'nested', 'out.js')
      try {
        await runCli('<p>hello</p>', false, cli({ args: { noPretty: true, output: [file] } }))
        return fs.readFileSync(file, 'utf8')
      } finally {
        if (fs.existsSync(dir)) {
          fs.rmSync(dir, { recursive: true })
        }
      }
    },
    expect: "p('hello')",
    info: 'creates a missing output directory before writing',
  },
  {
    fn: () => {
      /** @type {string[]} */ const logs = []
      const origLog = console.log
      console.log = (...a) => {
        logs.push(a.join(' '))
      }
      try {
        runCli('<p>hello</p>', false, cli({ args: { noPretty: true } }))
      } finally {
        console.log = origLog
      }
      return logs.some(l => l === "p('hello')")
    },
    expect: true,
    info: 'logs the rendered string to the console when no output file is given',
  },
]
