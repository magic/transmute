import { execFileSync } from 'child_process'
import path from 'path'
import process from 'process'

const bin = path.join(process.cwd(), 'src', 'bin.js')

/** @param {...string} args */
const runBin = (...args) =>
  execFileSync(process.execPath, [bin, ...args], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })

export default [
  {
    fn: () => {
      const out = runBin('html', '--str', '<b>hi</b>', '--noPretty')
      return out.includes("b('hi')")
    },
    expect: true,
    info: 'cli converts an html string and prints the result',
  },
  {
    fn: () => {
      const out = runBin('markdown', '--str', '# hi', '--noPretty')
      return out.includes("h1({ id: 'hi' }, 'hi')")
    },
    expect: true,
    info: 'cli converts a markdown string and prints the result',
  },
  {
    fn: () => {
      const out = runBin('file', '--input', 'test/.data/testing.md', '--noPretty')
      return out.includes('h1') && out.includes('p(')
    },
    expect: true,
    info: 'cli converts a markdown file and prints the result',
  },
  {
    fn: () => {
      const out = runBin('html', '--str', '<p>hi</p>')
      return out.includes("p('hi')")
    },
    expect: true,
    info: 'cli pretty-prints output by default',
  },
]
