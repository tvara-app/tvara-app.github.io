/* The cutover to a real domain, in one command:
 *
 *     node tools/attach-domain.mjs tvara.app
 *
 * It refuses to start unless the zone is on this account, because everything
 * after that point assumes it. Then it attaches the domain to the Pages
 * project, points the apex at it and waits until it answers. It deploys only
 * when ORIGIN in src/routes.js already names the domain: canonicals must never
 * point at a host that does not answer yet.
 *
 * The site stays on Cloudflare Pages: static assets from the edge, no Worker
 * invocation, nothing metered. Response headers come from dist/_headers.
 */
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { execSync } from "node:child_process";

const DOMAIN = process.argv[2] || "tvara.app";
const PROJECT = "tvara";
const run = (cmd) => execSync(cmd, { stdio: "inherit" });

const cfg = readFileSync(join(homedir(), "Library/Preferences/.wrangler/config/default.toml"), "utf8");
const token = cfg.match(/^oauth_token\s*=\s*"([^"]+)"/m)?.[1];
if (!token) throw new Error("No wrangler token — run `npx wrangler login` first.");

const api = async (path, init = {}) => (await fetch("https://api.cloudflare.com/client/v4" + path, {
  ...init, headers: { authorization: `Bearer ${token}`, "content-type": "application/json", ...init.headers },
})).json();

const accounts = await api("/accounts");
const account = accounts.result?.[0];
if (!account) throw new Error("No Cloudflare account on this token. It may have expired: npx wrangler login.");
const zone = (await api(`/zones?name=${DOMAIN}`)).result?.[0];
if (!zone) {
  console.error(`${DOMAIN} is not a zone in ${account.name}.`);
  console.error("Add the site to this account first — a domain can only be active in one Cloudflare account.");
  console.error("Export its DNS records before removing it from the old one: MX, SPF, DKIM and DMARC carry your licence mail.");
  process.exit(1);
}
console.log(`zone ${DOMAIN}: ${zone.status}`);

const base = `/accounts/${account.id}/pages/projects/${PROJECT}`;
const attached = (await api(`${base}/domains`)).result ?? [];
if (!attached.some((d) => d.name === DOMAIN)) {
  const add = await api(`${base}/domains`, { method: "POST", body: JSON.stringify({ name: DOMAIN }) });
  if (!add.success) throw new Error("attach failed: " + JSON.stringify(add.errors));
  console.log(`${DOMAIN} attached to Pages project ${PROJECT}`);
}

/* Apex CNAME, flattened by Cloudflare at the edge. Pages usually writes this
 * itself; do it by hand when it has not, so the cutover never half-lands. */
const records = (await api(`/zones/${zone.id}/dns_records?name=${DOMAIN}`)).result ?? [];
const apex = records.find((r) => r.type === "CNAME" || r.type === "A");
if (!apex) {
  const dns = await api(`/zones/${zone.id}/dns_records`, {
    method: "POST",
    body: JSON.stringify({ type: "CNAME", name: DOMAIN, content: `${PROJECT}.pages.dev`, proxied: true }),
  });
  console.log(dns.success ? `apex CNAME ${DOMAIN} -> ${PROJECT}.pages.dev` : "apex record not written: " + JSON.stringify(dns.errors));
} else {
  console.log(`apex already ${apex.type} -> ${apex.content}`);
}

// Certificate issuance takes minutes.
let res = null;
for (let i = 0; i < 40 && !res?.ok; i++) {
  res = await fetch(`https://${DOMAIN}/robots.txt`).catch(() => null);
  if (!res?.ok) await new Promise((r) => setTimeout(r, 15000));
}
if (!res?.ok) throw new Error(`https://${DOMAIN} still not answering after 10 minutes; rerun later.`);

const origin = readFileSync("src/routes.js", "utf8").match(/ORIGIN = "([^"]+)"/)[1];
if (origin === `https://${DOMAIN}`) run("npm run deploy");
else console.log(`${DOMAIN} answers. Set ORIGIN in src/routes.js to https://${DOMAIN}, then npm run deploy.`);
