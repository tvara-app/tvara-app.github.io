import Reveal from "../components/Reveal.jsx";
import { MAIL, mailTo } from "../routes.js";

export default function Thanks() {
  return (
    <section data-section="Purchase activation">
      <Reveal className="section-head">
        <span className="eyebrow">Tvara</span>
        <h1>Payment received</h1>
        <p>Your Pro licence is being activated on the browser profile that opened checkout.</p>
      </Reveal>
      <Reveal className="callout">
        <div id="auto-activate" className="working" role="status" aria-live="polite">Confirming your payment…</div>
        <p>Keep this tab open while activation completes. Your purchase remains recoverable through Google sign-in and Restore my purchase.</p>
      </Reveal>
      <Reveal className="fineprint" as="p">
        If activation does not complete, open Tvara, sign in with the Google account used for purchase, and select Restore my purchase. Contact <a href={mailTo("Tvara Pro support request")} target="_blank" rel="noopener noreferrer">{MAIL}</a> if you need help.
      </Reveal>
    </section>
  );
}
