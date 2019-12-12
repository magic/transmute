import marked from 'marked'

export class LexLex extends marked.Lexer {
  constructor() {
    super()
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
