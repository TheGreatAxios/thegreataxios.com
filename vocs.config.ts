import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'thegreataxios blog',
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
      link: "/my-projects",
      text: "My Projects"
    },
    {
      link: "/sponsor",
      text: "Sponsor"
    },
    {
      link: "/blog",
      text: "Blog"
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
