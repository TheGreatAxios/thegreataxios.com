# AGENTS.md

## Project Overview

Vocs-based static documentation site/blog for sawyercutler.com. Built with React 19, TypeScript, and Bun.

## Commands

### Development
- `bun run dev` - Start development server
- `bun run preview` - Preview production build locally

### Build
- `bun run build` - Build Vocs static site

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
- Technical and developer-focused — assume domain knowledge, no oversimplification
- Concise: no fluff, no filler phrases
- First-person perspective when sharing beliefs or experiences
- Full, flowing sentences — NEVER sentence fragments
- Complex ideas expressed in complete clauses, not chopped into isolated short sentences

### Structural Patterns
- **Opening:** 1-2 paragraphs establishing a thesis or framing a problem. Not a list of facts about the environment. Should orient the reader around a concept, not an implementation.
- **Concept First, Implementation Second:** Explain why the architecture matters before showing your specific code. The reader needs to understand the problem before they care about your solution.
- **Comparison Tables:** For contrasting approaches (chat loop vs agent loop, tool calling strategies, etc.)
- **Examples:** Real code with specific callouts for the interesting parts. Show imports so it's copy-paste ready.
- **Callouts:** Use `> **Note:**` blockquotes for critical caveats
- **Closing:** Direct CTA with repo link

### Language Guidelines
- FULL SENTENCES. Always. No fragments. No single-word sentences. No staccato lists masquerading as prose.
- Each paragraph should be 2-5 complete sentences that develop a single idea
- Use em dashes for emphasis within a sentence — like this — not as a replacement for conjunctions
- Industry terminology used naturally without explanation
- No hedging language ("maybe", "perhaps", "I think")
- Bullet points only for actual lists, not for expressing ideas that should be prose
- Tables for multi-dimensional comparisons only

### Forbidden Patterns
- ❌ Sentence fragments of any kind
- ❌ Lists of short declarative statements arranged as paragraphs ("X happens. Y fails. Z breaks.")
- ❌ "In this blog post, we will explore..."
- ❌ "It's important to note that..."
- ❌ Long theoretical introductions that don't make a point
- ❌ Passive voice constructions
- ❌ Generic conclusions
- ❌ Opening with a description of the environment instead of the concept

### Post Structure Template
1. **Thesis paragraph** — What is the common misconception or underappreciated idea?
2. **Why it matters** — Who should care and why should they read further?
3. **Concept introduction** — Explain the architecture/framework at a high level
4. **Deep dive** — Specific details with code, tables, comparisons
5. **Tradeoffs and caveats** — What are the limitations and alternatives?
6. **Closing** — CTA and repo link

### CTAs to Use
- "If you're building X, reach out"
- "The full source is at [github.com/...]"
- "I'm working on this daily — happy to talk through the patterns"

## File Organization

```
docs/
  pages/           # Main content (MDX files)
    index.mdx      # Homepage
    blog/           # Blog posts
  snippets/         # Reusable MDX components
  styles.css        # Global styles

public/             # Static assets + generated markdown
```

## Dependencies

- **Framework**: Vocs (documentation site generator)
- **UI**: React 19, React DOM 19
- **Icons**: lucide-react
- **Analytics**: None (previously @vercel/speed-insights, removed)
- **Types**: @types/react, TypeScript 6.x

## Notes

- No test framework currently configured
- No ESLint/Prettier/Biome configured - rely on TypeScript strict mode
- Light theme enforced globally (see `docs/styles.css`)
- Deployment via Vercel (see `vercel.json` for redirects)
- When showing install commands, default to `npm` for broader compatibility (readers may not use Bun)
