import marked from 'marked'

// this customized lexer will detect @magic-modules in markdown files.
export class LexLex extends marked.Lexer {
  constructor(options) {
    super(options)
  }

  lex(src) {
    src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ')

    return this.token(src, true)
  }

  token(src, top = true) {
    this.tokens = super.token(src, top)

    return this.tokens
  }
}
