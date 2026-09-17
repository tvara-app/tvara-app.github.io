/* Tells Bing, Yandex and the other IndexNow engines that every page in the
   sitemap may have changed. Bing's index is what ChatGPT search and Copilot
   read, so this is not only about Bing. Google does not use IndexNow; its
   route is the sitemap in Search Console. */
import { readFileSync } from "node:fs";

const SITE_URL = (process.env.SITE_URL || "https://tvara.pages.dev").replace(/\/$/, "");
const KEY = "76859f89906bc1642c8dd974b261ef5b";
const urls = [...readFileSync("dist/sitemap.xml", "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE_URL).host, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URLs, HTTP ${res.status}`);
