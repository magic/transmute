
import { cli } from '@magic/cli/src/index.mjs'

import { handleArgv } from './handleArgv.mjs'
import { runCli } from './runCli.mjs'

const args = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    '--str',
    ['--input', '--in', '-i'],
    ['--output', '--out', '-o'],
    ['--addWrapper', '--add-wrapper'],
    ['--addView', '--add-view'],
    ['--noPretty', '--no-pretty'],
  ],
  commands: [
    'markdown',
    'html',
    'file',
  ],
  help: {
    name: '@magic/transmute',
    header: 'generates magic functions from html and markdown',
    commands: {
      html: 'convert html to magic functions',
      markdown: 'convert markdown to magic functions',
      file: 'convert file to magic functions',
    },
    flags: {
      output: 'output file to write to',
      addWrapper: 'add export default[] or export default state => [] to the returned string.',
      noPretty: 'do not run prettier.',
    },
    example: `
transpile html string:
magic-transmute html --str '<a href="https://example.com">a link</a>'

transpile markdown string:
magic-transmute markdown --str '[a link](https://example.com)'',

transpile file:
magic-transmute file --input input.html --output output.mjs
`,
  },
}

const res = cli(args)

const [html, isMarkdown] = handleArgv(res)

runCli(html, isMarkdown, res)
