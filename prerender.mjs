/* Every route becomes a real HTML file here, with its own head. Nothing renders
   in the browser: React is a build-time tool in this project, and the only
   script the reader downloads is the motion layer. */
import { readFileSync, writeFileSync, rmSync, cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const OG = "/social-card.jpg";
/* ORIGIN lives in src/routes.js, with the reason it has no env override. */
const { renderBody, renderNotFound, schemaFor, ROUTES, STORE_URL, ORIGIN: SITE_URL } = await import("./dist-ssr/entry-server.js");

/* The client build owns the asset hashes; take the tags it wrote rather than
   guessing filenames. */
const shell = readFileSync("dist/index.html", "utf8");
const assets = [...shell.matchAll(/<(script|link)[^>]*>(?:<\/script>)?/g)]
  .map((m) => m[0])
  .filter((t) => /\/assets\//.test(t))
  .join("\n");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const NOSCRIPT = `<noscript><style>[data-reveal],[data-reveal-group]>*{opacity:1!important;transform:none!important}.qa-panel{grid-template-rows:1fr!important}</style></noscript>`;

function document_(route, body, { index = true } = {}) {
  const canonical = SITE_URL + "/" + route.slug;
  const schema = route.slug === undefined ? [] : schemaFor(route, SITE_URL);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="referrer" content="no-referrer" />
<meta name="theme-color" content="#0a0809" />
<!-- Search Console ownership. It lived nowhere in git once and the property
     silently lost the method; public/google*.html is the second proof. -->
<meta name="google-site-verification" content="GYGJub4zOD_c7H8gGL4CSlIS_AMMsMdpoUIdcobc_2U" />
<title>${esc(route.title)}</title>
<meta name="description" content="${esc(route.desc)}" />
${index ? `<link rel="canonical" href="${canonical}" />` : `<meta name="robots" content="noindex" />`}
<meta property="og:site_name" content="Tvara" />
<meta property="og:title" content="${esc(route.title)}" />
<meta property="og:description" content="${esc(route.desc)}" />
<meta property="og:type" content="${route.answer ? "article" : "website"}" />
${route.answer ? `<meta property="article:modified_time" content="${route.answer.updated}" />` : ""}
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${SITE_URL}${OG}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Tvara — make long AI chats fast again" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(route.title)}" />
<meta name="twitter:description" content="${esc(route.desc)}" />
<meta name="twitter:image" content="${SITE_URL}${OG}" />
<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" href="/logo.png" type="image/png" sizes="128x128" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
${assets}
${NOSCRIPT}
${schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n")}
</head>
<body>
${body}
</body>
</html>
`;
}

for (const route of ROUTES) {
  /* A slug can carry a directory (answers/…), so the folder has to exist before
     the file does. */
  const file = "dist/" + (route.slug || "index") + ".html";
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, document_(route, renderBody(route.path), { index: route.index !== false }));
}

writeFileSync("dist/404.html", document_(
  { slug: "404", title: "Page not found · Tvara", desc: "That page is not here. Every page on this site is one link away." },
  renderNotFound(), { index: false }
));

/* Answer engines named outright: a later rule for * must not shut them out by
   accident. Content-Signal is Cloudflare's opt-in vocabulary; others ignore it. */
const ANSWER_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "DuckAssistBot", "meta-externalagent", "CCBot"];
writeFileSync("dist/robots.txt", [
  ...ANSWER_BOTS.map((b) => `User-agent: ${b}`), "Allow: /", "",
  "User-agent: *", "Content-Signal: search=yes, ai-input=yes, ai-train=yes", "Allow: /", "",
  `Sitemap: ${SITE_URL}/sitemap.xml`, ""].join("\n"));

/* lastmod: the prose date for articles and platform pages, the build date for
   the rest. A date that moves every deploy teaches crawlers to ignore it.
   A noindex route is kept OUT — a sitemap is a request to index. */
const LASTMOD = new Date().toISOString().slice(0, 10);
writeFileSync("dist/sitemap.xml", ['<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...ROUTES.filter((r) => r.index !== false)
    .map((r) => `  <url><loc>${SITE_URL}/${r.slug}</loc><lastmod>${(r.answer || r.platform)?.updated || LASTMOD}</lastmod></url>`),
  "</urlset>", ""].join("\n"));

/* llms.txt: the same map the navigation gives a person, for a model that was
   handed a link and has to decide which page answers the question. */
writeFileSync("dist/llms.txt", [
  "# Tvara",
  "",
  "> A browser extension that keeps long ChatGPT, Claude, Gemini, DeepSeek, Grok and",
  "> Perplexity conversations fast, and adds navigation, cross-platform search and a",
  "> local archive. The speed engine and navigation are free; Pro is $1 once, five",
  "> devices, no subscription. Conversations never leave the reader's device.",
  "",
  "## Pages",
  ...ROUTES.map((r) => `- [${r.crumb}](${SITE_URL}/${r.slug}): ${r.desc}`),
  "",
  "## Notes",
  "- One server exists: a licence issuer. It never receives conversation text.",
  "- Public launch support is current Chrome and Edge desktop browsers.",
  "- Exporting an archive never requires a licence.",
  "",
  "## What it fixes",
  "- A long ChatGPT, Claude or Gemini chat lags or freezes the tab: the speed engine puts off-screen messages to sleep. Free.",
  "- Finding one message in a long chat: minimap, outline, starred messages and in-chat search that reaches unloaded messages. Free.",
  "- Seeing when a message was sent: hover timestamps, with real send times on ChatGPT. Free.",
  "- A chat hit its maximum length or context limit: Continue in a new chat and Context Bridge carry the context over. Pro.",
  "- Searching every past chat across platforms: Total Recall, a local archive. Pro.",
  "- Running out of usage allowance without warning: provider-reported limits, with alerts at 20% and 10%. Free.",
  "- Exporting chats: Markdown and JSON export free; encrypted scheduled backups with Pro.",
  "",
  "## Links",
  `- [Install from the Chrome Web Store](${STORE_URL})`,
  `- [Full text of every article](${SITE_URL}/llms-full.txt)`,
  "",
].join("\n"));

/* llms-full.txt: the articles themselves, one fetch instead of a crawl. */
const plain = (html) => html
  .replace(/<h1[^>]*>(.*?)<\/h1>/g, "# $1").replace(/<h2[^>]*>(.*?)<\/h2>/g, "## $1").replace(/<h3[^>]*>(.*?)<\/h3>/g, "### $1")
  .replace(/<li>/g, "- ").replace(/<[^>]+>/g, "")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&")
  .replace(/\n{3,}/g, "\n\n").trim();
writeFileSync("dist/llms-full.txt", ROUTES.filter((r) => r.answer || r.platform).map((r) => {
  const it = r.answer || r.platform;
  const faq = (it.faq || []).map((f) => `### ${f.q}\n${f.a}`).join("\n\n");
  return `${plain(it.html)}\n\nSource: ${SITE_URL}/${r.slug}` + (faq ? `\n\n## Questions\n\n${faq}` : "");
}).join("\n\n---\n\n") + "\n");

if (existsSync("static")) cpSync("static", "dist", { recursive: true });

rmSync("dist-ssr", { recursive: true, force: true });
console.log(`prerendered ${ROUTES.length} pages + 404`);
