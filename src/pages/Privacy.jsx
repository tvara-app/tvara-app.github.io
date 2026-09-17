import Reveal from "../components/Reveal.jsx";
import Prose from "../components/Prose.jsx";
import html from "../content/privacy.html?raw";

const LINKS = [("/terms", "Terms"), ("/refunds", "Refunds")];

export default function Privacy() {
  return (
    <section data-section="Privacy">
      <Reveal><Prose html={html} /></Reveal>
      <Reveal className="legal-more" as="nav" aria-label="Other documents">
        <span>The other documents:</span>
        {LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </Reveal>
    </section>
  );
}
