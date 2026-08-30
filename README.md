# tvara-site

The Tvara marketing and legal site. Static, multipage, no runtime dependencies,
no client-side framework and no analytics.

```
npm run build     # write dist/
npm run check     # exit 1 if dist/ is stale
npm run deploy    # build, then wrangler deploy
```

Live: https://tvara-site.tharuntejandhe.workers.dev

## How it is put together

`src/layout.html` is the only shell: head tags, header, navigation, footer.
Each page in `src/pages` is a content fragment whose first line is a
`<!--meta title="…" desc="…"-->` header. `build.mjs` joins the two and writes
`dist/`, plus `_redirects`, `robots.txt` and `sitemap.xml`.

The navigation is generated from the `PAGES` array in `build.mjs`. A static
site with the header pasted into eight files is a site whose navigation is
wrong on two of them within a month.

## The legal pages are copies, and must stay copies

`src/pages/privacy.html` and `src/pages/terms.html` were extracted from the
extension repository's `docs/index.html`, which is still canonical: the
extension links to it, `tools/legal-pages.mjs` generates the standalone pages
from it, and its `preflight` checks it. **Editing the policy here alone puts a
privacy policy in two places and lets them drift**, which is a compliance
problem rather than an untidiness. Change `docs/index.html` first, then
re-extract.

## Why a Worker and not Pages

This account's `/pages/projects` endpoint answers `8000000` to every create
call. Workers static assets is Cloudflare's own recommendation for new
projects and needs no separate product to be enabled, so the site ships as a
Worker with an `[assets]` binding and no script of its own.

## Deliberately not here

No web fonts (the extension's stack is system fonts), no images (the plate is
CSS gradients, the grain is an inline SVG), no JavaScript except the eight-line
redirect shim that keeps `/#privacy` and the other pre-multipage deep links
working. Every page is under 20KB.
