---
@state {
  "title": "@magic/transmute",
  "description": "transform markdown and html to @magic-modules"
}
---

# ${state.title}

<GitBadges>magic/transmute</GitBadges>

${state.description}

<h3 id="installation">installation</h3>

<h4 id="installation-cli">cli</h4>

<Pre>
npm i -g @magic/transmute

// executable as magic-transmute now
magic-transmute
</Pre>

<h4 id="installation-api">javascript api</h4>

<Pre>npm i --save @magic/transmute</Pre>

<h3 id="usage">usage</h3>

<h4 id="usage-cli">cli</h4>

<Pre>magic-transmute --help</Pre>

<h4 id="usage-cli-commands">commands</h4>

<Pre>
markdown - convert markdown to magic functions
html     - convert html to magic functions
file     - file to magic functions
</Pre>

<h4 id="usage-cli-flags">flags:</h4>

<Pre>
--add-wrapper - add export default[] to the returned string. - alias: ["--addWrapper"]
--no-pretty   - do not run prettier. - alias: ["--noPretty"]
--markdown    - force markdown parser to run. - alias: ["--mark", "-m"]
--output      - output file path - alias: ["--out", "-o"]
--input       - input file path - alias: ["--in", "-i"]
--help        - this help text - alias: ["-help", "help", "--h", "-h"]
--str         - an input string of either html or markdown, depending on running command
</Pre>

<h5 id="usage-cli-transpile-html-string">transpile html string</h5>

<Pre>magic-transmute html --str "<a href="https://magic.github.io">magic!</a>"</Pre>

<h5 id="usage-cli-transpile-markdown-string">transpile markdown string:</h5>

<Pre>magic-transmute markdown --str "[magic!](https://magic.github.io)"</Pre>

<h5 id="usage-cli-html-file">html file</h5>

<Pre>magic-transmute file --input input.html --output output.mjs</Pre>

<h5 id="usage-cli-markdown-file">markdown file</h5>

(.markdown and .md get recognized)

<Pre>magic-transmute file --input input.md --output output.mjs</Pre>

<h5 id="usage-cli-force-markdown">force markdown</h5>

(arbitrary file extensions)

<Pre>magic-transmute file --input input.txt --output output.mjs --markdown</Pre>

<h4 id="usage-api">api examples</h4>

<Pre>
import transmute from "@magic/transmute"

// html to magic
transmute.html("<a href="https://magic.github.io">magic!</a>")
// returns: Link({ to: "https://magic.github.io">magic!")

// markdown to magic
transmute.markdown("[magic!](https://magic.github.io)")
// returns: Link({ to: "https://magic.github.io">magic!")

const magic = transmute.markdown("[magic!](https://magic.github.io)")
console.log(magic)
// logs: Link({ to: "https://magic.github.io">magic!")

// that's it.
</Pre>
