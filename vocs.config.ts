import { defineConfig } from 'vocs'
import { createElement } from 'react'

export default defineConfig({
  title: 'thegreataxios',
  baseUrl: "/",
  description: "Sawyer Cutler — VP Developer Success at SKALE. Writing about AI agents, blockchain infrastructure, and the machine economy.",
  font: {
    google: "JetBrains Mono"
  },
  theme: {
    colorScheme: "light",
    variables: {
      fontFamily: {
        default: "JetBrains Mono, monospace",
        mono: "JetBrains Mono, monospace"
      }
    }
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
  ogImageUrl: `/api/og?logo=%logo&title=%title&description=%description`,
  topNav: []
})
