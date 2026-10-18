import { defineConfig, type DefaultTheme } from 'vitepress'
import { project } from './project'

// Base path: "/" on Netlify and custom domains, "/<repo>/" on GitHub Pages
// project sites. The GitHub Actions workflow sets DOCS_BASE automatically.
function resolveBase(): string {
  const raw = (process.env.DOCS_BASE || '/').trim()
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}
const base = resolveBase()

const sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Introduction',
    items: [
      { text: 'What is RunContainer?', link: '/guide/introduction' },
      { text: 'Concepts & terminology', link: '/guide/concepts' },
      { text: 'How it differs', link: '/guide/how-it-differs' }
    ]
  },
  {
    text: 'Getting started',
    items: [
      { text: 'Prerequisites', link: '/getting-started/prerequisites' },
      { text: 'Installation', link: '/getting-started/installation' },
      { text: 'First launch', link: '/getting-started/first-launch' },
      { text: 'Walkthrough', link: '/getting-started/walkthrough' }
    ]
  },
  {
    text: 'User guide',
    items: [
      { text: 'Managing environments', link: '/user-guide/environments' },
      { text: 'Installing applications', link: '/user-guide/applications' },
      { text: 'Running & stopping', link: '/user-guide/running' },
      { text: 'Settings & profiles', link: '/user-guide/settings' },
      { text: 'Reset & remove', link: '/user-guide/reset-remove' },
      { text: 'Statuses & errors', link: '/user-guide/statuses' }
    ]
  },
  {
    text: 'Troubleshooting',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/troubleshooting/' },
      { text: 'Setup problems', link: '/troubleshooting/setup' },
      { text: 'Unsupported applications', link: '/troubleshooting/unsupported-apps' },
      { text: 'Environment startup', link: '/troubleshooting/environment-startup' },
      { text: 'Install & launch errors', link: '/troubleshooting/install-launch' },
      { text: 'Recovery & cleanup', link: '/troubleshooting/recovery' }
    ]
  },
  {
    text: 'Safety & privacy',
    items: [
      { text: 'What isolation is for', link: '/safety/isolation' },
      { text: 'Isolation is not a guarantee', link: '/safety/not-a-guarantee' },
      { text: 'Testing unfamiliar software', link: '/safety/responsible-testing' },
      { text: 'Privacy & credentials', link: '/safety/privacy' }
    ]
  },
  {
    text: 'Reference',
    items: [
      { text: 'FAQ', link: '/reference/faq' },
      { text: 'Glossary', link: '/reference/glossary' },
      { text: 'Known limitations', link: '/reference/limitations' },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Contributing', link: '/reference/contributing' },
      { text: 'Reporting security issues', link: '/reference/security' },
      { text: 'Support', link: '/support' }
    ]
  }
]

const socialLinks: DefaultTheme.SocialLink[] = project.repoUrl
  ? [{ icon: 'github', link: project.repoUrl, ariaLabel: 'Source repository' }]
  : []

export default defineConfig({
  base,
  lang: 'en-GB',
  title: project.name,
  description:
    'RunContainer is a Windows application management and isolation tool for installing and running Windows applications inside managed environments.',
  cleanUrls: true,
  lastUpdated: false,
  appearance: 'dark',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#0e1116' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'RunContainer' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Install and run Windows applications inside environments managed by RunContainer.'
      }
    ]
  ],

  themeConfig: {
    logo: { src: '/logo.svg', alt: '' },
    siteTitle: project.name,

    nav: [
      { text: 'Docs', link: '/guide/introduction', activeMatch: '^/(guide|getting-started|user-guide|troubleshooting|safety|reference)/' },
      { text: 'Downloads', link: '/downloads' },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Community', link: '/community' },
      { text: 'Support', link: '/support' }
    ],

    sidebar: {
      '/guide/': sidebar,
      '/getting-started/': sidebar,
      '/user-guide/': sidebar,
      '/troubleshooting/': sidebar,
      '/safety/': sidebar,
      '/reference/': sidebar
    },

    socialLinks,

    search: { provider: 'local' },

    outline: { level: [2, 3], label: 'On this page' },

    // The documentation source isn't in the application repository, so no per-page edit link is shown.
    editLink: undefined,

    docFooter: { prev: 'Previous', next: 'Next' },

    footer: {
      message:
        'RunContainer is pre-release software. Isolation reduces risk but is not a guarantee of safety.',
      copyright: `© ${new Date().getFullYear()} The RunContainer project`
    },

    externalLinkIcon: true,
    returnToTopLabel: 'Back to top',
    sidebarMenuLabel: 'Documentation',
    darkModeSwitchLabel: 'Theme',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme'
  }
})
