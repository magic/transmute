import path from 'path'
import fs from 'fs'

import prettier from 'prettier'

import log from '@magic/log'

import transmute from '../index.mjs'

export const runCli = (html, isMarkdown, res) => {
  let out
  if (isMarkdown) {
    out = transmute.markdown(html)
  } else {
    out = transmute.html(html)
  }

  if (res.args.addWrapper) {
    out.rendered = `export default [\n${out.rendered},\n]`
  }

  if (!res.args.noPretty) {
    out.rendered = prettier.format(out.rendered, {
      semi: false,
      parser: 'babel',
      singleQuote: true,
      trailingComma: 'es5',
    })
  }

  if (res.args.output) {
    const outputFile = res.args.output.join('')
    const dir = path.dirname(outputFile)
    if (!fs.existsSync(dir)) {
      log.info('output dir does not exist, creating it.', dir)
      mkdirp(dir)
    }

    log.info('writing to:', { outputFile })
    fs.writeFileSync(outputFile, out.rendered)
  } else {
    console.log(out.rendered)
  }
}
