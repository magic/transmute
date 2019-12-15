## @magic/transmute
transmutes html and markdown to @magic view fragments

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]


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
`magic-transmute markdown --str '[magic!](https://magic.github.io)'`

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

#### changelog

##### 0.0.1
first release

##### 0.0.2
update dependencies

##### 0.0.3
fix cli

##### 0.0.4
update @magic dependencies to use npm packages instead of github

##### 0.0.5
extract state from html and markdown files
allow usage of state variables in markdown and html

##### 0.0.6 - unreleased
...


[npm-image]: https://img.shields.io/npm/v/@magic/transmute.svg
[npm-url]: https://www.npmjs.com/package/@magic/transmute
[travis-image]: https://img.shields.io/travis/com/magic/transmute/master
[travis-url]: https://travis-ci.com/magic/transmute
[appveyor-image]: https://img.shields.io/appveyor/ci/magic/transmute/master.svg
[appveyor-url]: https://ci.appveyor.com/project/magic/transmute/branch/master
[coveralls-image]: https://coveralls.io/repos/github/magic/transmute/badge.svg
[coveralls-url]: https://coveralls.io/github/magic/transmute
[greenkeeper-image]: https://badges.greenkeeper.io/magic/transmute.svg
[greenkeeper-url]: https://badges.greenkeeper.io/magic/transmute.svg
[snyk-image]: https://snyk.io/test/github/magic/transmute/badge.svg
[snyk-url]: https://snyk.io/test/github/magic/transmute

