export const View = state => [
  h2('markdown @magic-module'),
  p('This is a @magic-module embedded in markdown.'),
  p(['state.url: ', state.url]),
  p('You can use any @magic-module in markdown like the following:'),
  Pre(`
<MarkdownEmbed state></MarkdownEmbed>
`),
  p('No self closing tags for now.'),
  p('-------------------------------------'),
]
