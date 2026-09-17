import { MESSAGES as CHAT, OLDER_MESSAGES as OLDER, SIDEBAR, ARCHIVE } from "./sim-data.js";

/* A chat site in a browser window, with Tvara working inside it: the same
   navigator, the same seven tools, the same panels — the icons and their
   wording are lifted from content/main.js so the demo and the product cannot
   drift. The conversation and the site are invented; no platform is named. */

/* Icon paths, copied from the extension's own toolbar. */
const I = {
  outline: <><path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M3 6h.01" /><path d="M3 12h.01" /><path d="M3 18h.01" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20.5 20.5-4-4" /></>,
  bridge: <><path d="M4 17V9a3 3 0 0 1 3-3h10" /><path d="m14 3 3 3-3 3" /><path d="M20 7v8a3 3 0 0 1-3 3H7" /><path d="m10 21-3-3 3-3" /></>,
  carry: <><path d="M4 12h13" /><path d="m13 6 6 6-6 6" /><path d="M20 4v16" opacity=".45" /></>,
  history: <><path d="M12 20V5" /><path d="m6 11 6-6 6 6" /><path d="M4 3h16" /></>,
  md: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></>,
  json: <><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" /><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" /></>,
  star: <path d="M12 4l2.3 4.9 5.2.7-3.8 3.6 1 5.2-4.7-2.6-4.7 2.6 1-5.2L4.5 9.6l5.2-.7z" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  chevron: <path d="M7 10l5 5 5-5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  lock: <><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
};

