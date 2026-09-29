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
import crash from "./content/answers/ai-chat-freezes-browser.html?raw";
import howmany from "./content/answers/how-many-messages-in-one-chat.html?raw";
import notes from "./content/answers/save-notes-from-ai-chats.html?raw";
import backup from "./content/answers/automatic-backup-ai-chats.html?raw";
import multi from "./content/answers/using-multiple-ai-assistants.html?raw";
import stuck from "./content/answers/ai-chat-wont-load.html?raw";
import when from "./content/answers/see-when-ai-message-was-sent.html?raw";
import jump from "./content/answers/jump-to-message-in-long-chat.html?raw";
import full from "./content/answers/conversation-too-long-context-limit.html?raw";

export const ANSWERS = [
  {
    slug: "answers/long-chat-toolkit", html: kit, updated: "2026-09-29",
    crumb: "Long chat toolkit",
    title: "A toolkit for long AI conversations · Tvara",
    desc: "Long AI chats fail in five distinct ways: speed, navigation, search, lost context and invisible limits. What fixes each one, with and without extra tools.",
  },
  {
    slug: "answers/why-long-ai-chats-get-slow", html: slow, updated: "2026-09-29",
    crumb: "Why long chats get slow",
    title: "Why long ChatGPT and Claude chats get slow, and the fix · Tvara",
    desc: "A long ChatGPT or Claude conversation lags because the page holds tens of thousands of elements, not because the model slowed down. What helps, in order, and what does nothing.",
  },
  {
    slug: "answers/search-old-ai-conversations", html: find, updated: "2026-09-29",
    crumb: "Find an old chat",
    title: "How to search old ChatGPT, Claude and Gemini conversations · Tvara",
    desc: "Ctrl+F fails on long chats because the page unloads its own history, and platform search is title-first. Four methods that work, and why a local archive solves it properly.",
  },
  {
    slug: "answers/export-ai-chat-history", html: out, updated: "2026-09-29",
    crumb: "Export your history",
    title: "How to export ChatGPT, Claude and Gemini chat history · Tvara",
    desc: "Official account exports are slow snapshots in a shape built for machines. What a readable export looks like, why backup is a different job, and how to get both.",
  },
  {
    slug: "answers/check-ai-usage-limits", html: limits, updated: "2026-09-29",
    crumb: "See your usage limit",
    title: "How much of your ChatGPT, Claude or Gemini limit is left · Tvara",
    desc: "Why assistants hide the counter, what they publish anyway, how to plan around a rolling window, and why an invented number is worse than none.",
  },
  {
    slug: "answers/recover-deleted-ai-chat", html: gone, updated: "2026-09-12",
    crumb: "Recover a deleted chat",
    title: "Can you recover a deleted AI conversation? · Tvara",
    desc: "Usually not, and not for long. What deletion really does, the three things worth trying in the first hour, and the only fix that works before it happens.",
  },
  {
    slug: "answers/why-ai-forgets-conversation", html: forget, updated: "2026-09-29",
    crumb: "Why the AI forgets",
    title: "Why the AI forgets what you told it earlier · Tvara",
    desc: "A model has no memory between messages — the whole chat is re-sent each time, and what does not fit the context window is dropped. Why a bigger window does not fix it, and what to do instead.",
  },
  {
    slug: "answers/continue-conversation-in-new-chat", html: carry, updated: "2026-09-29",
    crumb: "Continue in a new chat",
    title: "How to continue a long conversation in a new chat · Tvara",
    desc: "A new chat does not need the transcript — it needs the goal, the decisions, the current state and the next question. A handover format that works, and the prompt that writes it for you.",
  },
  {
    slug: "answers/organize-ai-conversations", html: tidy, updated: "2026-09-29",
    crumb: "Organise your chats",
    title: "How to organise hundreds of AI conversations · Tvara",
    desc: "Auto-generated titles describe where a chat began, not what it concluded. Five habits that genuinely help, and why search beats filing once the list gets long.",
  },
  {
    slug: "answers/is-ai-chat-history-private", html: priv, updated: "2026-09-29",
    crumb: "Is your history private?",
    title: "Is your AI chat history private? · Tvara",
    desc: "Where your conversations are stored, whether they train models, who can read them, what deletion really does, and how to judge what an extension adds to the picture.",
  },
  {
    slug: "answers/choosing-an-ai-chat-extension", html: pick, updated: "2026-09-29",
    crumb: "Judging an extension",
    title: "Choosing a ChatGPT or Claude extension: six tests · Tvara",
    desc: "Six things that separate these tools: what they ask to read, whether your chats leave your machine, how they fail when a site redesigns, and whether they delete messages to look fast.",
  },
  {
    slug: "answers/read-long-ai-answers", html: read, updated: "2026-09-29",
    crumb: "Read a long answer",
    title: "How to read a long AI answer without scrolling forever · Tvara",
    desc: "A chat answer has no headings, no contents and a scrollbar measuring the wrong thing. Five techniques that work now, and the navigation gap underneath them.",
  },
  {
    slug: "answers/ai-chat-freezes-browser", html: crash, updated: "2026-09-29",
    crumb: "When the tab freezes",
    title: "Why a long ChatGPT or Claude chat freezes your browser tab · Tvara",
    desc: "A long conversation full of code and images can exhaust a tab's memory budget. What pushes it over, how to get out of it without losing unsent text, and how to stop it recurring.",
  },
  {
    slug: "answers/how-many-messages-in-one-chat", html: howmany, updated: "2026-09-29",
    crumb: "How long can a chat be?",
    title: "How many messages can one AI conversation hold? · Tvara",
    desc: "Two different limits get confused constantly: what the model can still see, and what the browser tab can still render. Why there is no fixed number, and which one you hit first.",
  },
  {
    slug: "answers/save-notes-from-ai-chats", html: notes, updated: "2026-09-29",
    crumb: "Keep the good parts",
    title: "How to keep the good parts of your AI conversations · Tvara",
    desc: "Four approaches in increasing order of effort, and the silent ways copy-paste loses maths, code language, diagrams and images out of a chat answer.",
  },
  {
    slug: "answers/automatic-backup-ai-chats", html: backup, updated: "2026-09-29",
    crumb: "Automatic backups",
    title: "How to back up your AI conversations automatically · Tvara",
    desc: "Account exports are manual snapshots, not a backup strategy. What an automatic backup has to get right — unattended, encrypted, restorable — and how to roll your own if you prefer.",
  },
  {
    slug: "answers/using-multiple-ai-assistants", html: multi, updated: "2026-09-29",
    crumb: "Using two or three",
    title: "Using two or three AI assistants without losing the thread · Tvara",
    desc: "Context does not travel, history fragments and allowances are separate and invisible. Four habits that help, what never works, and why it is really a search problem.",
  },
  {
    slug: "answers/ai-chat-wont-load", html: stuck, updated: "2026-09-29",
    crumb: "When a chat will not load",
    title: "When an AI conversation will not load · Tvara",
    desc: "Three questions that separate almost every cause — a new chat, a private window, another device — then the five common culprits and what to do if it is genuinely gone.",
  },
  {
    slug: "answers/conversation-too-long-context-limit", html: full, updated: "2026-09-29",
    crumb: "Conversation too long",
    title: "Conversation too long? The context limit, and what to do · Tvara",
    desc: "When ChatGPT or Claude says a chat has reached its maximum length, the context window is full. What fills it, and how to continue in a new chat without losing the thread.",
  },
  {
    slug: "answers/jump-to-message-in-long-chat", html: jump, updated: "2026-09-29",
    crumb: "Jump to a message",
    title: "Jump to any message in a long ChatGPT or Claude chat · Tvara",
    desc: "Why Ctrl+F misses old messages in a long AI chat, what works without tools, and a minimap, outline and search that reach any message in one click.",
  },
  {
    slug: "answers/see-when-ai-message-was-sent", html: when, updated: "2026-09-29",
    crumb: "When was it sent?",
    title: "See when a ChatGPT, Claude or Gemini message was sent · Tvara",
    desc: "AI chat sites hide the time on each message. Where the timestamp is stored, how to read it without tools, and how to show real send times on hover.",
  },
];

export const answerFor = (path) => ANSWERS.find((a) => "/" + a.slug === path);
