import fs from 'fs'
import path from 'path'

import log from '@magic/log'

export const handleArgv = ({ cmds, argv }) => {
  if (!args.input && !args.str) {
    log.error('Input required', 'specify either --str or --input')
    process.exit()
  }

  let html = ''
  let isMarkdown = false

  if (cmds.file) {
    if (!args.input) {
      log.error('--input file required.')
      process.exit()
    }

    const file = args.input[0]
    if (!fs.existsSync(file)) {
      log.error('File not found', file)
      process.exit()
    }

    html = fs.readFileSync(file, 'utf8')

    const ext = path.extname(file)
    const markdownExtensions = ['.markdown', '.md']
    if (markdownExtensions.includes(ext)) {
      isMarkdown = true
    }
  } else if (cmds.html || cmds.markdown) {
    if (cmds.markdown) {
      isMarkdown = true
    }

    if (args.str) {
      html = args.str.join(' ').trim()
    }
  }

  if (!html) {
    log.error('No --str or --input passed.', argv)
    process.exit()
  }

  return [html, isMarkdown]
}
