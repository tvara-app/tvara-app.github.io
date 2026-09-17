import Reveal from "../components/Reveal.jsx";
import Prose from "../components/Prose.jsx";
import html from "../content/terms.html?raw";

const LINKS = [("/privacy", "Privacy"), ("/refunds", "Refunds")];

export default function Terms() {
  return (
    <section data-section="Terms">
      <Reveal><Prose html={html} /></Reveal>
      <Reveal className="legal-more" as="nav" aria-label="Other documents">
        <span>The other documents:</span>
        {LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </Reveal>
    </section>
  );
}
