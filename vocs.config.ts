import { defineConfig } from 'vocs'
import { createElement } from 'react'

export default defineConfig({
  title: 'Sawyer Cutler',
  titleTemplate: 'Sawyer Cutler | %s',
  baseUrl: "/",
  description: "Sawyer Cutler — Lead Product Engineer at Corbits. Writing about applied AI, AI agents, and developer tools.",
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
