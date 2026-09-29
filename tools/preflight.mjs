/* Refuses a deploy whose canonicals name a host that does not answer. A dead
   canonical host drops every page from the index with no error anywhere. */
import { readFileSync } from "node:fs";

const origin = new URL(readFileSync("dist/sitemap.xml", "utf8").match(/<loc>([^<]+)<\/loc>/)[1]).origin;
const res = await fetch(origin + "/robots.txt", { method: "HEAD" }).catch(() => null);
if (!res) {
  console.error(`${origin} does not answer. ORIGIN in src/routes.js must name a live host (npm run domain).`);
  process.exit(1);
}
console.log(`origin ${origin}: HTTP ${res.status}`);
