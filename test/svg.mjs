import { html } from '../src/index.mjs'

const svg = `
<svg
viewBox="0 0 16 16" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1"
><g><path d="M32 0 32" /></g>
`

const svgExpect = `
svg({ viewBox: '0 0 16 16', fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '1' }, g(path({ d: 'M32 0 32' })))
`.trim()

export default [
  { fn: html('<svg><g></g></svg>').rendered, expect: 'svg(g())' },
  {
    fn: html('<svg><g fill-stroke="green"></g></svg>').rendered,
    expect: "svg(g({ fillStroke: 'green' }))",
  },
  { fn: html(svg).rendered, expect: svgExpect, info: 'can handle svg properties' },
]
