import { MAIL, mailTo } from "../routes.js";

export default function Footer() {
  return (
    <footer>
      <div className="foot-row">
        <span>Tvara · {new Date().getFullYear()}</span>
        <span className="foot-links">
          <a href="/features">Features</a>
          <a href="/guide">Guide</a>
          <a href="/faq">FAQ</a>
          <a href="/answers">Answers</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/refunds">Refunds</a>
          <a href={mailTo()} target="_blank" rel="noopener noreferrer">{MAIL}</a>
        </span>
      </div>
      <p className="foot-note">
        An independent product. Not affiliated with or endorsed by OpenAI, Anthropic, Google,
        Perplexity, DeepSeek or xAI. All product names belong to their owners.
      </p>
    </footer>
  );
}
