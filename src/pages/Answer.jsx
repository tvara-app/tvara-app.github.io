import Reveal from "../components/Reveal.jsx";
import Prose from "../components/Prose.jsx";
import { ANSWERS } from "../answers.js";
import { STORE_URL } from "../routes.js";

/* One article. The "more" list is every other answer, so each page links to the
   rest of the library: a reader who arrived from a search for one problem is
   usually one click from the one they actually have. Terms and questions render
   from the same arrays their schema is built from. */
export default function Answer({ item }) {
  const more = ANSWERS.filter((a) => a.slug !== item.slug);
  return (
    <section data-section="Answer">
      <Reveal><Prose html={item.html} /></Reveal>
      {item.terms && (
        <Reveal className="prose" as="div">
          <dl className="terms">
            {item.terms.map((t) => (
              <div key={t.id} id={t.id}>
                <dt>{t.term}</dt>
                <dd>{t.def}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}
      <Reveal className="cta-row">
        <a className="btn btn-primary" data-magnetic href={STORE_URL} rel="noopener">Add Tvara to Chrome · free <span className="arrow" aria-hidden="true">→</span></a>
        <a className="btn btn-ghost" href="/features">What Tvara does</a>
      </Reveal>
      <Reveal className="prose" as="div">
        <h2>Common questions</h2>
        {item.faq.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </Reveal>
      <Reveal className="legal-more" as="nav" aria-label="More answers">
        <span>More answers:</span>
        {more.map((a) => <a key={a.slug} href={"/" + a.slug}>{a.crumb}</a>)}
      </Reveal>
    </section>
  );
}
