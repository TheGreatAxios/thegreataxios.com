// Enriches Vocs static HTML output in dist/public with exact trailing-slash
// canonicals, OG/Twitter tags, JSON-LD structured data, and internal link normalization.
import { access, readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const SITE_URL = "https://sawyercutler.com";
const OG_IMAGE = `${SITE_URL}/og-default.png`;
const DIST_DIR = "dist/public";
const BLOG_SRC_DIR = "src/pages/blog";
const DEFAULT_TITLE = "Sawyer Cutler";
const DEFAULT_DESCRIPTION =
  "Sawyer Cutler — Lead Product Engineer at Corbits. Writing about applied AI, agent infrastructure, and developer tools.";

const AUTHOR_PERSON = {
  "@type": "Person",
  name: "Sawyer Cutler",
  url: `${SITE_URL}/`,
  jobTitle: "Lead Product Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Corbits",
    url: "https://corbits.dev",
  },
  sameAs: [
    "https://github.com/thegreataxios",
    "https://x.com/thegreataxios",
    "https://linkedin.com/in/sawyercutler",
  ],
};

function parseFrontmatter(contents) {
  const match = contents.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (pair) {
      const value = pair[2].trim().replace(/^"(.*)"$/, "$1");
      if (value) frontmatter[pair[1]] = value;
    }
  }
  return frontmatter;
}

async function loadBlogMeta() {
  const map = new Map();
  const files = (await readdir(BLOG_SRC_DIR)).filter((f) => f.endsWith(".mdx"));
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const contents = await readFile(join(BLOG_SRC_DIR, file), "utf-8");
    map.set(slug, parseFrontmatter(contents));
  }
  return map;
}

async function collectHtmlFiles(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name.endsWith(".d") ||
        entry.name === "RSC" ||
        entry.name === "assets"
      )
        continue;
      results.push(...(await collectHtmlFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      results.push(fullPath);
    }
  }
  return results;
}

function escapeAttr(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function unescapeHtml(str) {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function upsertHeadTag(html, regex, replacement) {
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  return html.replace("</head>", `${replacement}</head>`);
}

function toCanonicalPath(relPath) {
  const normalized = relPath.replace(/\\/g, "/");
  if (normalized === "index.html") return "/";
  if (normalized.endsWith("/index.html")) {
    return `/${normalized.slice(0, -"index.html".length)}`;
  }
  return `/${normalized.replace(/\.html$/, "")}/`;
}

function buildJsonLd({
  canonicalPath,
  canonicalUrl,
  title,
  description,
  blogMeta,
}) {
  if (canonicalPath === "/") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          name: "Sawyer Cutler",
          url: `${SITE_URL}/`,
          description,
        },
        AUTHOR_PERSON,
      ],
    };
  }

  const blogMatch = canonicalPath.match(/^\/blog\/([^/]+)\/$/);
  if (blogMatch) {
    const meta = blogMeta.get(blogMatch[1]) || {};
    const ld = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: meta.title || title.replace(/^Sawyer Cutler\s*\|\s*/, ""),
      description: meta.description || description,
      url: canonicalUrl,
      image: OG_IMAGE,
      author: {
        "@type": "Person",
        name: "Sawyer Cutler",
        url: `${SITE_URL}/`,
      },
      publisher: {
        "@type": "Person",
        name: "Sawyer Cutler",
        url: `${SITE_URL}/`,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
    };
    if (meta.date) ld.datePublished = meta.date;
    return ld;
  }

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: canonicalUrl,
    author: {
      "@type": "Person",
      name: "Sawyer Cutler",
      url: `${SITE_URL}/`,
    },
  };
}

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

async function ensure404() {
  const path404 = join(DIST_DIR, "404.html");
  try {
    await access(path404);
  } catch {
    const fallback = `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>404 — Sawyer Cutler</title><meta name="robots" content="noindex, nofollow"/></head><body><main style="font-family:system-ui,sans-serif;max-width:600px;margin:4rem auto;padding:0 1.5rem"><h1>Page not found</h1><p><a href="/">← Back to sawyercutler.com</a></p></main></body></html>\n`;
    await writeFile(path404, fallback);
    console.log("Created fallback dist/public/404.html");
  }
}

async function run() {
  const blogMeta = await loadBlogMeta();
  await ensure404();
  const htmlFiles = await collectHtmlFiles(DIST_DIR);
  let updated = 0;

  for (const filePath of htmlFiles) {
    const relPath = relative(DIST_DIR, filePath).replace(/\\/g, "/");
    let html = await readFile(filePath, "utf-8");

    // Normalize internal links to trailing slashes to prevent 308 redirects.
    html = html
      .replace(/href="\/my-projects"/g, 'href="/my-projects/"')
      .replace(/href="(\/blog\/[a-z0-9-]+)"/gi, 'href="$1/"');

    if (relPath === "404.html") {
      html = upsertHeadTag(
        html,
        /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
        '<meta name="robots" content="noindex, nofollow"/>',
      );
      html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, "");
      html = upsertHeadTag(
        html,
        /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:image" content="${OG_IMAGE}"/>`,
      );
      html = upsertHeadTag(
        html,
        /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="twitter:image" content="${OG_IMAGE}"/>`,
      );
      html = html.replace(
        /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi,
        "",
      );
      await writeFile(filePath, html);
      updated++;
      continue;
    }

    const canonicalPath = toCanonicalPath(relPath);
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const isBlogPost = /^\/blog\/[^/]+\/$/.test(canonicalPath);

    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const descMatch = html.match(
      /<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i,
    );
    const pageTitle = titleMatch
      ? unescapeHtml(titleMatch[1].trim())
      : DEFAULT_TITLE;
    const pageDescription = descMatch
      ? unescapeHtml(descMatch[1].trim())
      : DEFAULT_DESCRIPTION;

    html = upsertHeadTag(
      html,
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}"/>`,
    );
    html = upsertHeadTag(
      html,
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}"/>`,
    );
    html = upsertHeadTag(
      html,
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:type" content="${isBlogPost ? "article" : "website"}"/>`,
    );
    html = upsertHeadTag(
      html,
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:image" content="${OG_IMAGE}"/>`,
    );
    html = upsertHeadTag(
      html,
      /<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/?>/i,
      '<meta name="twitter:card" content="summary_large_image"/>',
    );
    html = upsertHeadTag(
      html,
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeAttr(pageTitle)}"/>`,
    );
    html = upsertHeadTag(
      html,
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${escapeAttr(pageDescription)}"/>`,
    );
    html = upsertHeadTag(
      html,
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:image" content="${OG_IMAGE}"/>`,
    );

    const jsonLd = buildJsonLd({
      canonicalPath,
      canonicalUrl,
      title: pageTitle,
      description: pageDescription,
      blogMeta,
    });
    const jsonLdTag = `<script type="application/ld+json">${serializeJsonLd(jsonLd)}</script>`;
    if (
      /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i.test(html)
    ) {
      html = html.replace(
        /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi,
        "",
      );
    }
    html = html.replace("</head>", `${jsonLdTag}</head>`);

    await writeFile(filePath, html);
    updated++;
  }

  console.log(`Enriched SEO metadata in ${updated} HTML files in ${DIST_DIR}`);
}

run().catch((error) => {
  console.error("Postbuild SEO enrichment failed:", error);
  process.exitCode = 1;
});
