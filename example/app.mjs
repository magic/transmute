export const state = config => ({
  seo: {
    name: '@magic/transmute documentation',
    url: `https://${config.URL}`,
    image: `${config.WEB_ROOT}logo.png`,
    author: {
      '@type': 'person',
      name: 'Jascha Ehrenreich',
      jobTitle: 'Technomancer',
      image: 'https:/jaeh.at/img/jascha.ehrenreich.jpg',
    },
  },

  title: '@magic/transmute',
  description: 'transform markdown and html to @magic-modules',

  menu: [
    {
      to: '/#install',
      text: 'installation',
      items: [
        { to: '-cli', text: 'install cli' },
        { to: '-api', text: 'install api' },
      ],
    },
    {
      to: '/#use-cli',
      text: 'use cli',
      items: [
        { to: '-commands', text: 'cli commands' },
        { to: '-flags', text: 'cli flags' },
        { to: '-transpile-html-string', text: 'transmute html' },
        { to: '-transpile-markdown-string', text: 'transmute markdown' },
        { to: '-html-file', text: 'html file' },
        { to: '-markdown-file', text: 'markdown file' },
        { to: '-force-markdown', text: 'force markdown' },
      ],
    },
    {
      to: '/#use-api',
      text: 'use api',
      items: [{ to: '-examples', text: 'examples' }],
    },
    { to: '/markdown/', text: 'markdown' },
    { to: '/html/', text: 'html' },
  ],
  logo: '/logo.png',
  logotext: '@magic',
})
