# Search and answer engines

How tvara.pages.dev gets found, what the code already does, and what only a person can do.

## Why it is not ranking yet

1. **No domain of its own.** The site lives on `tvara.pages.dev`, a shared Cloudflare host. `tvara.app` has no DNS. Search engines trust a site's own domain more, and moving later costs a migration.
2. **New and unlinked.** Almost nothing links to the site. Rankings for "tvara" and for long-chat queries follow links and mentions more than on-page work.
3. **Weak Bing coverage.** ChatGPT search, Copilot and DuckDuckGo read Bing's index. Pages missing from Bing are missing from those answers too.

The code side is done (below). The remaining steps are yours, in this order:

1. `npm run deploy` — builds, runs preflight, deploys, pings IndexNow.
2. Google Search Console: add the property, submit `/sitemap.xml`, request indexing for `/`, `/answers` and the six platform pages.
3. Bing Webmaster Tools: import from Search Console, submit the sitemap.
4. `npx wrangler login`, then `npm run domain` to attach `tvara.app`.
5. When `https://tvara.app` answers: set `ORIGIN` in `src/routes.js`, deploy, add a Bulk Redirect from `tvara.pages.dev/*` to `tvara.app/$1` (301), and file a Change of Address in Search Console.
6. Work the off-page list below. This is the step that moves rankings.

## What the site already does

- One fixed origin (`ORIGIN` in `src/routes.js`) for every canonical, sitemap entry, `og:url` and schema `@id`. Preflight fails the deploy if the origin drifts.
- Every page is static HTML. Crawlers and answer engines get the full text without running JavaScript.
- `ROUTES` in `src/routes.js` drives nav, prerender, sitemap and `llms.txt`, so a new page cannot be forgotten by any of them.
- Structured data: Organization, WebSite and SoftwareApplication (with keywords) on the home page. BreadcrumbList on every other page. Article and FAQPage on every answer. FAQPage on `/faq` and every platform page. HowTo on `/guide`. DefinedTermSet on the glossary. ItemList on `/answers`.
- `llms.txt` and `llms-full.txt` give answer engines the whole library as plain text, including every FAQ and glossary term.
- Honest `lastmod`: each article's `updated` date feeds the sitemap and `dateModified`.
- IndexNow pings Bing and Yandex on every deploy.

## Keyword map

One page per search intent. Before adding a page, check that the intent is not already covered here.

| Cluster | People type | Page |
| --- | --- | --- |
| Brand | tvara, tvara extension, tvara chrome | `/`, `/features`, `/faq` |
| Category | long chat extension, AI chat manager, chat handler, long conversation tool | `/`, `/answers/long-chat-toolkit`, `/answers/choosing-an-ai-chat-extension` |
| Per assistant | ChatGPT extension, Claude extension, Gemini extension, DeepSeek, Grok, Perplexity extension | the six platform pages |
| Speed | ChatGPT slow long chat, chat lagging, browser freezes, page unresponsive | `why-long-ai-chats-get-slow`, `ai-chat-freezes-browser`, `ai-chat-wont-load` |
| Navigation | jump to message, chat outline, minimap, scroll long chat | `jump-to-message-in-long-chat`, `read-long-ai-answers` |
| Search | search old ChatGPT chats, find a conversation | `search-old-ai-conversations`, `organize-ai-conversations` |
| Context | context window, context handling, context management, AI forgets, conversation too long | `why-ai-forgets-conversation`, `conversation-too-long-context-limit`, `continue-conversation-in-new-chat`, `ai-chat-glossary` |
| Limits | Claude usage limit, ChatGPT limit, message cap, rate limit reset | `claude-usage-limits`, `check-ai-usage-limits`, `how-many-messages-in-one-chat` |
| Export and backup | export ChatGPT chat, save as Markdown or PDF, back up AI chats | `export-chatgpt-conversation`, `export-ai-chat-history`, `automatic-backup-ai-chats`, `save-notes-from-ai-chats` |
| Recovery | recover deleted ChatGPT chat | `recover-deleted-ai-chat` |
| Timestamps | when was a ChatGPT message sent | `see-when-ai-message-was-sent` |
| Privacy | is AI chat history private | `is-ai-chat-history-private` |
| Several assistants | use ChatGPT and Claude together | `using-multiple-ai-assistants` |
| Definitions | what is a token, context window, compaction | `ai-chat-glossary` |

Gaps worth a page next: Gemini usage limits, exporting a Claude conversation, ChatGPT memory versus chat history, and a Tvara-versus-alternatives comparison.

## Adding an article

1. Add the HTML to `src/content/answers/` and an entry to `src/answers.js`.
2. The first paragraph starts `Short answer:` and answers the question on its own in one or two sentences. Answer engines quote it.
3. The `h1` and `title` use the words people type, not house words.
4. `faq` is required. Two or three questions, phrased as searches, each answer true on its own. It renders on the page and becomes FAQPage schema.
5. Set `updated` only when the content changes. A date bumped without a change teaches crawlers to ignore it.
6. Link to at least two related articles and the relevant platform page. Add the new article to that platform's `related` list in `src/platforms.js`.
7. Match the extension's real gating. The speed engine, minimap, allowance tracking and archive export are free everywhere. The outline, in-chat search, timestamps and one-click export are free on ChatGPT, Perplexity, DeepSeek and Grok, and Pro (seven-day free trial) on Claude and Gemini.
8. `npm run build`, then check `dist/<slug>/index.html` for the title, the JSON-LD and the short answer.

## Chrome Web Store listing

The store listing ranks in Google on its own and is often the first result for a brand query.

- Never name ChatGPT, Claude, Gemini or other providers in the store title, summary or screenshots. The listing was rejected once for this. Describe the job instead: long AI chats, speed, search, backup.
- Keep the short description to the problem and the result, for example "Keeps long AI chats fast, searchable and backed up."
- Use all five screenshots, each with a caption that states one benefit. Add a short demo video.
- Ask satisfied users for reviews. Rating count and recency affect store ranking.
- Set the listing's website field to the site. The site already links to the listing from every page.

## Off-page checklist

Links and mentions from real places are what move a new site. Do these once each, honestly, and without paid links.

- Product Hunt launch.
- AlternativeTo: list Tvara as an alternative to other chat extensions.
- AI tool directories (There's An AI For That, Futurepedia, Toolify and similar).
- Reddit: answer real questions in relevant subreddits, within each subreddit's self-promotion rules.
- Show HN, with the technical story (static site, local-only data).
- A public GitHub repo or README describing the extension, linking to the site.
- A YouTube demo: a long chat before and after, titled with the searched words.
- A post on your own profiles (X, LinkedIn) with the link.

## Measuring

- Search Console → Performance: queries, impressions and position per page. Check weekly for the first two months.
- Search Console → Pages: anything "Discovered – currently not indexed" needs links pointing at it.
- Bing Webmaster Tools → Search Performance, for ChatGPT search and Copilot visibility.
- Search `site:tvara.pages.dev` (later `site:tvara.app`) to see what is indexed.
- Ask ChatGPT, Perplexity and Copilot "what extension makes long ChatGPT chats faster?" once a month and note whether Tvara is cited.

## Why it keeps working

- The origin is fixed and preflight blocks a deploy with a wrong canonical, so rankings are not split across hosts.
- Pages are static and fast, with no client rendering to break.
- `lastmod` is honest, so crawlers keep trusting it.
- IndexNow runs on every deploy, so changes reach Bing within hours.
- Content answers stable questions, not news, so it does not go stale.
