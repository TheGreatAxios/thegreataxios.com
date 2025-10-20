import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'thegreataxios blog',
  theme: {
    variables: {
      color: {
        background: '#0a0a0a',
        background2: '#111111',
        background3: '#1a1a1a',
        border: '#333333',
        text: '#ffffff',
        text2: '#cccccc',
        text3: '#999999',
        accent: '#00ff88'
      }
    }
  },
  blog: {
    authors: {
      map: (author: string) => {
        // Parse markdown links like "[name](url)" and return just the name
        const match = author.match(/\[([^\]]+)\]\([^)]+\)/)
        return match ? match[1] : author
      }
    }
  }
})
