import { defineConfig } from 'vocs'

const basePath = process.env.NODE_ENV === "production" ? "https://thegreataxios.com" : "http://localhost:5173";

export default defineConfig({
  title: 'thegreataxios blog',
  baseUrl: basePath,
  description: "The personal blog of TheGreatAxios",
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
  ogImageUrl: `${basePath}/thegreataxios.jpg`,
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
