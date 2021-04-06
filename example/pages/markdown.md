---
@state
{
  "title": "markdown file example",
  "description": "markdown file description"
}
---

## ${state.title}

{{state.description}}

see [this file in the example dir](https://github.com/magic/core/blob/master/example/pages/modules/markdown.md) for an example.

any kind of markdown can be used here,
but if you use html natively,
only tags valid in a html5 body, excluding script and style tags, are accepted.

this markdown file also starts with a magic @state declaration.
it is used internally to, for example, add the title and meta rel="description" tags to the head of this html file.

* [@magic/core](https://magic.github.io)
* [@magic-libraries](https://magic-libraries.github.io)
* [@magic-modules](https://magic-modules.github.io)
* [@magic-themes](https://magic-themes.github.io)

<a href="https://jaeh.at">yay</a>

<Link to="/" text="Whatcha gonna do?"></Link>

renders

<MarkdownEmbed state array="['arr1', 'arr2', 'arr3']" object="{ key1: 'value1', key2: 'value2' }"></MarkdownEmbed>

