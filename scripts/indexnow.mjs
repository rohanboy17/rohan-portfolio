/**
 * Pushes every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver)
 * so new and changed pages get crawled within hours instead of weeks.
 *
 *   npm run indexnow
 *
 * Run it after a deploy that adds or changes pages. The key file in /public proves
 * ownership; IndexNow fetches it from the live site before accepting the URLs.
 */
import { readdirSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://rohanmondal.vercel.app";
const keyFile = readdirSync(join(process.cwd(), "public")).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("No IndexNow key file (32 hex chars + .txt) found in /public");
const key = keyFile.replace(".txt", "");

const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key, keyLocation: `${SITE}/${keyFile}`, urlList }),
});
// 200 = accepted, 202 = accepted (key validation pending); anything else is an error.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (res.status >= 400) console.log(await res.text());
