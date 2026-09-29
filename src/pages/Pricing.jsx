import Reveal from "../components/Reveal.jsx";
import { PRICE, MAIL, mailTo } from "../routes.js";

const FREE = [
  "Speed engine and minimap on every supported site",
  "Outline, in-chat search, timestamps and one-click export on ChatGPT, Perplexity, DeepSeek and Grok",
  "Local archive of chats opened on supported AI sites",
  "Provider usage tracking when a reliable figure is available",
  "Archive export on every supported site",
  "No account, no sign-up, nothing to cancel",
  "No card, not even to start",
];

const PRO = [
  "Total Recall — local search across archived supported chats",
  "Context Bridge — your own past answers, into the prompt you are writing",
  "Continue in a new chat, carrying the context across",
  "Outline, in-chat search, timestamps and one-click export on Claude and Gemini",
  "Encrypted local backups with a passphrase you choose",
  "5 devices, reassigned from the popup any time",
  "All future Pro updates included",
  "Full refund within 14 days, no hoops",
];

export default function Pricing() {
  return (
    <>
      <section data-section="Pricing">
        <Reveal className="section-head">
          <span className="eyebrow">Plans</span>
          <h1>{PRICE}, once. There is no subscription.</h1>
          <p>
            The speed engine, minimap, resume, and archive export are free on every supported site, and the
            outline, search, and timestamps are free on four of the six. Pro adds local archive search, Context
            Bridge, encrypted backup, restore, and those tools on Claude and Gemini.
          </p>
        </Reveal>

        <Reveal className="plans" stagger>
          <div className="plan">
            <div className="amt">Free</div>
            <div className="per">forever</div>
            <ul>{FREE.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="plan hot">
            <div className="amt">{PRICE}</div>
            <div className="per">one-time · no subscription · forever</div>
            <ul>{PRO.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </Reveal>

        <Reveal className="fineprint" as="p">
          <strong>You buy it from inside the extension.</strong> Open Tvara in your toolbar and
          press <strong>Get Pro</strong>. Checkout opens in a tab and the licence switches itself
          on when the payment clears — nothing to copy, nothing to paste, and no licence key ever
          travels in a web address.
        </Reveal>

        <Reveal className="fineprint" as="p">
          There is a <strong>7-day free trial</strong> before any of that, and it needs no payment
          details. Starting it — and buying — requires Google sign-in so your trial and purchase can
          be restored after a reinstall. Payments are handled by our merchant of record.
        </Reveal>
      </section>

      <section id="devices" data-section="Devices">
        <Reveal className="section-head">
          <h2>Devices</h2>
          <p>One Pro licence activates on <strong>5 devices</strong> at once.</p>
        </Reveal>
        <Reveal className="bullets" as="ul" stagger>
          <li>A “device” is a signed-in browser profile. Separate browser profiles use separate slots.</li>
          <li>Open the popup and click <strong>Devices</strong> to see them. <strong>Release</strong> frees the one you are on; <strong>Terminate</strong> frees any other.</li>
          <li>If every slot is full when you activate, the extension frees your <em>oldest</em> device automatically and carries on. It only stops to ask when the slots are held by devices this browser has never seen.</li>
          <li>Clicking <strong>Remove</strong> hands the slot back, so do that before wiping a machine. It does not switch that device off: if the browser is still installed and still holds the key, it keeps Pro and claims a slot again at its next check — unless all five are taken by then.</li>
          <li>Lost a device without releasing it, or stuck at the limit? Email <a href={mailTo("Tvara device support request")} target="_blank" rel="noopener noreferrer">{MAIL}</a> from your purchase address and we will clear every slot on your licence, no questions.</li>
        </Reveal>
        <Reveal className="fineprint" as="p">
          Licence keys issued before this change (they start <code>LCT1.</code>) are unaffected: they
          verify offline on your own machine and have no device limit.
        </Reveal>
      </section>

      <section data-section="If it stops">
        <Reveal className="callout">
          <h2>If it stops working, your chats do not</h2>
          <p>
            A refund, a chargeback, a revoked key, a lapsed device slot — Pro features stop, and your
            archived conversations stay on your device and stay exportable. Exporting your own
            archive has never required a licence and never will.
          </p>
          <div className="cta-row"><a className="btn btn-ghost" href="/refunds">Refund policy</a></div>
        </Reveal>
      </section>
    </>
  );
}
