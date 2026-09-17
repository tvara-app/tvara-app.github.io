# tvara-site

The Tvara marketing and legal site. Authored in React, rendered to static HTML
at build time, served from Cloudflare Workers static assets.

## No framework in the browser

React is a build-time tool here. `prerender.mjs` renders every route with
`react-dom/server` and writes a real HTML file with its own title, description,
canonical, Open Graph tags and JSON-LD. Nothing hydrates. The only script the
reader downloads is `src/client.js` — GSAP plus about two hundred lines that add
motion to markup that is already complete. With JavaScript blocked, every page,
including all the FAQ answers, still reads.

That is also why navigation is ordinary links: seven pages, seven files, no
client-side router.

## Commands

```bash
npm run build    # client assets, SSR bundle, prerender, sitemap, robots, llms.txt
npm run preview  # build, then serve dist/ locally
npm run deploy   # build, then wrangler deploy
```

There is no dev server: `index.html` exists only so Vite emits the stylesheet
and the script. Use `npm run preview` and reload.

## Structure

- `src/routes.js` — the one list of pages. It drives the nav bar, the
  breadcrumbs, the prerenderer, the sitemap and `llms.txt`, so a page cannot
  exist in one of them and be missing from another. Price and support address
  live here too.
- `src/pages/*.jsx` — one component per route. `NotFound.jsx` becomes `404.html`.
- `src/content/*.html` — the privacy policy and terms, as one document each.
- `src/components/Simulation.jsx` — the chat window on the home page: four
  states (speed engine, map, search, outline) played inside a mock chat site and
  selectable by tab. The controller is in `src/client.js`.
- `src/styles.css` — the extension's own tokens at page scale: the popup's warm
  plate, its hairlines, its type. Every animation sits behind
  `prefers-reduced-motion`.
- `static/` — copied into `dist/` verbatim: the extension's icons, the social
  card, and `_headers`.

## Serving and cost

`wrangler.toml` declares an **assets-only** Worker: no `main`, no bindings.
Cloudflare serves the files from its edge without invoking a Worker, which is
free and unmetered — adding a script (for a redirect, say) would turn every
request into a billable invocation, so response headers come from
`static/_headers` instead.

`SITE_URL` sets the address the pages call themselves. It defaults to the
workers.dev hostname; once a custom domain is bound to this Worker, deploy with:

```bash
SITE_URL=https://tvara.app npm run deploy
```
