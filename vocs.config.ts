import { defineConfig } from 'vocs'
import { createElement } from 'react'

const basePath = process.env.PUBLIC_BASE_URL || (process.env.NODE_ENV === "production" ? "https://thegreataxios.com" : "http://localhost:5173");

export default defineConfig({
  title: 'thegreataxios blog',
  baseUrl: basePath,
  description: "The personal blog of TheGreatAxios",
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
      link: "https://x.com/thegreataxios",
      text: "Follow me on X"
    }
  ]
})
