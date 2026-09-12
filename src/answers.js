/* The answers library. One entry per article, and ROUTES spreads it in, so an
   article cannot exist in the navigation and be missing from the sitemap — the
   same rule the product pages already follow.
   `updated` is the honest date of the last edit to the prose. It becomes
   dateModified in the schema, so it must not be bumped by a rebuild. */
import slow from "./content/answers/why-long-ai-chats-get-slow.html?raw";
import find from "./content/answers/search-old-ai-conversations.html?raw";
import out from "./content/answers/export-ai-chat-history.html?raw";
import limits from "./content/answers/check-ai-usage-limits.html?raw";
import gone from "./content/answers/recover-deleted-ai-chat.html?raw";
import kit from "./content/answers/long-chat-toolkit.html?raw";

export const ANSWERS = [
  {
    slug: "answers/long-chat-toolkit", html: kit, updated: "2026-09-12",
    crumb: "Long chat toolkit",
    title: "A toolkit for long AI conversations · Tvara",
    desc: "Long AI chats fail in five distinct ways: speed, navigation, search, lost context and invisible limits. What fixes each one, with and without extra tools.",
  },
  {
    slug: "answers/why-long-ai-chats-get-slow", html: slow, updated: "2026-09-12",
    crumb: "Why long chats get slow",
    title: "Why long AI chats get slow, and what actually fixes it · Tvara",
    desc: "A long ChatGPT or Claude conversation lags because the page holds tens of thousands of elements, not because the model slowed down. What helps, in order, and what does nothing.",
  },
  {
    slug: "answers/search-old-ai-conversations", html: find, updated: "2026-09-12",
    crumb: "Find an old chat",
    title: "How to find something you said in an old AI chat · Tvara",
    desc: "Ctrl+F fails on long chats because the page unloads its own history, and platform search is title-first. Four methods that work, and why a local archive solves it properly.",
  },
  {
    slug: "answers/export-ai-chat-history", html: out, updated: "2026-09-12",
    crumb: "Export your history",
    title: "How to export your AI chat history before you lose it · Tvara",
    desc: "Official account exports are slow snapshots in a shape built for machines. What a readable export looks like, why backup is a different job, and how to get both.",
  },
  {
    slug: "answers/check-ai-usage-limits", html: limits, updated: "2026-09-12",
    crumb: "See your usage limit",
    title: "How much of your AI usage limit is left · Tvara",
    desc: "Why assistants hide the counter, what they publish anyway, how to plan around a rolling window, and why an invented number is worse than none.",
  },
  {
    slug: "answers/recover-deleted-ai-chat", html: gone, updated: "2026-09-12",
    crumb: "Recover a deleted chat",
    title: "Can you recover a deleted AI conversation? · Tvara",
    desc: "Usually not, and not for long. What deletion really does, the three things worth trying in the first hour, and the only fix that works before it happens.",
  },
];

export const answerFor = (path) => ANSWERS.find((a) => "/" + a.slug === path);
