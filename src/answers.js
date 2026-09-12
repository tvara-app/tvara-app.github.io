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
import forget from "./content/answers/why-ai-forgets-conversation.html?raw";
import carry from "./content/answers/continue-conversation-in-new-chat.html?raw";
import tidy from "./content/answers/organize-ai-conversations.html?raw";
import priv from "./content/answers/is-ai-chat-history-private.html?raw";
import pick from "./content/answers/choosing-an-ai-chat-extension.html?raw";
import read from "./content/answers/read-long-ai-answers.html?raw";

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
  {
    slug: "answers/why-ai-forgets-conversation", html: forget, updated: "2026-09-12",
    crumb: "Why the AI forgets",
    title: "Why the AI forgets what you told it earlier · Tvara",
    desc: "A model has no memory between messages — the whole chat is re-sent each time, and what does not fit the context window is dropped. Why a bigger window does not fix it, and what to do instead.",
  },
  {
    slug: "answers/continue-conversation-in-new-chat", html: carry, updated: "2026-09-12",
    crumb: "Continue in a new chat",
    title: "How to continue a long conversation in a new chat · Tvara",
    desc: "A new chat does not need the transcript — it needs the goal, the decisions, the current state and the next question. A handover format that works, and the prompt that writes it for you.",
  },
  {
    slug: "answers/organize-ai-conversations", html: tidy, updated: "2026-09-12",
    crumb: "Organise your chats",
    title: "How to organise hundreds of AI conversations · Tvara",
    desc: "Auto-generated titles describe where a chat began, not what it concluded. Five habits that genuinely help, and why search beats filing once the list gets long.",
  },
  {
    slug: "answers/is-ai-chat-history-private", html: priv, updated: "2026-09-12",
    crumb: "Is your history private?",
    title: "Is your AI chat history private? · Tvara",
    desc: "Where your conversations are stored, whether they train models, who can read them, what deletion really does, and how to judge what an extension adds to the picture.",
  },
  {
    slug: "answers/choosing-an-ai-chat-extension", html: pick, updated: "2026-09-12",
    crumb: "Judging an extension",
    title: "How to judge a browser extension for AI chats · Tvara",
    desc: "Six things that separate these tools: what they ask to read, whether your chats leave your machine, how they fail when a site redesigns, and whether they delete messages to look fast.",
  },
  {
    slug: "answers/read-long-ai-answers", html: read, updated: "2026-09-12",
    crumb: "Read a long answer",
    title: "How to read a long AI answer without scrolling forever · Tvara",
    desc: "A chat answer has no headings, no contents and a scrollbar measuring the wrong thing. Five techniques that work now, and the navigation gap underneath them.",
  },
];

export const answerFor = (path) => ANSWERS.find((a) => "/" + a.slug === path);
