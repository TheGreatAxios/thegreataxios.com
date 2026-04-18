# AGENTS.md

## Project Overview

Vocs-based static documentation site/blog for thegreataxios.com. Built with React 19, TypeScript, and Bun.

## Commands

### Development
- `bun run dev` - Start development server
- `bun run preview` - Preview production build locally

### Build
- `bun run build` - Full build (markdown export + site build)
- `bun run build:md` - Export MDX files to public markdown
- `bun run build:site` - Build Vocs static site

### Environment
- Node.js v24.4.1 required (see `.nvmrc`)
- Package manager: Bun (never use npm/yarn/pnpm)

## Code Style Guidelines

### TypeScript
- Strict mode enabled - all strict compiler options apply
- Target: ES2020, Module: ESNext
- Use `interface` for object types (see `ProjectCard.tsx`)
- No `any` types - use `unknown` if needed
- Enable `noUnusedLocals` and `noUnusedParameters` - clean imports only

### JavaScript/Modules
- ES Modules only (`"type": "module"` in package.json)
- Use `.mjs` extension for Node.js scripts
- Use `node:` prefix for built-in modules (e.g., `node:fs/promises`)

### React Components
- Functional components with explicit interfaces
- Inline styles preferred over CSS-in-JS libraries
- Use `lucide-react` for icons
- Props destructuring in function parameters

### Naming Conventions
- Components: PascalCase (e.g., `ProjectCard.tsx`)
- Files: camelCase for scripts, PascalCase for components
- Variables/functions: camelCase
- Constants: UPPER_SNAKE_CASE

### MDX Content
- YAML frontmatter with `layout: minimal` for posts
- Date format: `YYYY-MM-DD`
- Authors array with quoted strings
- Use `::blog-posts` for blog listing component
- Store snippets in `docs/snippets/`

### Error Handling
- Use `try/catch` for async operations
- Exit with code 1 on script failure: `process.exitCode = 1`
- Log errors to stderr: `console.error()`

### Imports
- Group imports: React/libraries first, then local modules
- Use named imports from `lucide-react`
- No unused imports (enforced by TypeScript)

### Formatting
- 2-space indentation
- No trailing semicolons (enforced by project style)
- Single quotes for strings
- Maximum line length: 100 characters

## Brand Voice

- Technical and developer-focused
- Concise: no fluff, get to the point
- Clear and authoritative
- Use industry terminology naturally
- Minimal adjectives, action-oriented
- Declarative sentences preferred

## Voice & Writing Style

### Tone
- Direct and declarative — state the thesis immediately
- Technical and developer-focused — assume EVM/blockchain knowledge
- Concise: no fluff, no filler phrases
- First-person perspective when sharing beliefs or experiences
- Action-oriented, minimal adjectives

### Structural Patterns
- **Opening:** 1-2 sentence hook stating the core problem/insight
- **Problem Definition:** Concrete, specific language
- **Technical Explanation:** Mechanics first, theory second
- **Examples:** Real code, real use cases
- **Comparison Tables:** For contrasting approaches
- **Closing:** Direct CTA ("reach out", "DM me", "build this")

### Language Guidelines
- Short paragraphs (2-4 sentences maximum)
- Use em dashes for emphasis — like this
- Industry terminology used naturally without explanation
- No hedging language ("maybe", "perhaps", "I think")
- Bullet points for lists
- Tables for multi-dimensional comparisons

### Forbidden Patterns
- ❌ "In this blog post, we will explore..."
- ❌ "It's important to note that..."
- ❌ Long theoretical introductions
- ❌ Passive voice constructions
- ❌ Generic conclusions

### CTAs to Use
- "If you're building X, reach out"
- "DM me and I'll help you integrate"
- "I'm working on this daily — happy to walk through patterns"

## File Organization

```
docs/
  pages/           # Main content (MDX files)
    index.mdx      # Homepage
    blog/           # Blog posts
  snippets/         # Reusable MDX components
  styles.css        # Global styles
scripts/            # Node.js build utilities
public/             # Static assets + generated markdown
```

## Dependencies

- **Framework**: Vocs (documentation site generator)
- **UI**: React 19, React DOM 19
- **Icons**: lucide-react
- **Analytics**: @vercel/speed-insights
- **Types**: @types/react, TypeScript 6.x

## Notes

- No test framework currently configured
- No ESLint/Prettier/Biome configured - rely on TypeScript strict mode
- Light theme enforced globally (see `docs/styles.css`)
- Deployment via Vercel (see `vercel.json` for redirects)
- MDX files auto-exported to `/public/md/` and route-mirrored
