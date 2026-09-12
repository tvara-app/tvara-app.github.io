/* One list. It drives the navigation bar, the breadcrumbs, the prerenderer, the
   sitemap and llms.txt, so a page cannot exist in one of them and be missing
   from another. */
import { ANSWERS } from "./answers.js";

export const ROUTES = [
  { path: "/", slug: "", nav: "Overview", title: "Tvara · AI Chat Speed, Archive & Recall",
    crumb: "Overview",
    desc: "A browser extension for long AI chats: responsiveness, navigation, local archiving, archive search, encrypted backup, context handoff, and provider usage tracking." },
  { path: "/features", slug: "features", nav: "Features", title: "Every Tvara feature, and its honest limits",
    crumb: "Features",
    desc: "Every feature in Tvara, explained: speed engine, minimap, outline, stars, search, timestamps, Chat Card, resume, backups, Total Recall, Context Bridge, allowance tracking and deletion quarantine." },
  { path: "/pricing", slug: "pricing", nav: "Pricing", title: "Tvara pricing · $1 once, five devices, no subscription",
    crumb: "Pricing",
    desc: "Free speed, navigation, local archiving, and usage tracking. Pro is a one-time purchase for archive search, backup, restore, and Context Bridge." },
  { path: "/guide", slug: "guide", nav: "Guide", title: "Using Tvara · the strip, the popup and six shortcuts",
    crumb: "Guide",
    desc: "How to use Tvara: the strip, the popup, Total Recall, Context Bridge, the free trial, and the full keyboard reference." },
  { path: "/faq", slug: "faq", nav: "FAQ", title: "Tvara FAQ · what it sends, what it costs, what breaks",
    crumb: "FAQ",
    desc: "Common questions about Tvara: what it sends, what it costs, which browsers it works in, and what happens when something breaks." },
  { path: "/privacy", slug: "privacy", nav: null, title: "Tvara privacy policy · what the licence issuer stores",
    crumb: "Privacy",
    desc: "What Tvara stores, what its licence issuer receives, and the three places the extension connects to. Your conversations never leave your device." },
  { path: "/terms", slug: "terms", nav: null, title: "Tvara terms of service",
    crumb: "Terms",
    desc: "The terms Tvara is sold and used under: the licence, the free trial, five devices, and what happens when a provider or a licence changes." },
  { path: "/refunds", slug: "refunds", nav: null, title: "Tvara refund policy · 14 days, no questions",
    crumb: "Refunds",
    desc: "A full refund within 14 days of buying Tvara Pro, by email, with no form and no questions. Your archive stays yours either way." },
  { path: "/answers", slug: "answers", nav: "Answers", title: "Answers · long AI chats, explained",
    crumb: "Answers",
    desc: "What goes wrong once an AI conversation gets long — speed, search, exports, usage limits and deletion — explained plainly, with fixes that work with or without Tvara." },
  { path: "/thanks", slug: "thanks", nav: null, title: "Payment received · Tvara",
    crumb: "Purchase activation",
    desc: "Your Tvara Pro purchase is being activated.", index: false },
  /* Every article is a route, so the navigation, the prerenderer, the sitemap
     and llms.txt all learn about it from one place. nav:null keeps the bar
     short — /answers is the door. */
  ...ANSWERS.map((a) => ({
    path: "/" + a.slug, slug: a.slug, nav: null, answer: a,
    crumb: a.crumb, title: a.title, desc: a.desc,
  })),
];

export const PRICE = "$1";
export const MAIL = "tvara.exten@gmail.com";
export const mailTo = (subject = "Tvara support request", body = "Hello Tvara Support,\n\nI need help with: \n\nThanks,") =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(MAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
export const NAV = ROUTES.filter((r) => r.nav);
export const routeFor = (path) => ROUTES.find((r) => r.path === path) || ROUTES[0];
