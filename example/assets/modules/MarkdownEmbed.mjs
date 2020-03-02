export const View = ({ array, object, url }) =>
  div([
    h2('markdown @magic-module'),
    p('This is a @magic-module embedded in markdown.'),
    p(['state.url: ', url]),
    p('You can use any @magic-module in markdown like the following:'),
    Pre(`
<MarkdownEmbed state></MarkdownEmbed>
`),
    p('No self closing tags for now.'),
    p('-------------------------------------'),
  ])
