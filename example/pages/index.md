# ${state.title}

<GitBadges project="@magic/transmute"></GitBadges>

${state.description}

### install

@magic/transmute provides both a command line interface as well as a javascript api.

#### #install- cli

```
npm i -g @magic/transmute

// executable as magic-transmute now
magic-transmute
```

#### #install- api

`npm i --save --save-exact @magic/transmute`

### use

after installing either the cli or the api,
both can be used in your projects.

#### use cli

`magic-transmute --help`

#### #use-cli- commands

```
markdown - convert markdown to magic functions
html     - convert html to magic functions
file     - file to magic functions
```

#### #use-cli- flags

```
--add-wrapper - add export default[] to the returned string. - alias: ["--addWrapper"]
--no-pretty   - do not run prettier. - alias: ["--noPretty"]
--markdown    - force markdown parser to run. - alias: ["--mark", "-m"]
--output      - output file path - alias: ["--out", "-o"]
--input       - input file path - alias: ["--in", "-i"]
--help        - this help text - alias: ["-help", "help", "--h", "-h"]
--str         - an input string of either html or markdown, depending on running command
```

##### #use-cli- transpile html string

`magic-transmute html --str "<a href="https://magic.github.io magic!</a>"`

##### #use-cli- transpile markdown string

`magic-transmute markdown --str "[magic!](https://magic.github.io)"`

##### #use-cli- html file

`magic-transmute file --input input.html --output output.mjs`

##### #use-cli- markdown file

(.markdown and .md get recognized)

`magic-transmute file --input input.md --output output.mjs`

##### #use-cli- force markdown

(arbitrary file extensions)

`magic-transmute file --input input.txt --output output.mjs --markdown`

#### use api

the javascript api expects node version to be bigger or equal to 13.5.0
and all @magic code uses native ecmascript modules without transpile step.


##### #use-api- examples

```
import transmute from '@magic/transmute'

// html to magic
transmute.html('<a href="https://magic.github.io">magic!</a>')
// returns: Link({ to: 'https://magic.github.io' }, 'magic!')

// markdown to magic
transmute.markdown("[magic!](https://magic.github.io)")
// returns: Link({ to: 'https://magic.github.io' }, 'magic!')

const magic = transmute.markdown("[magic!](https://magic.github.io)")
console.log(magic)
// logs: Link({ to: 'https://magic.github.io' }, 'magic!')

// that's it.
```

##### escaping

just some special character escaping tests

`\'\' "string" &auml; &laquo; &Ouml;`

```
' "
```
