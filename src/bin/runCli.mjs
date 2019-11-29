import path from 'path'
import fs from 'fs'

import prettier from 'prettier'

import log from '@magic/log'

import { convertMarkdown, convertHtml } from '../index.mjs'

export const runCli = (html, isMarkdown, res) => {
  let out
  if (isMarkdown) {
    out = convertMarkdown(html)
  } else {
    out = convertHtml(html)
  }

  if (res.argv['--addWrapper']) {
    out = `export default [\n${out},\n]`
  }

  if (!res.argv['--noPretty']) {
    out = prettier.format(out, {
      semi: false,
      parser: 'babel',
      singleQuote: true,
      trailingComma: 'es5',
    })
  }

  if (res.argv['--output']) {
    const outputFile = res.argv['--output'].join('')
    const dir = path.dirname(outputFile)
    console.log('write to output file', outputFile, dir)
    if (!fs.existsSync(dir)) {
      log.info('output dir does not exist, creating it.', dir)
      mkdirp(dir)
    }

    log.info('writing:', outputFile);
    fs.writeFileSync(outputFile, out)
  } else {
    console.log(out)
  }
}
