import { defineConfig } from 'vocs/config'

export default defineConfig({
  title: 'Sawyer Cutler',
  titleTemplate: 'Sawyer Cutler | %s',
  baseUrl: "/",
  renderStrategy: 'full-static',
  colorScheme: 'light',
  description: "Sawyer Cutler — Lead Product Engineer at Corbits. Writing about applied AI, agent infrastructure, and developer tools.",
  head: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap' },
    ],
  },
  iconUrl: `/thegreataxios.jpg`,
  ogImageUrl: `/api/og?logo=%logo&title=%title&description=%description`,
  topNav: []
})
