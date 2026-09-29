import Reveal from "../components/Reveal.jsx";
import Accordion from "../components/Accordion.jsx";
import { PRICE, MAIL, mailTo, STORE_URL } from "../routes.js";

export const ITEMS = [
  {
    q: "What is Tvara?",
    a: <>
      <p>Tvara is a long chat extension: it manages long AI conversations on ChatGPT, Claude, Gemini, DeepSeek, Grok and Perplexity, in Chrome and Edge on desktop. It keeps a long chat fast, lets you jump to any message, shows when messages were sent, tracks the usage limits the sites report, and keeps an archive of your chats on your own computer.</p>
      <p>The speed engine, minimap, usage tracking and archive export are free on every supported site. The outline, in-chat search, timestamps and one-click export are free on ChatGPT, Perplexity, DeepSeek and Grok, and part of Pro on Claude and Gemini. Pro is {PRICE} once, on up to five devices, and adds search across every archived chat, encrypted backups, Context Bridge and continuing a chat in a new one. <a href={STORE_URL} rel="noopener">Add it to Chrome</a>.</p>
    </>,
  },
  {
    q: "Do my conversations go to a server?",
    a: <>
      <p>No. No chat text, no titles, no prompts and no exports are ever sent to us or to anyone else. Your archive is written to your browser's own storage on your machine.</p>
      <p>Tvara does run one server — a licence issuer. It decides whether a licence is real and how many devices hold it. It never receives a conversation. <a href="/privacy">The privacy policy</a> lists everything it does store, in full.</p>
    </>,
  },
  {
    q: "Which browsers and which sites?",
    a: <>
      <p>Public launch support is current Chrome Stable and Beta on Windows, macOS, Linux, and ChromeOS, plus current Edge on Windows and macOS. Mobile Chrome, Firefox, Safari, and unsupported browser versions are not supported for this launch.</p>
      <p>Sites: ChatGPT, Claude, Gemini, DeepSeek, Grok and Perplexity.</p>
    </>,
  },
  {
    q: "Is it really a one-time payment?",
    a: <p>Yes — {PRICE} once, no subscription. Free features need no sign-in; Google sign-in is required for trial, purchase, restore, and device management. Pro supports five devices and has a 14-day refund policy.</p>,
  },
  {
    q: "What happens to my chats if I stop paying, or you disappear?",
    a: <>
      <p>They stay on your device and stay exportable. Exporting your own archive never requires a licence.</p>
      <p>An existing signed entitlement continues during a temporary issuer outage. New trials, purchases, restores, device changes, and sign-out wait for the issuer to recover rather than guessing.</p>
    </>,
  },
  {
    q: "Does it slow the page down, or change it?",
    a: <>
      <p>It speeds long chats up: off-screen messages sleep and wake as you reach them. It adds one strip to the right edge and hover cards; the site's own layout is untouched.</p>
      <p>Where the page structure is unfamiliar it does nothing at all rather than guessing. A redesign therefore degrades to the site's ordinary behaviour instead of breaking it.</p>
    </>,
  },
  {
    q: "Can it read my Google account, or my other tabs?",
    a: <>
      <p>No. Sign-in asks Google for <code>openid email</code> and nothing else — no profile, no contacts, no access to anything in your account.</p>
      <p>The extension does not request the <code>tabs</code>, <code>cookies</code>, <code>history</code>, <code>bookmarks</code>, <code>webRequest</code> or <code>scripting</code> permissions. Host access is limited to supported AI sites and Tvara’s post-purchase page.</p>
    </>,
  },
  {
    q: "Why do timestamps say “first seen” on some sites?",
    a: <p>Because a browser is never told when a message was sent, except on ChatGPT, where the app keeps that in its own local state. Everywhere else the honest answer is when the extension first saw the message, and that is what it says. A first-seen time is never dressed up as a send time, and messages that predate your install say so.</p>,
  },
  {
    q: "My allowance says “not reported”.",
    a: <p>That provider does not publish a figure the page can see. Tvara reads the numbers the sites' own responses already carry rather than estimating, so where there is no number it says so instead of inventing one.</p>,
  },
  {
    q: "Something broke after a site update.",
    a: <p>Open the popup and check <strong>Health</strong> — it reports which adapters are primary and which are degraded, per open tab. Then email <a href={mailTo()} target="_blank" rel="noopener noreferrer">{MAIL}</a> with what you saw. Feature breakage after a redesign is a fix, not a mystery.</p>,
  },
];

export default function Faq() {
  return (
    <section data-section="FAQ">
      <Reveal className="section-head">
        <span className="eyebrow">FAQ</span>
        <h1>Questions worth answering plainly</h1>
      </Reveal>
      <Reveal><Accordion items={ITEMS} /></Reveal>
    </section>
  );
}
