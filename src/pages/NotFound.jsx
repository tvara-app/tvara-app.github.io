import { NAV } from "../routes.js";

export default function NotFound() {
  return (
    <section className="notfound">
      <span className="code">HTTP 404</span>
      <h1>That page is not here.</h1>
      <p>
        The site was rebuilt as separate pages, so a link to an old anchor — <code>/#privacy</code>,
        <code> /#faq</code> — may point at a section that now has a page of its own. Everything is one
        of these:
      </p>
      <ul>
        {NAV.map((r) => <li key={r.path}><a href={r.path}>{r.nav}</a> — {r.desc.split(".")[0]}.</li>)}
        <li><a href="/privacy">Privacy</a> — what is stored, and by whom.</li>
        <li><a href="/terms">Terms</a> — the licence, the trial, the devices.</li>
        <li><a href="/refunds">Refunds</a> — 14 days, no questions.</li>
      </ul>
    </section>
  );
}
