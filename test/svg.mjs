import { html } from '../src/index.mjs'

import { simpleSvg, fillStrokeTestSvg, complexSvg } from './.data/inputs.mjs'

export default [
  { fn: html(simpleSvg.input).rendered, expect: simpleSvg.expect, info: 'simple svg works' },
  {
    fn: html(fillStrokeTestSvg.input).rendered,
    expect: fillStrokeTestSvg.expect,
  },
  {
    fn: html(complexSvg.input).rendered,
    expect: complexSvg.expect,
    info: 'can handle svg properties',
  },
]
