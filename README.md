## @magic/transmute

### installation

#### cli:
```bash
npm i -g @magic/transmute

// executable as magic-transmute now
magic-transmute
```

#### javascript api
```bash
npm i --save @magic/transmute
```

### usage

#### cli:

`magic-transmute --help`

#### commands:
* markdown - convert markdown to magic functions
* html     - convert html to magic functions
* file     - convert file to magic functions

#### flags:
* --add-wrapper - add export default[] to the returned string. - alias: ["--addWrapper"]
* --no-pretty   - do not run prettier. - alias: ["--noPretty"]
* --markdown    - force markdown parser to run. - alias: ["--mark", "-m"]
* --output      - output file path - alias: ["--out", "-o"]
* --input       - input file path - alias: ["--in", "-i"]
* --help        - this help text - alias: ["-help", "help", "--h", "-h"]
* --str         - an input string of either html or markdown, depending on running command

##### transpile html string:
`magic-transmute html --str '<a href="https://magic.github.io">magic!</a>'`

##### transpile markdown string:
`magic-transmute markdown --str '[magic!](https://magic.github.io)'',`

##### html file:
`magic-transmute file --input input.html --output output.mjs`

##### markdown file
(.markdown and .md get recognized):

`magic-transmute file --input input.md --output output.mjs`

##### force markdown
(arbitrary file extensions)

`magic-transmute file --input input.txt --output output.mjs --markdown`


#### api examples
```javascript
import transmute from '@magic/transmute'

// html to magic
transmute.html('<a href="https://magic.github.io">magic!</a>')
// returns: `Link({ to: 'https://magic.github.io' }, 'magic!')`

// markdown to magic
transmute.markdown('[magic!](https://magic.github.io)')
// returns: `Link({ to: 'https://magic.github.io' }, 'magic!')`

const magic = transmute.markdown('[magic!](https://magic.github.io)')
console.log(magic)
// logs: `Link({ to: 'https://magic.github.io' }, 'magic!')`

// that's it.
```
