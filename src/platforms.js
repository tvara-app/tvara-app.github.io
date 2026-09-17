/* One landing page per supported site. People search "ChatGPT", not "AI chat",
   so each site gets a page that says what Tvara does THERE — facts that differ
   per site (what is free, which limits it reads), never one page with the name
   swapped. `updated` is the date of the last edit to the prose, as in answers.js. */
import chatgpt from "./content/platforms/chatgpt.html?raw";
import claude from "./content/platforms/claude.html?raw";
import gemini from "./content/platforms/gemini.html?raw";
import deepseek from "./content/platforms/deepseek.html?raw";
import grok from "./content/platforms/grok.html?raw";
import perplexity from "./content/platforms/perplexity.html?raw";

const PRO = "Pro is $1 once, on up to five devices. It adds search across every archived chat, encrypted backups and Context Bridge.";

export const PLATFORMS = [
  {
    slug: "chatgpt-extension", name: "ChatGPT", html: chatgpt, updated: "2026-09-17",
    title: "Long Chat Extension for ChatGPT: Fix Lag, Search, Backup · Tvara",
    desc: "A Chrome extension that stops long ChatGPT chats lagging, adds a minimap, outline and search, shows real send times, and saves your ChatGPT history locally.",
    related: ["answers/why-long-ai-chats-get-slow", "answers/search-old-ai-conversations", "answers/export-ai-chat-history"],
    faq: [
      { q: "Does Tvara delete ChatGPT messages to make a chat faster?",
        a: "No. Messages outside the screen are put to sleep, not removed, and they come back as you scroll to them. Nothing in your ChatGPT account is changed." },
      { q: "Is Tvara free on ChatGPT?",
        a: "Yes. The speed engine, minimap, outline, in-chat search, send times, usage display and archive export are all free on ChatGPT. " + PRO },
      { q: "Why does Ctrl+F not find old messages in a long ChatGPT chat?",
        a: "ChatGPT unloads older messages to stay responsive, so the text is not in the page for the browser to find. Tvara's in-chat search reads its own copy of the conversation, so it finds messages that are not on screen." },
    ],
  },
  {
    slug: "claude-extension", name: "Claude", html: claude, updated: "2026-09-17",
    title: "Long Chat Extension for Claude: Speed, Usage Limits, Backup · Tvara",
    desc: "A Chrome extension for long Claude chats: less lag, a minimap to jump between messages, your five-hour and weekly usage limits, and your Claude history saved locally.",
    related: ["answers/check-ai-usage-limits", "answers/continue-conversation-in-new-chat", "answers/why-long-ai-chats-get-slow"],
    faq: [
      { q: "Can Tvara show how much of my Claude limit is left?",
        a: "Yes. It shows your five-hour session limit and your weekly limit from Claude's own figures, with the time each resets, and leads with the one that will stop you soonest." },
      { q: "Which Tvara features are free on Claude?",
        a: "The speed engine, minimap, usage limits, Chat Card and archive export are free. Outline, in-chat search and one-click conversation export are part of Pro on Claude, and the seven-day free trial includes them. " + PRO },
      { q: "Does Tvara work on Claude Code in the browser?",
        a: "The minimap works on Claude Code sessions opened at claude.ai/code." },
    ],
  },
  {
    slug: "gemini-extension", name: "Gemini", html: gemini, updated: "2026-09-17",
    title: "Long Chat Extension for Gemini: Speed, Search, Backup · Tvara",
    desc: "A Chrome extension for long Gemini chats: less lag, a minimap, the usage Gemini reports, and your Gemini history saved locally from every Google account you use.",
    related: ["answers/export-ai-chat-history", "answers/check-ai-usage-limits", "answers/using-multiple-ai-assistants"],
    faq: [
      { q: "I use Gemini with two Google accounts. Are both archived?",
        a: "Yes. Tvara finds each Google account you are signed in to and archives the Gemini chats from all of them." },
      { q: "Which Tvara features are free on Gemini?",
        a: "The speed engine, minimap, usage display and archive export are free. Outline, in-chat search and one-click conversation export are part of Pro on Gemini, and the seven-day free trial includes them. " + PRO },
    ],
  },
  {
    slug: "deepseek-extension", name: "DeepSeek", html: deepseek, updated: "2026-09-17",
    title: "Long Chat Extension for DeepSeek: Speed, Search, Backup · Tvara",
    desc: "A Chrome extension for long DeepSeek chats: less lag, a minimap, outline and search, and a local copy of your DeepSeek history that keeps answers apart from the reasoning.",
    related: ["answers/ai-chat-freezes-browser", "answers/read-long-ai-answers", "answers/automatic-backup-ai-chats"],
    faq: [
      { q: "Does Tvara show a DeepSeek usage limit?",
        a: "No, because DeepSeek does not publish one. It slows or refuses requests instead, and any number shown for it would be a guess." },
      { q: "Is Tvara free on DeepSeek?",
        a: "Yes. The speed engine, minimap, outline, in-chat search and archive export are free on DeepSeek. " + PRO },
    ],
  },
  {
    slug: "grok-extension", name: "Grok", html: grok, updated: "2026-09-17",
    title: "Long Chat Extension for Grok: Speed, Search, Backup · Tvara",
    desc: "A Chrome extension for long Grok chats: less lag, a minimap, outline and search, the queries Grok says you have left, and your Grok history saved locally.",
    related: ["answers/why-long-ai-chats-get-slow", "answers/search-old-ai-conversations", "answers/check-ai-usage-limits"],
    faq: [
      { q: "Is Tvara free on Grok?",
        a: "Yes. The speed engine, minimap, outline, in-chat search, queries remaining and archive export are free on Grok. " + PRO },
    ],
  },
  {
    slug: "perplexity-extension", name: "Perplexity", html: perplexity, updated: "2026-09-17",
    title: "Long Chat Extension for Perplexity: Speed, Search, Backup · Tvara",
    desc: "A Chrome extension for long Perplexity threads: less lag, a minimap of every question and answer, Pro searches left, and your threads saved on your computer.",
    related: ["answers/search-old-ai-conversations", "answers/organize-ai-conversations", "answers/export-ai-chat-history"],
    faq: [
      { q: "Can Tvara show how many Perplexity Pro searches I have left?",
        a: "Yes, from the counts Perplexity itself reports. A Pro subscription that has lapsed is not shown as Pro." },
      { q: "Is Tvara free on Perplexity?",
        a: "Yes. The speed engine, minimap, outline, in-chat search, search counts and archive export are free on Perplexity. " + PRO },
    ],
  },
];

export const platformFor = (path) => PLATFORMS.find((p) => "/" + p.slug === path);
