/* Each line rises out of its own mask, once, on arrival. */
export default function HeroTitle({ lines }) {
  return (
    <h1 className="hero-title" data-reveal-group>
      {lines.map((l) => <span className="line" key={l}><span>{l}</span></span>)}
    </h1>
  );
}
