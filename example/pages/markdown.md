---
@state
{
  "title": "markdown file example",
  "description": "markdown file description"
}
---

## ${state.title}

${state.description}

see [this file in the example dir](https://github.com/magic/core/blob/master/example/pages/modules/markdown.md) for an example.

any kind of markdown can be used here,
but if you use html natively,
only tags valid in a html5 body, excluding &lt;script&gt; and &lt;style&gt; tags, are accepted.

this markdown file also starts with a magic @state declaration.
it is used internally to, for example, add the title and meta rel="description" tags to the head of this html file.

* [@magic/core](https://magic.github.io)
* [@magic-libraries](https://magic-libraries.github.io)
* [@magic-modules](https://magic-modules.github.io)
* [@magic-themes](https://magic-themes.github.io)

<a href="/testing">yay</a>

<Link to="/testing" text="Whatcha gonna do?"></Link>

<MarkdownEmbed state></MarkdownEmbed>

the state looks like the following:

<Pre>
\-\-\-
@state
{
  "title": "markdown file example",
  "description": "markdown file description"
}
\-\-\-
</Pre>