const Svg = ({ d, s = 14 }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

const TOOLS = [
  ["outline", "Outline & stars", "Every topic in the chat, and anything you starred"],
  ["search", "Search this chat", "Reaches messages the page has already unloaded"],
  ["bridge", "Context Bridge", "Pull a past answer from your archive into the prompt you are typing"],
  ["carry", "Continue in a new chat", "Carries the goal, your stars and the last few turns into a fresh one"],
  ["history", "Mount older messages", "Puts them back in the page so the site's own find-in-page reaches them"],
  ["md", "Back up as Markdown", "The whole conversation, readable"],
  ["json", "Back up as JSON", "The whole conversation, re-importable"],
];

function Message({ m, i }) {
  return (
    <article className={`sim-msg ${m.r}`} data-i={i} data-h={m.h || ""} data-code={m.code ? "1" : ""}>
      <p data-sim-text>{m.x}</p>
      {m.code && <pre className="sim-code">{m.code}</pre>}
      <footer>
        <span className="sim-time">{m.t}</span>
        <button type="button" className="sim-star" data-sim-star aria-pressed="false" aria-label="Star this message">
          <Svg d={I.star} s={13} />
        </button>
      </footer>
    </article>
  );
}

export default function Simulation() {
  return (
    <figure className="sim" data-sim>
      <div className="sim-browser">
        <div className="sim-chrome">
          <span className="sim-lights" aria-hidden="true"><i /><i /><i /></span>
          <span className="sim-tab"><i className="sim-favicon" aria-hidden="true" />Encrypted backup format</span>
          <span className="sim-address" aria-hidden="true"><Svg d={I.lock} s={12} />chat.example.com/c/8f2a…</span>
        </div>

        <div className="sim-window">
          <aside className="sim-side">
            <span className="sim-new">New chat</span>
            <span className="sim-side-label">Recent</span>
            <ul>
              {SIDEBAR.map((c, i) => (
                <li key={c.title}>
                  <button type="button" data-sim-conv={i} className={i === 0 ? "on" : ""}>{c.title}</button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="sim-main">
            <div className="sim-head">
              <span className="sim-model">Model <Svg d={I.chevron} s={11} /></span>
              <span className="sim-len" data-sim-len>1,471 messages</span>
            </div>

            <div className="sim-chat" data-sim-chat tabIndex={0} role="region" aria-label="Demo conversation">
              <div className="sim-thread" data-sim-thread>
                {CHAT.map((m, i) => <Message m={m} i={i} key={i} />)}
              </div>
            </div>

            <div className="sim-composer">
              <span className="sim-plus" aria-hidden="true"><Svg d={I.plus} s={13} /></span>
              <span className="sim-input" data-sim-composer>Send a message…</span>
              <button type="button" className="sim-bridge-btn" data-sim-tool="bridge" aria-label="Context Bridge">
                <Svg d={I.bridge} s={14} />
              </button>
              <span className="sim-send" aria-hidden="true"><Svg d={I.carry} s={13} /></span>
            </div>
          </div>

          {/* ---------- the navigator Tvara adds ---------- */}
          <div className="sim-mini" data-sim-mini>
            <button type="button" className="sim-mm-toggle" data-sim-collapse aria-label="Collapse conversation navigator">
              <Svg d={I.chevron} s={13} />
            </button>
            <div className="sim-mm-count" data-sim-count-asleep>0</div>
            <div className="sim-mm-canvas" data-sim-map role="group" aria-label="Conversation position">
              <div className="sim-mm-bars" data-sim-bars />
              <div className="sim-mm-lens" data-sim-lens />
            </div>
            <div className="sim-mm-tools">
              {TOOLS.map(([id, title, tip]) => (
                <button type="button" key={id} data-sim-tool={id} data-tip={`${title}|${tip}`} aria-label={title}>
                  <Svg d={I[id]} s={13} />
                </button>
              ))}
            </div>
          </div>

          <div className="sim-tip" data-sim-tip hidden><b /><span /></div>

          <div className="sim-preview" data-sim-preview hidden>
            <div className="sim-preview-head"><b data-sim-preview-meta /></div>
            <p data-sim-preview-text />
            <div className="sim-preview-foot">click the bar to land there</div>
          </div>

          <div className="sim-panel" data-sim-panel hidden>
            <div className="sim-panel-head">
              <div className="sim-tabs" data-sim-tabs>
                <button type="button" data-sim-tab="outline" aria-pressed="true">Outline</button>
                <button type="button" data-sim-tab="starred" aria-pressed="false">Starred</button>
              </div>
              <button type="button" data-sim-close aria-label="Close"><Svg d={I.close} s={13} /></button>
            </div>
            <ul data-sim-panel-list />
          </div>

          <form className="sim-find" data-sim-find hidden>
            <span className="sim-find-icon" aria-hidden="true"><Svg d={I.search} s={13} /></span>
            <input type="search" data-sim-input placeholder="Search this conversation" aria-label="Search this conversation" autoComplete="off" />
            <span className="sim-find-count" data-sim-count>type to search</span>
            <button type="button" data-sim-close aria-label="Close search"><Svg d={I.close} s={13} /></button>
          </form>

          <div className="sim-sheet" data-sim-sheet hidden>
            <div className="sim-sheet-head">
              <b data-sim-sheet-title />
              <button type="button" data-sim-close aria-label="Close"><Svg d={I.close} s={13} /></button>
            </div>
            <div className="sim-sheet-body" data-sim-sheet-body />
            <div className="sim-sheet-foot">
              <span data-sim-sheet-note />
              <button type="button" className="sim-go" data-sim-sheet-go />
            </div>
          </div>

          <div className="sim-card" data-sim-card hidden />

          <button type="button" className="sim-resume" data-sim-resume>
            Back to where you were · message 1,244
          </button>

          <div className="sim-toast" data-sim-toast hidden />

          {/* Data the behaviour needs, as an attribute rather than a script:
              the page ships no inline JavaScript. */}
          <div hidden data-sim-data={JSON.stringify({ older: OLDER, side: SIDEBAR, archive: ARCHIVE })} />
        </div>
      </div>

      <figcaption className="sim-caption">
        <p data-sim-hint>
          The column on the right is what Tvara adds: seven tools, the map of the whole
          conversation, and the count of what is asleep. Hover a tool to see what it does, or press
          one — they all work here.
        </p>
        <button type="button" className="sim-replay" data-sim-replay>Play the walkthrough</button>
      </figcaption>
    </figure>
  );
}

