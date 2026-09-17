import { NAV, STORE_URL } from "../routes.js";

/* The underline is one element the script moves between links, so the bar reads
   as one object changing state rather than five that light up separately. */
export default function Header({ path, crumb }) {
  return (
    <header>
      <div className="brand-row">
        <a className="brand" href="/">
          <img className="mark" src="/logo.png" width="26" height="26" alt="" decoding="async" />
          <span className="brand-name">Tvara</span>
        </a>
        {crumb && (
          <span className="crumb">
            <span className="sep" aria-hidden="true">/</span>
            <span aria-current="page">{crumb}</span>
          </span>
        )}
      </div>
      <nav aria-label="Primary">
        {NAV.map((r) => (
          <a key={r.path} href={r.path} aria-current={r.path === path ? "page" : undefined}>{r.nav}</a>
        ))}
        <span className="nav-ink" aria-hidden="true" />
        <a className="nav-cta" href={STORE_URL} rel="noopener">Add to Chrome</a>
      </nav>
    </header>
  );
}
