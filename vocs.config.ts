import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'thegreataxios blog',
  baseUrl: "https://thegreataxios.com",
  description: "The personal blog of TheGreatAxios",
  iconUrl: {
    light: '/thegreataxios.png',
    dark: '/thegreataxios.png',
  },
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
  topNav: [
    {
      link: "/",
      text: "Blog",
      match: ""
    },
    {
      link: "/my-projects",
      text: "My Projects",
      match: "/my-projects"
    },
    {
      link: "/sponsor",
      text: "Sponsor",
      match: "/sponsor"
    },
    {
      link: "https://buymeacoffee.com/thegreataxios",
      text: "Buy me a coffee"
    },
    {
      link: "https://x.com/thegreataxios",
      text: "Follow me on X"
    }
  ]
})
