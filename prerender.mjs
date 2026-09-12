/* Every route becomes a real HTML file here, with its own head. Nothing renders
   in the browser: React is a build-time tool in this project, and the only
   script the reader downloads is the motion layer. */
import { readFileSync, writeFileSync, rmSync, cpSync, existsSync } from "node:fs";

/* The address the pages call themselves. It has to be the address that
   actually answers, or every canonical tag points at a dead host — so this
   stays on the workers.dev name until tvara.app is bound to this Worker, and
   the deploy is then run as SITE_URL=https://tvara.app npm run deploy. */
const SITE_URL = (process.env.SITE_URL || "https://tvara.pages.dev").replace(/\/$/, "");
const OG = "/social-card.jpg";
const { renderBody, renderNotFound, schemaFor, ROUTES } = await import("./dist-ssr/entry-server.js");

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
<meta property="og:type" content="website" />
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
  writeFileSync("dist/" + (route.slug || "index") + ".html", document_(route, renderBody(route.path), { index: route.index !== false }));
}

writeFileSync("dist/404.html", document_(
  { slug: "404", title: "Page not found · Tvara", desc: "That page is not here. Every page on this site is one link away." },
  renderNotFound(), { index: false }
));

writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);

/* lastmod is the build date: these pages change when the site is rebuilt and
   never on their own, so anything finer would be a number we cannot vouch for.
   A noindex route is kept OUT — a sitemap is a request to index. */
const LASTMOD = new Date().toISOString().slice(0, 10);
writeFileSync("dist/sitemap.xml", ['<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...ROUTES.filter((r) => r.index !== false)
    .map((r) => `  <url><loc>${SITE_URL}/${r.slug}</loc><lastmod>${LASTMOD}</lastmod></url>`),
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
].join("\n"));

if (existsSync("static")) cpSync("static", "dist", { recursive: true });

rmSync("dist-ssr", { recursive: true, force: true });
console.log(`prerendered ${ROUTES.length} pages + 404`);
