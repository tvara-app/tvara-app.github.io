import Reveal from "../components/Reveal.jsx";
import SpotlightCard from "../components/SpotlightCard.jsx";
import { ANSWERS } from "../answers.js";

export default function Answers() {
  return (
    <section data-section="Answers">
      <Reveal className="section-head">
        <span className="eyebrow">Answers</span>
        <h1>What goes wrong in long AI chats, and what to do about it</h1>
        <p>Plain explanations of the problems that show up once a conversation gets long — written to be useful whether or not you ever install Tvara.</p>
      </Reveal>
      <Reveal className="grid" stagger>
        {ANSWERS.map((a) => (
          <SpotlightCard key={a.slug}>
            <h3><a href={"/" + a.slug}>{a.crumb}</a></h3>
            <p>{a.desc}</p>
          </SpotlightCard>
        ))}
      </Reveal>
    </section>
  );
}
