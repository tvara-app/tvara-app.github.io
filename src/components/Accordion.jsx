/* Server-rendered open/closed state: the first answer is open, the rest are
   collapsed but present in the HTML, so a reader without JavaScript (and a
   crawler) still gets every answer — see the noscript rule in the head. */
export default function Accordion({ items }) {
  return (
    <div className="qa" data-accordion>
      {items.map((it, i) => {
        const open = i === 0;
        return (
          <div className="qa-item" key={it.q} data-open={String(open)}>
            <h3>
              <button type="button" className="qa-btn" aria-expanded={open} aria-controls={`qa-${i}`}>
                {it.q}
                <span className="qa-sign" aria-hidden="true" />
              </button>
            </h3>
            <div className="qa-panel" id={`qa-${i}`} role="region" {...(open ? {} : { inert: true })}>
              <div className="qa-inner"><div>{it.a}</div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
