import fs from "node:fs/promises";
import path from "node:path";

const sourceRoot = path.resolve("docs/pages");
const outputRoot = path.resolve("public/md");
const routeMirrorRoot = path.resolve("public");

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(entryPath);
      if (entry.isFile() && entry.name.endsWith(".mdx")) return [entryPath];
      return [];
    }),
  );
  return files.flat();
}

function getAttribute(block, name) {
  const match = block.match(new RegExp(`${name}="([^"]+)"`));
  return match ? match[1] : "";
}

function convertProjectCards(content) {
  return content.replace(/<ProjectCard([\s\S]*?)\/>/g, (_full, attrs) => {
    const title = getAttribute(attrs, "title");
    const description = getAttribute(attrs, "description");
    const github = getAttribute(attrs, "github");
    const website = getAttribute(attrs, "website");

    const lines = [];
    if (title) lines.push(`## ${title}`);
    if (description) lines.push("", description);
    if (github) lines.push("", `- GitHub: ${github}`);
    if (website) lines.push("", `- Website: ${website}`);
    lines.push("");
    return lines.join("\n");
  });
}

function mdxToMarkdown(raw) {
  let content = convertProjectCards(raw);

  // Remove MDX-only constructs outside fenced code blocks.
  const lines = content.split("\n");
  const cleaned = [];
  let inFence = false;

  for (const line of lines) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      cleaned.push(line);
      continue;
    }

    if (!inFence) {
      if (/^import\s.+$/.test(line)) continue;
      if (/^\s*<ProjectsFooter\s*\/>\s*$/.test(line)) continue;
      if (/^\s*<Footer\s*\/>\s*$/.test(line)) continue;
      if (/^\s*<[A-Z][^>]*\/>\s*$/.test(line)) continue;
      if (/\{\/\*[\s\S]*\*\/\}/.test(line)) continue;
    }

    cleaned.push(line);
  }

  content = cleaned.join("\n");

  // Normalize spacing.
  content = content.replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
  return content;
}

async function run() {
  await fs.rm(outputRoot, { recursive: true, force: true });
  await fs.mkdir(outputRoot, { recursive: true });

  const files = await walk(sourceRoot);

  await Promise.all(
    files.map(async (filePath) => {
      const relativePath = path.relative(sourceRoot, filePath);
      const outPath = path.join(outputRoot, relativePath.replace(/\.mdx$/, ".md"));
      const routeMdPath = path.join(routeMirrorRoot, relativePath.replace(/\.mdx$/, ".md"));
      const outDir = path.dirname(outPath);
      const routeOutDir = path.dirname(routeMdPath);
      const source = await fs.readFile(filePath, "utf8");
      const markdown = mdxToMarkdown(source);

      await fs.mkdir(outDir, { recursive: true });
      await fs.mkdir(routeOutDir, { recursive: true });
      await fs.writeFile(outPath, markdown, "utf8");
      await fs.writeFile(routeMdPath, markdown, "utf8");
    }),
  );

  console.log(
    `Exported ${files.length} Markdown file(s) to ${outputRoot} and mirrored route .md files in ${routeMirrorRoot}`,
  );
}

run().catch((error) => {
  console.error("Markdown export failed:", error);
  process.exitCode = 1;
});
