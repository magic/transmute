import fs from 'fs'
import path from 'path'

import { handleArgv } from '../../src/bin/index.js'

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

/** @param {string} file */
const readFile = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

export default [
  {
    fn: () => handleArgv(cli({ commands: { html: true }, args: { str: ['<b>hi</b>'] } })),
    expect: ['<b>hi</b>', false],
    info: 'html command with --str returns html input and isMarkdown false',
  },
  {
    fn: () =>
      handleArgv(cli({ commands: { markdown: true }, args: { str: ['hi there'] } })),
    expect: ['hi there', true],
    info: 'markdown command with --str returns markdown input and isMarkdown true',
  },
  {
    fn: () => {
      const out = handleArgv(
        cli({ commands: { file: true }, args: { input: ['test/.data/testing.md'] } }),
      )
      return [out[0] === readFile('test/.data/testing.md'), out[1]]
    },
    expect: [true, true],
    info: 'file command reads a .md file and sets isMarkdown true',
  },
  {
    fn: () => {
      const out = handleArgv(
        cli({ commands: { file: true }, args: { input: ['src/index.js'] } }),
      )
      return [out[0] === readFile('src/index.js'), out[1]]
    },
    expect: [true, false],
    info: 'file command reads a non-markdown extension and sets isMarkdown false',
  },
  {
    fn: () => {
      const origExit = process.exit
      /** @type {boolean[]} */ const results = []
      process.exit = () => {
        results.push(true)
        throw new Error('process.exit called')
      }
      try {
        // no --str and no --input
        try {
          handleArgv(cli())
        } catch {
          /* exit mock throws */
        }
        // file command with missing file
        try {
          handleArgv(
            cli({
              commands: { file: true },
              args: { input: ['/nonexistent/xyz-transmute-test.md'] },
            }),
          )
        } catch {
          /* exit mock throws */
        }
        // html command without --str
        try {
          handleArgv(cli({ commands: { html: true } }))
        } catch {
          /* exit mock throws */
        }
        // file command without --input (but with --str so the first guard passes)
        try {
          handleArgv(cli({ commands: { file: true }, args: { str: ['x'] } }))
        } catch {
          /* exit mock throws */
        }
        // file command without --input
        try {
          handleArgv(cli({ commands: { file: true } }))
        } catch {
          /* exit mock throws */
        }
        // html command with an empty --str
        try {
          handleArgv(cli({ commands: { html: true }, args: { str: [''] } }))
        } catch {
          /* exit mock throws */
        }
      } finally {
        process.exit = origExit
      }
      return results
    },
    expect: [true, true, true, true, true, true],
    info: 'exits when input is missing, file is not found, html has no --str, file has no --input, or --str is empty',
  },
]
