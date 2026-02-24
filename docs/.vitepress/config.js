export default {
  title: 'wjbetech Dashboard',
  description: 'Docs for the wjbetech Dashboard application',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
    ],
    sidebar: {
      '/': [
        '',
        'getting-started',
        'developer',
        'architecture',
        'deployment',
        'api/overview',
        'todo',
        'troubleshooting'
      ]
    }
  }
}
