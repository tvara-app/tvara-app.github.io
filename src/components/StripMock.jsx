const ROWS = [82, 54, 96, 68, 44, 88, 60, 74];
const TICKS = 34;

/* An abstraction of the product, not a screenshot of it: a conversation, the
   rail Tvara puts beside one, and the thumb travelling through it. */
export default function StripMock() {
  return (
    <div className="mock" data-mock aria-hidden="true">
      <div className="mock-bar">
        <span /><span /><span />
        <em>a 1,500-message conversation</em>
      </div>
      <div className="mock-body">
        <div className="mock-thread">
          {ROWS.map((w, i) => (
            <div className={`mock-row ${i % 3 === 0 ? "mine" : ""}`} key={i}>
              <span style={{ width: w + "%" }} />
              <span style={{ width: w * .62 + "%" }} />
            </div>
          ))}
        </div>
        <div className="mock-rail">
          {Array.from({ length: TICKS }, (_, i) => <i key={i} className={i % 4 === 0 ? "mine" : ""} />)}
          <div className="mock-thumb" />
        </div>
        <div className="mock-peek">
          <b>message 412</b>
          <span>opens from the current reading position</span>
        </div>
      </div>
      <div className="mock-foot"><span className="mock-dot" /> 1,491 of 1,500 asleep</div>
    </div>
  );
}
