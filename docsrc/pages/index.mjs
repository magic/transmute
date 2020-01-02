export const View = state => [
  h1({ id: 'magictransmute' }, `@magic/transmute`),
  div([
    GitBadges('magic/transmute'),

    h3({ id: 'installation' }, 'installation'),

    h4({ id: 'installation-cli' }, 'cli:'),
    Pre(`
npm i -g @magic/transmute

// executable as magic-transmute now
magic-transmute
`),

    h4({ id: 'installation-api' }, 'javascript api'),
    Pre('npm i --save @magic/transmute'),

    h3({ id: 'usage' }, 'usage'),

    h4({ id: 'usage-cli' }, 'cli:'),
    Pre('magic-transmute --help'),

    h4({ id: 'usage-cli-commands' }, 'commands:'),
    Pre(`
markdown - convert markdown to magic functions
html     - convert html to magic functions
file     - file to magic functions
`),

    h4({ id: 'usage-cli-flags' }, 'flags:'),
    Pre(`
--add-wrapper - add export default[] to the returned string. - alias: ["--addWrapper"]
--no-pretty   - do not run prettier. - alias: ["--noPretty"]
--markdown    - force markdown parser to run. - alias: ["--mark", "-m"]
--output      - output file path - alias: ["--out", "-o"]
--input       - input file path - alias: ["--in", "-i"]
--help        - this help text - alias: ["-help", "help", "--h", "-h"]
--str         - an input string of either html or markdown, depending on running command
  `),

    h5({ id: 'usage-cli-transpile-html-string' }, 'transpile html string:'),
    Pre(`magic-transmute html --str '<a href="https://magic.github.io">magic!</a>'`),

    h5({ id: 'usage-cli-transpile-markdown-string' }, 'transpile markdown string:'),
    Pre("magic-transmute markdown --str '[magic!](https://magic.github.io)'"),

    h5({ id: 'usage-cli-html-file' }, 'html file:'),
    Pre('magic-transmute file --input input.html --output output.mjs'),

    h5({ id: 'usage-cli-markdown-file' }, 'markdown file'),
    p('(.markdown and .md get recognized):'),
    Pre('magic-transmute file --input input.md --output output.mjs'),

    h5({ id: 'usage-cli-force-markdown' }, 'force markdown'),
    p('(arbitrary file extensions)'),
    Pre('magic-transmute file --input input.txt --output output.mjs --markdown'),

    h4({ id: 'usage-api' }, 'api examples'),
    Pre(`
import transmute from '@magic/transmute'

// html to magic
transmute.html('<a href="https://magic.github.io">magic!</a>')
// returns: Link({ to: 'https://magic.github.io' }, 'magic!')

// markdown to magic
transmute.markdown('[magic!](https://magic.github.io)')
// returns: Link({ to: 'https://magic.github.io' }, 'magic!')

const magic = transmute.markdown('[magic!](https://magic.github.io)')
console.log(magic)
// logs: Link({ to: 'https://magic.github.io' }, 'magic!')

// that's it.
`),
  ]),
]
