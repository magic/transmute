import path from 'path'
import fs from 'fs'

import prettier from 'prettier'

import log from '@magic/log'
import is from '@magic/types'

import transmute from '../index.js'

// prettier's format returns a promise, so the pretty path is async.
/**
 * @param {string} source
 * @returns {Promise<string>}
 */
const formatCode = source =>
  prettier.format(source, {
    semi: false,
    parser: 'babel',
    singleQuote: true,
    trailingComma: 'es5',
  })

/**
 * @param {string} html
 * @param {boolean} isMarkdown
 * @param {import('@magic/cli').ParsedCLI} res
 */
export const runCli = async (html, isMarkdown, res) => {
  const out = isMarkdown ? transmute.markdown(html) : transmute.html(html)

  let rendered = out.rendered

  if (is.array(rendered)) {
    if (rendered.length === 1) {
      rendered = rendered[0]
    } else {
      rendered = `[${rendered.join(',')}]`
    }
  }

  /** @type {string} */
  let outString = rendered

  if (res.args.addWrapper) {
    outString = `export default [\n${outString},\n]`
  }

  if (!res.args.noPretty) {
    outString = await formatCode(outString)
  }

  if (res.args.output) {
    const outputFile = res.args.output.join('')
    const dir = path.dirname(outputFile)
    if (!fs.existsSync(dir)) {
      log.info('output dir does not exist, creating it.', dir)
      fs.mkdirSync(dir, { recursive: true })
    }

    log.info('writing to:', { outputFile })
    fs.writeFileSync(outputFile, outString)
  } else {
    log(outString)
  }
}
