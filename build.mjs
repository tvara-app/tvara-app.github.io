#!/usr/bin/env node
/**
 * Tvara site — the whole build.
 *
 *   node build.mjs            # write dist/
 *   node build.mjs --check    # exit 1 if dist/ is stale
 *
 * Every page is a content fragment in src/pages plus one shared layout, so the
 * navigation, the head tags and the footer exist once. A static site with the
 * header pasted into eight files is a site whose nav is wrong on two of them
 * within a month.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, "src");
const OUT = join(ROOT, "dist");
const CHECK = process.argv.includes("--check");

/* The price lives here and in the extension's lib/product.js. Neither is what
   a buyer is charged — the issuer's configured product is — so this is copy,
   and the extension's preflight is what stops the two drifting. */
const PRICE = "$1";
const SITE_URL = process.env.SITE_URL || "https://tvara-site.tharuntejandhe.workers.dev";
const MAIL = "tvara.exten@gmail.com";

/* Order is the navigation order. `nav:false` keeps a page out of the bar but
   still builds it — the legal pages are linked from the footer instead. */
const PAGES = [
  { file: "index.html",    slug: "",         nav: "Home" },
  { file: "features.html", slug: "features", nav: "Features" },
  { file: "pricing.html",  slug: "pricing",  nav: "Pricing" },
  { file: "guide.html",    slug: "guide",    nav: "Guide" },
  { file: "faq.html",      slug: "faq",      nav: "FAQ" },
  { file: "privacy.html",  slug: "privacy",  nav: false },
  { file: "terms.html",    slug: "terms",    nav: false }
];

const layout = readFileSync(join(SRC, "layout.html"), "utf8");

/** `<!--meta title="…" desc="…"-->` on line 1 of every page fragment. */
function meta(body) {
  const m = body.match(/^<!--meta([\s\S]*?)-->\s*/);
  if (!m) throw new Error("page has no <!--meta--> header");
  const out = {};
  for (const pair of m[1].matchAll(/(\w+)="([^"]*)"/g)) out[pair[1]] = pair[2];
  return { attrs: out, rest: body.slice(m[0].length) };
}

function navHtml(current) {
  return PAGES.filter((p) => p.nav).map((p) => {
    const href = p.slug ? `/${p.slug}` : "/";
    const on = p.slug === current ? ' class="on" aria-current="page"' : "";
    return `<a href="${href}"${on}>${p.nav}</a>`;
  }).join("");
}

function render(page) {
  const raw = readFileSync(join(SRC, "pages", page.file), "utf8");
  const { attrs, rest } = meta(raw);
  const canonical = SITE_URL + (page.slug ? "/" + page.slug : "/");
  return layout
    .replaceAll("{{title}}", attrs.title)
    .replaceAll("{{desc}}", attrs.desc)
    .replaceAll("{{canonical}}", canonical)
    .replaceAll("{{nav}}", navHtml(page.slug))
    .replaceAll("{{year}}", "2026")
    .replaceAll("{{mail}}", MAIL)
    .replaceAll("{{body}}", rest)
    .replaceAll("{price}", PRICE);
}

const files = new Map();
for (const page of PAGES) files.set(page.file, render(page));

/* Cloudflare Pages serves /features from features.html on its own, but a
   trailing-slash link and the legacy #anchors both need saying out loud. */
files.set("_redirects", [
  "# Deep links handed out before this site was multipage. A URL that has been",
  "# published is retired, not deleted.",
  "/index.html      /            301",
  "/features/       /features    301",
  "/pricing/        /pricing     301",
  "/guide/          /guide       301",
  "/faq/            /faq         301",
  "/privacy/        /privacy     301",
  "/terms/          /terms       301",
  ""
].join("\n"));

files.set("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);

files.set("sitemap.xml", [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...PAGES.map((p) => `  <url><loc>${SITE_URL}${p.slug ? "/" + p.slug : "/"}</loc></url>`),
  "</urlset>",
  ""
].join("\n"));

files.set("styles.css", readFileSync(join(SRC, "styles.css"), "utf8"));

if (CHECK) {
  let stale = 0;
  for (const [name, body] of files) {
    const path = join(OUT, name);
    if (!existsSync(path) || readFileSync(path, "utf8") !== body) {
      console.error("stale: " + name);
      stale = 1;
    }
  }
  process.exit(stale);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const [name, body] of files) writeFileSync(join(OUT, name), body);
const pub = join(ROOT, "public");
if (existsSync(pub)) for (const f of readdirSync(pub)) cpSync(join(pub, f), join(OUT, basename(f)), { recursive: true });
console.log(`built ${files.size} files into dist/`);
