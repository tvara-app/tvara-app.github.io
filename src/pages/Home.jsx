import HeroTitle from "../components/HeroTitle.jsx";
import Reveal from "../components/Reveal.jsx";
import SpotlightCard from "../components/SpotlightCard.jsx";
import Simulation from "../components/Simulation.jsx";
import StripMock from "../components/StripMock.jsx";
import { PRICE, STORE_URL } from "../routes.js";
import { PLATFORMS as PAGES } from "../platforms.js";

const PLATFORMS = [
  ["ChatGPT", "--p-chatgpt"], ["Claude", "--p-claude"], ["Gemini", "--p-gemini"],
  ["DeepSeek", "--p-deepseek"], ["Grok", "--p-grok"], ["Perplexity", "--p-perplexity"],
];

const PROBLEMS = [
  {
    n: "01", h: "The chat that grinds",
    p: [
      "Off-screen messages are put to sleep with headroom around the viewport. Nothing is deleted or removed from your archive; messages return as you scroll to them.",
    ],
    aside: <p>The popup shows the live count. On a 1,500-message conversation that reads <strong>1,491 of 1,500 asleep right now</strong>, per site, and it is a count of what is really on the page rather than an estimate.</p>,
  },
  {
    n: "02", h: "The history you cannot use",
    p: [
      "Chats you open on supported AI sites are archived locally. Total Recall searches that local archive, and a result opens the matching conversation with in-chat search ready.",
    ],
    aside: <p>Archive search runs on your machine. No chat text is sent to Tvara.</p>,
  },
  {
    n: "03", h: "The context and allowance you lose track of",
    p: [
      "Context Bridge lets you choose archived passages to add to a new prompt. Usage tracking displays a provider’s own available allowance when it can read one, and says “not reported” when it cannot.",
    ],
    aside: <p>You choose context before it is added. Usage tracking does not alter provider requests.</p>,
  },
];

const STRIP = [
  ["Minimap", "One bar per message — yours and the model's in different shades, starred ones lit. Hover for a preview, click to land there, however far back it is."],
  ["Outline", "A live table of contents from every prompt you sent and every heading in the answers. Star rows straight from the list."],
  ["In-chat search", "Full-text across the whole conversation including sleeping messages, with a live match counter."],
  ["Timestamps", "Real send times on ChatGPT, honest “first seen” times elsewhere. A first-seen time is never dressed up as a send time."],
  ["Resume", "Reopen a long chat and one tap returns you to the message you were reading, anchored to the message rather than a pixel offset."],
  ["Backups", "The conversation as clean Markdown or as structured JSON, on your disk, in one click."],
];

export default function Home() {
  return (
    <>
      <section className="hero" data-section="Overview">
        <div className="hero-grid">
        <div>
        <Reveal><span className="eyebrow">Long chat extension · Chrome and Edge desktop</span></Reveal>
        <HeroTitle lines={["Long AI chats,", "fast again."]} />
        <Reveal className="lede" as="p">
          Tvara keeps long ChatGPT, Claude and Gemini conversations responsive, lets you jump to any
          message and search the chat in front of you, archives your chats locally, finds past context,
          creates encrypted backups, and tracks provider-reported usage.
        </Reveal>
        <Reveal className="cta-row" stagger>
          <a className="btn btn-primary" data-magnetic href={STORE_URL} rel="noopener">Add to Chrome · free <span className="arrow" aria-hidden="true">→</span></a>
          <a className="btn btn-ghost" href="/features">See what it does</a>
          <a className="btn btn-ghost" href="/pricing">Pro · {PRICE} once</a>
        </Reveal>
        <Reveal className="pledge" as="div">
          <span className="dot" aria-hidden="true" /> Your conversations never leave your device. No telemetry, no analytics, no third-party scripts.
        </Reveal>
        <Reveal className="platforms" stagger>
          {PLATFORMS.map(([name, token]) => (
            <a className="chip" key={name} href={"/" + (PAGES.find((p) => p.name === name) || {}).slug}><span className="sw" style={{ "--c": `var(${token})` }} /> {name}</a>
          ))}
        </Reveal>
        </div>
        <Reveal><StripMock /></Reveal>
        </div>
      </section>

      <section data-section="What it fixes">
        <Reveal className="section-head">
          <h2>Three problems, and what happens to them</h2>
          <p>Speed is one part of the product. Local archive, recall, backup, context handoff, and usage visibility complete it.</p>
        </Reveal>
        <div className="rows">
          {PROBLEMS.map((it) => (
            <Reveal className="row" key={it.n}>
              <span className="idx">{it.n}</span>
              <div>
                <h3>{it.h}</h3>
                {it.p.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
              </div>
              <div className="aside">{it.aside}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section data-section="See it work">
        <Reveal className="section-head">
          <h2>The same conversation, with Tvara in it</h2>
          <p>
            The window below is a working stand-in for a chat site: the thread scrolls, and
            everything Tvara adds is in there with it. A walkthrough runs once, and stops the moment
            you touch anything — after that the map, the outline, the search and the stars are yours
            to use. The conversation is invented; the panels behave the way the real ones do.
          </p>
        </Reveal>
        <Reveal><Simulation /></Reveal>
      </section>

      <section data-section="The strip">
        <Reveal className="section-head">
          <h2>Navigation for the chat in front of you</h2>
          <p>
            Tvara adds a hairline to the right edge of the page. Hover it and the map opens; move
            away and it goes back to a line. The site's own layout is never modified, and an
            unfamiliar page means the extension does nothing at all rather than guessing.
          </p>
        </Reveal>
        <Reveal className="grid wide lead" stagger>
          {STRIP.map(([h, p]) => (
            <SpotlightCard key={h}><h3>{h}</h3><p>{p}</p></SpotlightCard>
          ))}
        </Reveal>
      </section>

      <section data-section="Allowance">
        <Reveal className="callout">
          <h2>Usage visibility without guesswork</h2>
          <p>
            Tvara reads an allowance only when a provider exposes a figure it can reliably identify.
            It observes rather than alters provider traffic, and shows “not reported” instead of an estimate.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" data-magnetic href="/features">Every feature, explained <span className="arrow" aria-hidden="true">→</span></a>
            <a className="btn btn-ghost" href="/privacy">How privacy is proven</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
