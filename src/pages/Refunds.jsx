import Reveal from "../components/Reveal.jsx";
import Prose from "../components/Prose.jsx";
import html from "../content/refunds.html?raw";

const LINKS = [("/privacy", "Privacy"), ("/terms", "Terms")];

export default function Refunds() {
  return (
    <section data-section="Refunds">
      <Reveal><Prose html={html} /></Reveal>
      <Reveal className="legal-more" as="nav" aria-label="Other documents">
        <span>The other documents:</span>
        {LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </Reveal>
    </section>
  );
}
