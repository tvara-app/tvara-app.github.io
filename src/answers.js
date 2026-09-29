/* The answers library. One entry per article, and ROUTES spreads it in, so an
   article cannot exist in the navigation and be missing from the sitemap — the
   same rule the product pages already follow.
   `updated` is the honest date of the last edit to the prose. It becomes
   dateModified in the schema, so it must not be bumped by a rebuild.
   `faq` is rendered under the article and becomes its FAQPage schema: phrase each
   question the way people type it, and keep each answer true on its own.
   `terms` (glossary only) renders as a definition list and a DefinedTermSet. */
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
import words from "./content/answers/ai-chat-glossary.html?raw";
import claude from "./content/answers/claude-usage-limits.html?raw";
import one from "./content/answers/export-chatgpt-conversation.html?raw";

export const ANSWERS = [
  {
    slug: "answers/long-chat-toolkit", html: kit, updated: "2026-09-29",
    crumb: "Long chat toolkit",
    title: "Long AI chat toolkit: lag, navigation, search, context, limits · Tvara",
    desc: "Long AI chats fail in five distinct ways: speed, navigation, search, lost context and invisible limits. What fixes each one, with and without extra tools.",
    faq: [
      { q: "What is the best way to manage a very long ChatGPT or Claude conversation?",
        a: "Treat it as five separate problems: speed, navigation, search, lost context and usage limits. Reloading and closing tabs help speed for a while, renaming chats and keeping a handover summary protect context, and a long chat extension such as Tvara covers all five in the browser." },
      { q: "Should I start a new chat when a conversation gets long?",
        a: "Yes, when the model starts losing track of early decisions or the chat hits its length limit. If the page is only slow, a new chat is an expensive fix for a rendering problem: reloading the tab, or putting off-screen messages to sleep, keeps the context you would otherwise rebuild by hand." },
      { q: "Is there a Chrome extension for long AI chats?",
        a: "Yes. Tvara is a Chrome and Edge extension for long ChatGPT, Claude, Gemini, DeepSeek, Grok and Perplexity chats. It stops the lag, adds a minimap to jump to any message, shows the usage limits the sites report and keeps a local copy of your chats. The speed engine and minimap are free." },
    ],
  },
  {
    slug: "answers/why-long-ai-chats-get-slow", html: slow, updated: "2026-09-29",
    crumb: "Why long chats get slow",
    title: "Why long ChatGPT and Claude chats get slow, and the fix · Tvara",
    desc: "A long ChatGPT or Claude conversation lags because the page holds tens of thousands of elements, not because the model slowed down. What helps, in order, and what does nothing.",
    faq: [
      { q: "Why is ChatGPT so slow in long conversations?",
        a: "Because the browser draws every message as part of one page. Hundreds of turns with code and formatting become tens of thousands of page elements, and every keystroke and streamed word makes the browser re-measure them. The model is not slower; the page is." },
      { q: "Does a paid plan or a faster model fix the lag in a long chat?",
        a: "No. The lag is in your browser tab, not on the server, so a paid plan, a faster model or a faster connection does not change it. Fewer messages on the page does: a new chat, a reload, or off-screen messages put to sleep." },
      { q: "Does clearing the cache fix a slow AI chat?",
        a: "No. The cost is the live page, not stored data. Reload the tab, close other tabs, or start a new chat instead." },
    ],
  },
  {
    slug: "answers/search-old-ai-conversations", html: find, updated: "2026-09-29",
    crumb: "Find an old chat",
    title: "How to search old ChatGPT, Claude and Gemini conversations · Tvara",
    desc: "Ctrl+F fails on long chats because the page unloads its own history, and platform search is title-first. Four methods that work, and why a local archive solves it properly.",
    faq: [
      { q: "Can you search inside old ChatGPT conversations?",
        a: "ChatGPT's search is built to find a conversation, mostly by its title and recent content, not every line inside hundreds of chats. To find one sentence reliably, search the full text of a data export or a local archive." },
      { q: "Why does Ctrl+F not find text in a long ChatGPT or Claude chat?",
        a: "Long chats unload older messages to stay responsive, so the text is not in the page for the browser to find. Scroll to the top to load them first, or use a search that reads the whole conversation." },
      { q: "How do I search ChatGPT, Claude and Gemini chats at once?",
        a: "No platform searches another's history, so you need one archive that holds all of them. Tvara's Total Recall searches a local copy of every supported platform at once, on your own machine. It is part of Pro, with a seven-day free trial." },
    ],
  },
  {
    slug: "answers/export-ai-chat-history", html: out, updated: "2026-09-29",
    crumb: "Export your history",
    title: "How to export ChatGPT, Claude and Gemini chat history · Tvara",
    desc: "Official account exports are slow snapshots in a shape built for machines. What a readable export looks like, why backup is a different job, and how to get both.",
    faq: [
      { q: "How do I export all my ChatGPT conversations?",
        a: "Settings → Data controls → Export data. ChatGPT emails you a link to a zip file with your whole history, including a conversations.json file. The link expires, so download it promptly." },
      { q: "How do I export my Claude chat history?",
        a: "Settings → Privacy → Export data. Claude emails you a download link for your conversations." },
      { q: "How do I export Gemini conversations?",
        a: "Through Google Takeout, where Gemini conversations are part of your activity data." },
    ],
  },
  {
    slug: "answers/check-ai-usage-limits", html: limits, updated: "2026-09-29",
    crumb: "See your usage limit",
    title: "How much of your ChatGPT, Claude or Gemini limit is left · Tvara",
    desc: "Why assistants hide the counter, what they publish anyway, how to plan around a rolling window, and why an invented number is worse than none.",
    faq: [
      { q: "How do I check how much of my Claude usage is left?",
        a: "Open the usage page in Claude's settings. It shows how much of your five-hour session and your weekly limit you have used, and when each one resets." },
      { q: "Where can I see my Gemini usage?",
        a: "Gemini has a usage page at gemini.google.com/usage." },
      { q: "Does ChatGPT show how many messages I have left?",
        a: "Mostly not. ChatGPT usually tells you when you have reached a limit and when it resets, rather than how close you are." },
    ],
  },
  {
    slug: "answers/recover-deleted-ai-chat", html: gone, updated: "2026-09-29",
    crumb: "Recover a deleted chat",
    title: "Can you recover a deleted AI conversation? · Tvara",
    desc: "Usually not, and not for long. What deletion really does, the three things worth trying in the first hour, and the only fix that works before it happens.",
    faq: [
      { q: "Can I recover a deleted ChatGPT conversation?",
        a: "Usually not by yourself: there is no trash folder. Within the first hours, an account data export may still include it, and another device that has not synced yet may still show it. Copy the text out before reloading." },
      { q: "How long do AI providers keep deleted chats?",
        a: "Commonly around thirty days in their own systems after you delete, but that copy is not available to you. The exact window is in each provider's privacy policy." },
      { q: "Can a temporary chat be recovered?",
        a: "No. Temporary and incognito chats are designed not to be kept in your history, so there is nothing to recover afterwards." },
    ],
  },
  {
    slug: "answers/why-ai-forgets-conversation", html: forget, updated: "2026-09-29",
    crumb: "Why the AI forgets",
    title: "Why the AI forgets what you told it earlier · Tvara",
    desc: "A model has no memory between messages — the whole chat is re-sent each time, and what does not fit the context window is dropped. Why a bigger window does not fix it, and what to do instead.",
    faq: [
      { q: "Why does ChatGPT forget what I said earlier in the conversation?",
        a: "The conversation has outgrown the model's context window, the amount of text it can read at once. The oldest messages fall out of view or get compressed, and the instructions in them go too." },
      { q: "Does ChatGPT memory stop it forgetting earlier messages?",
        a: "No. Memory carries a few saved facts about you into new chats. It does not keep a long conversation in view; the context window is a separate limit." },
      { q: "How do I stop an AI from forgetting my instructions?",
        a: "Put standing instructions in the project or custom-instruction settings, restate key decisions when answers start to drift, and move to a new chat with a short handover once the conversation is long." },
    ],
  },
  {
    slug: "answers/continue-conversation-in-new-chat", html: carry, updated: "2026-09-29",
    crumb: "Continue in a new chat",
    title: "How to continue a long conversation in a new chat · Tvara",
    desc: "A new chat does not need the transcript — it needs the goal, the decisions, the current state and the next question. A handover format that works, and the prompt that writes it for you.",
    faq: [
      { q: "How do I move a ChatGPT conversation to a new chat without losing context?",
        a: "Ask the old chat for a handover: the goal, the decisions and why, anything ruled out, the current state of the work and the next question. Paste that as the first message of the new chat, not the whole transcript." },
      { q: "What prompt summarises a chat for a new session?",
        a: "\"Summarise this conversation as a handover for a fresh session. List only the goal, the decisions we settled and why, anything we ruled out, and the current state of the work. No narrative, no recap of how we got here.\"" },
    ],
  },
  {
    slug: "answers/organize-ai-conversations", html: tidy, updated: "2026-09-29",
    crumb: "Organise your chats",
    title: "How to organise hundreds of AI conversations · Tvara",
    desc: "Auto-generated titles describe where a chat began, not what it concluded. Five habits that genuinely help, and why search beats filing once the list gets long.",
    faq: [
      { q: "How do I organise my ChatGPT chats?",
        a: "Rename each conversation when you finish it, for what it concluded; use a prefix such as [project]; pin the few that are live; and rely on full-text search for everything else." },
      { q: "How do I find an old chat when all the titles look the same?",
        a: "Search by content, not title. Titles are generated from the first message; an archive searched by full text finds a chat by any phrase you remember from inside it." },
    ],
  },
  {
    slug: "answers/is-ai-chat-history-private", html: priv, updated: "2026-09-29",
    crumb: "Is your history private?",
    title: "Is your AI chat history private? · Tvara",
    desc: "Where your conversations are stored, whether they train models, who can read them, what deletion really does, and how to judge what an extension adds to the picture.",
    faq: [
      { q: "Are my ChatGPT or Claude conversations used for training?",
        a: "It depends on your plan and settings. Consumer plans often allow training by default with an opt-out in settings; business and enterprise plans usually do not train on your chats. Check the setting rather than assuming." },
      { q: "Can a browser extension read my AI chats?",
        a: "Yes. An extension allowed on a chat site can read everything on that page. What matters is what it does with it: which sites it asks for, whether it has a server, and whether its privacy policy names what it sends." },
      { q: "Does Tvara upload my conversations?",
        a: "No. Tvara keeps its archive in your browser's own storage. Its only server is a licence issuer, which never receives chat text, titles, prompts or URLs." },
    ],
  },
  {
    slug: "answers/choosing-an-ai-chat-extension", html: pick, updated: "2026-09-29",
    crumb: "Judging an extension",
    title: "Choosing a ChatGPT or Claude extension: six tests · Tvara",
    desc: "Six things that separate these tools: what they ask to read, whether your chats leave your machine, how they fail when a site redesigns, and whether they delete messages to look fast.",
    faq: [
      { q: "Are ChatGPT Chrome extensions safe?",
        a: "Some are and some are not. Check which sites it asks to read, whether your chats leave your machine, and whether the privacy policy names the exact places it sends data." },
      { q: "Do chat speed extensions delete messages?",
        a: "Some remove old messages from the page to make it fast, which also breaks searching and copying. Tvara puts off-screen messages to sleep instead; nothing is deleted and they return as you scroll." },
    ],
  },
  {
    slug: "answers/read-long-ai-answers", html: read, updated: "2026-09-29",
    crumb: "Read a long answer",
    title: "How to read a long AI answer without scrolling forever · Tvara",
    desc: "A chat answer has no headings, no contents and a scrollbar measuring the wrong thing. Five techniques that work now, and the navigation gap underneath them.",
    faq: [
      { q: "How do I navigate a long ChatGPT answer?",
        a: "Ask for headings, then press Ctrl+F and type a heading word to jump to it. A minimap or outline shows the shape of the whole answer and jumps straight to a section." },
      { q: "How do I make ChatGPT give shorter answers?",
        a: "Ask for the shape up front: \"Answer in at most five bullets, then expand only the one I pick.\"" },
    ],
  },
  {
    slug: "answers/ai-chat-freezes-browser", html: crash, updated: "2026-09-29",
    crumb: "When the tab freezes",
    title: "Why a long ChatGPT or Claude chat freezes your browser tab · Tvara",
    desc: "A long conversation full of code and images can exhaust a tab's memory budget. What pushes it over, how to get out of it without losing unsent text, and how to stop it recurring.",
    faq: [
      { q: "Why does ChatGPT crash my browser tab?",
        a: "The tab ran out of memory. A long conversation with large code blocks and images can reach hundreds of megabytes, and past the tab's limit the browser stops it." },
      { q: "How do I fix a frozen or \"Aw, Snap\" tab on a long AI chat?",
        a: "Copy any unsent text first, close other tabs, then reload. Do not scroll back to the top afterwards: that loads every old message again and rebuilds the problem." },
      { q: "Do Claude and Gemini freeze on long chats too?",
        a: "Yes. Every chat site draws the conversation as one growing page, so a long chat full of code can slow down and freeze on any of them." },
    ],
  },
  {
    slug: "answers/how-many-messages-in-one-chat", html: howmany, updated: "2026-09-29",
    crumb: "How long can a chat be?",
    title: "How many messages can one AI conversation hold? · Tvara",
    desc: "Two different limits get confused constantly: what the model can still see, and what the browser tab can still render. Why there is no fixed number, and which one you hit first.",
    faq: [
      { q: "Is there a message limit in one ChatGPT conversation?",
        a: "There is a maximum length, but it is measured in tokens, not messages. Forty messages of dense code can reach it sooner than four hundred short ones. At the limit, ChatGPT asks you to start a new chat." },
      { q: "What is a token?",
        a: "The unit a model reads text in. In English a token is roughly three-quarters of a word; code and many other languages use more tokens per word." },
    ],
  },
  {
    slug: "answers/save-notes-from-ai-chats", html: notes, updated: "2026-09-29",
    crumb: "Keep the good parts",
    title: "How to keep the good parts of your AI conversations · Tvara",
    desc: "Four approaches in increasing order of effort, and the silent ways copy-paste loses maths, code language, diagrams and images out of a chat answer.",
    faq: [
      { q: "How do I save a ChatGPT answer to Obsidian or Notion?",
        a: "Export the conversation as Markdown rather than copying it. Tvara's one-click Markdown keeps headings, lists, code fences and timestamps and opens directly in Obsidian or Notion. It is free on ChatGPT, Perplexity, DeepSeek and Grok, and part of Pro on Claude and Gemini." },
      { q: "Why does maths copied from ChatGPT look wrong?",
        a: "Copying takes the rendered symbols, sometimes twice and sometimes not at all, depending on how the site draws maths. An export that writes the maths back as LaTeX keeps it intact." },
    ],
  },
  {
    slug: "answers/automatic-backup-ai-chats", html: backup, updated: "2026-09-29",
    crumb: "Automatic backups",
    title: "How to back up your AI conversations automatically · Tvara",
    desc: "Account exports are manual snapshots, not a backup strategy. What an automatic backup has to get right — unattended, encrypted, restorable — and how to roll your own if you prefer.",
    faq: [
      { q: "Does ChatGPT back up my chats automatically?",
        a: "Your chats are stored on OpenAI's servers, but there is no scheduled backup that you control. The account export is manual, one-off and arrives by email." },
      { q: "How do I back up Claude conversations?",
        a: "Request an export from Claude's privacy settings on a regular reminder, encrypt the file and keep it somewhere other than the computer that made it. Or use a tool that already archives locally and writes encrypted backups for you." },
    ],
  },
  {
    slug: "answers/using-multiple-ai-assistants", html: multi, updated: "2026-09-29",
    crumb: "Using two or three",
    title: "Using two or three AI assistants without losing the thread · Tvara",
    desc: "Context does not travel, history fragments and allowances are separate and invisible. Four habits that help, what never works, and why it is really a search problem.",
    faq: [
      { q: "Can I share context between ChatGPT and Claude?",
        a: "Not directly; neither can see the other. Carry decisions across with a short reusable brief, or use Tvara's Context Bridge to pull a past answer from any supported platform into the prompt you are writing. Context Bridge is part of Pro." },
      { q: "Is it worth using ChatGPT and Claude together?",
        a: "For many people, yes: one for drafting, one for review. The most useful pattern needs almost no shared context: paste one model's output into the other and ask what is wrong with it." },
    ],
  },
  {
    slug: "answers/ai-chat-wont-load", html: stuck, updated: "2026-09-29",
    crumb: "When a chat will not load",
    title: "When an AI conversation will not load · Tvara",
    desc: "Three questions that separate almost every cause — a new chat, a private window, another device — then the five common culprits and what to do if it is genuinely gone.",
    faq: [
      { q: "Why won't my ChatGPT conversation load?",
        a: "Test three things: a new chat, a private window and your phone. Together they tell you whether the service, your browser profile or that one conversation is the problem. A very long chat can also take thirty seconds or more to appear." },
      { q: "Can an extension stop ChatGPT or Claude from loading?",
        a: "Yes, when the site changes and an extension does not recognise the new page. Disable extensions, reload, and turn them back on one at a time." },
    ],
  },
  {
    slug: "answers/conversation-too-long-context-limit", html: full, updated: "2026-09-29",
    crumb: "Conversation too long",
    title: "Conversation too long? The context limit, and what to do · Tvara",
    desc: "When ChatGPT or Claude says a chat has reached its maximum length, the context window is full. What fills it, and how to continue in a new chat without losing the thread.",
    faq: [
      { q: "What does it mean when a chat reaches its maximum length?",
        a: "The conversation has filled the model's context window. Start a new chat and paste a short handover: the goal, the decisions, the current state and the next question." },
      { q: "Can I make the context window bigger?",
        a: "No. It is set by the model and your plan. You can use it better: keep files and standing instructions in a project, keep one topic per chat, and hand over early." },
      { q: "What is context management in AI chats?",
        a: "Deciding what the model can see. Keep standing material in project or custom instructions, one topic per chat, star the messages that matter, and carry decisions into a new chat rather than the whole transcript." },
    ],
  },
  {
    slug: "answers/jump-to-message-in-long-chat", html: jump, updated: "2026-09-29",
    crumb: "Jump to a message",
    title: "Jump to any message in a long ChatGPT or Claude chat · Tvara",
    desc: "Why Ctrl+F misses old messages in a long AI chat, what works without tools, and a minimap, outline and search that reach any message in one click.",
    faq: [
      { q: "How do I get to the top of a long ChatGPT chat?",
        a: "Click an empty area outside the message box and press Home. On a very long chat the site may load older messages as you reach the top; a minimap jumps straight to any message instead." },
      { q: "How do I bookmark a message in a long AI chat?",
        a: "Reply with a unique tag such as \"DECISION:\" so search finds it later, or use Tvara's stars: bookmarks inside a conversation that survive reloads and have their own tab in the outline." },
    ],
  },
  {
    slug: "answers/see-when-ai-message-was-sent", html: when, updated: "2026-09-29",
    crumb: "When was it sent?",
    title: "See when a ChatGPT, Claude or Gemini message was sent · Tvara",
    desc: "AI chat sites hide the time on each message. Where the timestamp is stored, how to read it without tools, and how to show real send times on hover.",
    faq: [
      { q: "Can you see when a ChatGPT message was sent?",
        a: "Not in ChatGPT itself. The time is stored with each message: read it from create_time in a data export, or hover the message with Tvara, which shows the real send time on ChatGPT for free." },
      { q: "Does Claude show timestamps on messages?",
        a: "Not on each message. Claude's data export has a creation time for every message. In the browser, past send times are not available on Claude, so Tvara labels a message with when it first saw it instead of guessing." },
    ],
  },
  {
    slug: "answers/ai-chat-glossary", html: words, updated: "2026-09-29",
    crumb: "Glossary",
    title: "Long AI chat glossary: context window, tokens, memory, limits · Tvara",
    desc: "Plain definitions of the words behind long AI chats: context window, tokens, context limit, context management, compaction, memory, handover, usage limits and more.",
    terms: [
      { id: "context-window", term: "Context window",
        def: "The amount of text a model can read at once: the conversation so far, attached files and its instructions. It is measured in tokens. When a chat outgrows it, the oldest parts fall out of view." },
      { id: "token", term: "Token",
        def: "The unit a model reads text in. In English a token is roughly three-quarters of a word; code and many other languages use more tokens per word." },
      { id: "context-limit", term: "Context limit",
        def: "The point where a conversation no longer fits the context window, also called the maximum conversation length. Some apps then refuse to continue and ask for a new chat; others quietly drop or compress the oldest turns." },
      { id: "context-management", term: "Context management",
        def: "Also called context handling: deciding what the model sees. One topic per chat, standing material in project or custom instructions, key decisions restated, and a handover rather than a transcript when you start over." },
      { id: "compaction", term: "Compaction",
        def: "Replacing older turns with a shorter summary so a conversation still fits the window. It keeps the gist and loses detail, often the exact constraint you needed." },
      { id: "memory", term: "Memory",
        def: "A small set of facts an assistant saves about you and brings into new chats. It is separate from the context window: memory does not keep a long conversation in view." },
      { id: "custom-instructions", term: "Custom instructions and projects",
        def: "Standing material an app adds to every chat in an account or project, so you do not paste it again. It still takes room in the context window." },
      { id: "handover", term: "Handover",
        def: "A short message that starts a new chat with the goal, the decisions, the current state and the next question from an old one. It carries conclusions, not the transcript." },
      { id: "temporary-chat", term: "Temporary chat",
        def: "A mode in which the platform does not keep the conversation in your history. It is designed not to persist, so it cannot be recovered afterwards." },
      { id: "usage-limit", term: "Usage limit",
        def: "The allowance a plan gives you before the app refuses or slows requests, also called a rate limit. It is often weighted by length and features rather than a simple count of messages." },
      { id: "rolling-window", term: "Rolling window",
        def: "A limit counted over the last few hours or days instead of per calendar day, so it lifts a set time after you were cut off, not at midnight." },
      { id: "lazy-loading", term: "Lazy loading",
        def: "How chat sites keep a long conversation responsive: only part of it is kept in the page and the rest loads as you scroll. It is why Ctrl+F misses older messages." },
      { id: "speed-engine", term: "Speed engine",
        def: "Tvara's way of keeping a long chat fast: messages off screen are put to sleep, not deleted, and wake as you scroll to them." },
      { id: "minimap", term: "Minimap",
        def: "A thin map of the whole conversation on the edge of the page. Hover a mark to preview that message; click to jump to it." },
      { id: "local-archive", term: "Local archive",
        def: "A copy of your conversations kept on your own computer. It can be searched offline and survives when the provider deletes a chat." },
      { id: "export-vs-backup", term: "Export and backup",
        def: "An export is a file for reading, such as Markdown, HTML or JSON. A backup is a file for restoring: complete, and ideally encrypted. You want both." },
    ],
    faq: [
      { q: "What is the difference between memory and context in ChatGPT?",
        a: "Context is the conversation the model can read right now, limited by its context window. Memory is a small set of saved facts carried into new chats. Memory does not make a long conversation fit." },
      { q: "Why do long chats use up usage limits faster?",
        a: "Every message sends the conversation back to the model. On plans metered by usage rather than message count, such as Claude's, a message late in a long chat costs more than the same message in a new one." },
    ],
  },
  {
    slug: "answers/claude-usage-limits", html: claude, updated: "2026-09-29",
    crumb: "Claude usage limits",
    title: "Claude usage limits: the five-hour session and weekly cap · Tvara",
    desc: "How Claude's five-hour session limit and weekly limit work, where to see what is left, why long chats use it up faster, and how to make it last.",
    faq: [
      { q: "When does the Claude usage limit reset?",
        a: "The session limit runs on a five-hour window, and the weekly limit resets once a week. The usage page in Claude's settings, and the message you get at the limit, show when each resets." },
      { q: "Why do I hit the Claude limit so fast?",
        a: "Usage is weighted, not counted per message. Long conversations, large files and heavy features such as research use more per message, because Claude reads the whole conversation again each time. A new chat with a short handover costs less than continuing a very long one." },
      { q: "Can I see my Claude usage without opening settings?",
        a: "Yes, with Tvara. It shows the five-hour session and weekly limit from Claude's own figures with their reset times, leads with the one that will stop you soonest, and warns at 20% and 10% left. Allowance tracking is free." },
    ],
  },
  {
    slug: "answers/export-chatgpt-conversation", html: one, updated: "2026-09-29",
    crumb: "Export one ChatGPT chat",
    title: "Export a ChatGPT conversation to Markdown, PDF or JSON · Tvara",
    desc: "ChatGPT's export covers your whole account and arrives by email. How to save one conversation as Markdown, PDF or JSON, and what each method loses.",
    faq: [
      { q: "Can I export a single ChatGPT conversation?",
        a: "ChatGPT's built-in export covers your whole account and arrives by email as a zip. For one conversation, copy the replies, print the page to PDF, or use an extension that saves the conversation as a Markdown or JSON file." },
      { q: "How do I save a ChatGPT chat as a PDF?",
        a: "Press Ctrl+P or Cmd+P and choose Save as PDF. It works for short chats; long ones print poorly. Exporting Markdown and converting that to PDF gives a cleaner result." },
      { q: "How do I export ChatGPT to Markdown?",
        a: "Tvara's minimap toolbar saves the open ChatGPT conversation as Markdown in one click, with headings, code fences and timestamps. It is free on ChatGPT." },
    ],
  },
];

export const answerFor = (path) => ANSWERS.find((a) => "/" + a.slug === path);
