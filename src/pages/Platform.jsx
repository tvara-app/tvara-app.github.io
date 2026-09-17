import Reveal from "../components/Reveal.jsx";
import Prose from "../components/Prose.jsx";
import { PLATFORMS } from "../platforms.js";
import { ANSWERS } from "../answers.js";
import { STORE_URL } from "../routes.js";

export default function Platform({ item }) {
  const others = PLATFORMS.filter((p) => p.slug !== item.slug);
  const related = item.related.map((s) => ANSWERS.find((a) => a.slug === s)).filter(Boolean);
  return (
    <section data-section={"Tvara for " + item.name}>
      <Reveal><Prose html={item.html} /></Reveal>
      <Reveal className="cta-row">
        <a className="btn btn-primary" data-magnetic href={STORE_URL} rel="noopener">Add to Chrome · free <span className="arrow" aria-hidden="true">→</span></a>
        <a className="btn btn-ghost" href="/features">Every feature, explained</a>
      </Reveal>
      <Reveal className="prose" as="div">
        <h2>Questions about Tvara on {item.name}</h2>
        {item.faq.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </Reveal>
      <Reveal className="legal-more" as="nav" aria-label="Related">
        <span>Also works with:</span>
        {others.map((p) => <a key={p.slug} href={"/" + p.slug}>{p.name}</a>)}
        <span>Read next:</span>
        {related.map((a) => <a key={a.slug} href={"/" + a.slug}>{a.crumb}</a>)}
      </Reveal>
    </section>
  );
}
