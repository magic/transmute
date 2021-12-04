export const h1 = {
  md: '# testing',
  html: '<h1 id="testing">testing</h1>',
  magic: ["h1({ id: 'testing' }, 'testing')"],
}

export const h1Long = {
  md: 'testing\n=========',
  html: '<h1 id="testing">testing</h1>',
  magic: ["h1({ id: 'testing' }, 'testing')"],
}

export const h2 = {
  md: '## testing',
  html: '<h2 id="testing">testing</h2>',
  magic: ["h2({ id: 'testing' }, 'testing')"],
}
export const h3 = {
  md: '### testing',
  html: '<h3 id="testing">testing</h3>',
  magic: ["h3({ id: 'testing' }, 'testing')"],
}
export const h4 = {
  md: '#### testing',
  html: '<h4 id="testing">testing</h4>',
  magic: ["h4({ id: 'testing' }, 'testing')"],
}

export const h5 = {
  md: '##### testing 5',
  html: '<h5 id="testing-5">testing 5</h5>',
  magic: ["h5({ id: 'testing-5' }, 'testing 5')"],
}

export const link = {
  md: '[a link](http://example.com)',
  html: '<a href="http://example.com" text="a link"></a>',
  magic: ["Link({ to: 'http://example.com', text: 'a link' })"],
}

export const code = {
  md: '<pre><code class="language-bash">code block</pre></code>',
  html: '<pre><code class="language-bash">code block</pre></code>',
  magic: ["pre(code({ class: 'language-bash' }, 'code block'))"],
}

export const codeNoLang = {
  md: '```\ncode block\n```',
  html: '<Pre>code block</Pre>',
  magic: ["Pre('code block')"],
}

export const codespan = {
  md: '`code block`',
  magic: ["Pre({ lines: 'false' }, 'code block')"],
  html: '<Pre lines="false">code block</Pre>'
}

export const p = {
  md: 'paragraph',
  html: '<p>paragraph</p>',
  magic: ["p('paragraph')"],
}

export const sentence = {
  md: "It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link!](http://example.com)",
  html: "<p>It's very easy to make some words <strong>bold</strong> and other words <em>italic</em> with Markdown. You can even <a href=\"http://example.com\" text=\"link!\"></a>",
  magic: [`p(["It's very easy to make some words ",b('bold'),' and other words ',em('italic'),' with Markdown. You can even ',Link({ to: 'http://example.com', text: 'link!' })])`],
}

export const strong = {
  md: '**bold**',
  html: '<p><b>bold</b></p>',
  magic: ["p(b('bold'))"],
}

export const italic = {
  md: '*italic*',
  html: '<p><em>italic</em></p>',
  magic: ["p(em('italic'))"],
}

export const ul = {
  md: '* listitem 1\n* listitem 2\n  * listitem 2 subitem 1\n  * listitem 2 subitem 2',
  html: '<ul><li>listitem 1</li><li>listitem 2<ul><li>listitem 2 subitem 1</li><li>listitem 2 subitem 2</li></ul></ul>',
  magic: [`ul([li('listitem 1'),li(['listitem 2',ul([li('listitem 2 subitem 1'),li('listitem 2 subitem 2')])])])`],
}

export const ulSingle = {
  md: '* test',
  html: '<ul><li>test</li></ul>',
  magic: [`ul(li('test'))`],
}

export const img = {
  md: '![Alt text](/path/to/img.jpg)',
  magic: ["Img({ src: '/path/to/img.jpg', alt: 'Alt text' }, [])"],
}

export const html = {
  md: '<a href="/testing">text</a>',
  html: '<a href="/testing">text</a>',
  magic: [`Link({ to: '/testing' }, 'text')`],
}

export const htmlModule = {
  md: '<ModuleName arg="testing">children</ModuleName>',
  html: '<ModuleName arg="testing">children</ModuleName>',
  magic: [`ModuleName({ arg: 'testing' }, 'children')`],
}

export const unescapeTest = {
  md: '<div>&lt; &#39; &#8968;</div>',
  html: '<div>&lt; &#39; &#8968;</div>',
  magic: [`div("< ' ⌈")`],
}

export const simpleSvg = {
  input: '<svg><g></g></svg>',
  expect: ['svg(g())'],
}

export const fillStrokeTestSvg = {
  input: '<svg><g fill-stroke="green"></g></svg>',
  expect: ["svg(g({ fillStroke: 'green' }))"],
}

export const complexSvg = {
  input: `
<svg
viewBox="0 0 16 16" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1"
><g><path d="M32 0 32" /></g>
`,
  expect: [`
svg({ viewBox: '0 0 16 16', fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '1' }, g(path({ d: 'M32 0 32' })))
`.trim()]
}
