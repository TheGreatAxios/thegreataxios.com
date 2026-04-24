import { defineConfig } from 'vocs'
import { createElement } from 'react'

export default defineConfig({
  title: 'Sawyer Cutler',
  baseUrl: "/",
  description: "Sawyer Cutler — VP Developer Success at SKALE. Writing about AI agents, blockchain infrastructure, and the machine economy.",
  aiCta: {
    query({ location }) {
      return `Read and analyze this page: ${location} — I want to ask questions about it.`
    }
  },
  theme: {
    colorScheme: "light"
  },
  head: createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
        (function () {
          try {
            localStorage.setItem("vocs.theme", "light");
          } catch (e) {}
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
        })();
      `,
    },
  }),
  iconUrl: `/thegreataxios.jpg`,
  socials: [
    {
      icon: "github",
      link: "https://github.com/thegreataxios"
    },
    {
      icon: "x",
      link: "https://twitter.com/thegreataxios"
    }
  ],
  ogImageUrl: `/api/og?logo=%logo&title=%title&description=%description`,
  topNav: [
    {
      link: "/",
      text: "Home",
      match: ""
    },
    {
      link: "/my-projects",
      text: "Projects",
      match: "/my-projects"
    }
  ]
})
