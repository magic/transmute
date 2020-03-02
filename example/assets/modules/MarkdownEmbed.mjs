export const View = ({ array = [], object, url }) =>
  div([
    h2('markdown @magic-module'),
    p('This is a @magic-module embedded in markdown.'),

    h3('usage'),

    p('You can use any @magic-module in markdown like the following:'),
    Pre(`
<MarkdownEmbed></MarkdownEmbed>
`),
    p('No self closing tags for now.'),

    h3('state'),
    p('The state is available in this module, if declared:'),
        Pre(`
<MarkdownEmbed state></MarkdownEmbed>
`),

    p(['state.url: ', url]),

    h2('Pass an array'),

    p('You can pass arrays to @magic-module in markdown:'),

    Pre(`
<MarkdownEmbed state array="['arr1', 'arr2', 'arr3']"></MarkdownEmbed>
`),

    array.map(item => p(item)),


    h2('Pass an object'),
        p('You can pass objects to @magic-module in markdown:'),

    Pre(`
<MarkdownEmbed state object="{ key1: 'value1', key2: 'value2' }"></MarkdownEmbed>
`),

    Object.entries(object).map(([key, value]) => p([strong(key), ': ', value])),
  ])
