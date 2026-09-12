import Reveal from "../components/Reveal.jsx";
import SpotlightCard from "../components/SpotlightCard.jsx";

export const STEPS = [
  ["1 · The strip", "A hairline on the right edge of any supported chat. Hover it to open the map; hover a bar to preview that message; click to land on it. The toolbar at its top holds the outline, search, Context Bridge, continue-in-a-new-chat, mount-older-messages and the two backup buttons."],
  ["2 · The popup", "The Tvara icon in your browser toolbar. It holds every toggle, the live count of sleeping messages, your remaining allowance per platform, your archive, Total Recall, your plan, and the walkthrough whenever you want it again."],
  ["3 · The Recall page", "Opened from the popup or with the Recall shortcut. Search chats archived locally from supported AI sites, manage encrypted backup and restore, and review local archive controls."],
];

const KEYS = [
  [["⌘⇧F", "Ctrl+Shift+F"], "Search this chat", "Reaches messages the page has already unloaded."],
  [["⌘⇧K", "Ctrl+Shift+K"], "Total Recall", "Search locally archived chats from supported AI sites."],
  [["⌘⇧U", "Ctrl+Shift+U"], "Context Bridge", "Pull a past answer into the prompt you are typing."],
  [["Esc"], "Close", "Closes the outline, the search bar or the tour."],
  [["Enter", "Shift+Enter"], "Next / previous match", "While the in-chat search is open."],
  [["Home", "End", "PgUp", "PgDn"], "Move through the map", "While the minimap has focus."],
];

export default function Guide() {
  return (
    <>
      <section data-section="Getting started">
        <Reveal className="section-head">
          <span className="eyebrow">Guide</span>
          <h1>Everything is one strip, one popup and six shortcuts</h1>
          <p>There is nothing to configure before it works. Install it, open a long chat, and the strip appears on the right edge.</p>
        </Reveal>
        <Reveal className="grid" stagger>
          {STEPS.map(([h, p]) => <SpotlightCard key={h}><h3>{h}</h3><p>{p}</p></SpotlightCard>)}
        </Reveal>
      </section>

      <section data-section="Keyboard">
        <Reveal className="section-head">
          <h2>Keyboard reference</h2>
          <p>Your browser owns these. If another extension already holds one, the shortcut is simply not assigned — every one of them is also a button on the strip.</p>
        </Reveal>
        <Reveal as="table" className="keytable">
          <tbody>
            {KEYS.map(([keys, title, note]) => (
              <tr key={title}>
                <td>{keys.map((k) => <kbd key={k}>{k}</kbd>)}</td>
                <td><b>{title}</b>{note}</td>
              </tr>
            ))}
          </tbody>
        </Reveal>
      </section>

      <section data-section="The free trial">
        <Reveal className="section-head"><h2>The free trial, and what signing in is for</h2></Reveal>
        <Reveal className="bullets" as="ul" stagger>
          <li>The trial runs <strong>7 days</strong>, needs no payment details, and is one per account.</li>
          <li>Starting it requires signing in with Google. That is what lets your trial and, later, your purchase follow <em>you</em> across a reinstall or a different browser instead of being stuck to one device.</li>
          <li>The free features need no account at all. Browsing, the speed engine, the map, search, timestamps, and standard exports never ask.</li>
          <li>Public launch support covers current Chrome and Edge desktop browsers. Mobile Chrome, Firefox, Safari, and unsupported browser versions are not supported for this launch.</li>
          <li>Bought before and lost access? Sign in and press <strong>Restore my purchase</strong>, or email us from the purchase address.</li>
        </Reveal>
      </section>

      <section data-section="When a site changes">
        <Reveal className="callout">
          <h2>When a site redesigns</h2>
          <p>
            Unknown page structure means the extension does nothing, rather than guessing and
            breaking the page you are using. That is the deliberate trade: the worst case is the
            site's ordinary behaviour. The popup's <strong>Health</strong> report tells you which
            adapters are running normally and which are degraded, per open tab, reading no message
            text.
          </p>
        </Reveal>
      </section>
    </>
  );
}
