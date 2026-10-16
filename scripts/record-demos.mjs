/**
 * Records a short scrolling demo video + poster screenshot of every project
 * that has a liveUrl in src/content/profile.ts.
 *
 *   npm run record:demos            # all projects
 *   npm run record:demos -- toyco-india game-arena   # only these slugs
 *
 * Needs Playwright's Chromium (`npx playwright install chromium`) and ffmpeg on PATH.
 * Output: public/projects/<slug>.jpg, public/videos/<slug>.mp4, src/content/demo-media.json
 */
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const VIEWPORT = { width: 1280, height: 800 };
const SECONDS = 9;

function readProjects() {
  const src = readFileSync(join(root, "src/content/profile.ts"), "utf8");
  // Each project block starts at `slug:`; read its liveUrl from within the same block.
  return src
    .split(/\n\s+slug: "/)
    .slice(1)
    .map((chunk) => ({
      slug: chunk.slice(0, chunk.indexOf('"')),
      liveUrl: chunk.match(/liveUrl: "([^"]+)"/)?.[1],
    }))
    .filter((p) => p.liveUrl);
}

/** Close install prompts, cookie banners and newsletter modals so they don't cover the demo. */
async function dismissPopups(page) {
  const labels = /^(not now|no thanks|close|dismiss|got it|accept( all)?|maybe later|skip|×|✕)$/i;
  for (let pass = 0; pass < 2; pass++) {
    const buttons = page.getByRole("button", { name: labels });
    const count = await buttons.count().catch(() => 0);
    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click({ timeout: 1000 }).catch(() => {});
    }
    await page.keyboard.press("Escape").catch(() => {});
    await page.waitForTimeout(400);
  }
}

async function record(browser, { slug, liveUrl }) {
  const tmp = join(root, ".demo-tmp", slug);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    recordVideo: { dir: tmp, size: VIEWPORT },
  });
  const page = await context.newPage();
  const started = Date.now();
  await page.goto(liveUrl, { waitUntil: "networkidle", timeout: 60_000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await dismissPopups(page);
  const loadedAt = (Date.now() - started) / 1000;

  await page.screenshot({ path: join(root, "public/projects", `${slug}.jpg`), type: "jpeg", quality: 78 });

  // Slow, smooth scroll down the page and back up a little.
  await page.evaluate(async (seconds) => {
    const max = Math.min(document.documentElement.scrollHeight - innerHeight, innerHeight * 4);
    const steps = seconds * 30;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      window.scrollTo(0, max * eased);
      await new Promise((r) => setTimeout(r, 1000 / 30));
    }
  }, SECONDS - 1);
  await page.waitForTimeout(600);

  const video = page.video();
  await context.close();
  const webm = await video.path();

  const out = join(root, "public/videos", `${slug}.mp4`);
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error",
    "-ss", String(loadedAt + 1.2),
    "-i", webm,
    "-t", String(SECONDS),
    "-an",
    "-vf", "scale=960:-2,fps=30",
    "-c:v", "libx264", "-preset", "slow", "-crf", "30", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    out,
  ]);
  rmSync(tmp, { recursive: true, force: true });
  return { poster: `/projects/${slug}.jpg`, video: `/videos/${slug}.mp4` };
}

const only = process.argv.slice(2);
const projects = readProjects().filter((p) => !only.length || only.includes(p.slug));
mkdirSync(join(root, "public/projects"), { recursive: true });
mkdirSync(join(root, "public/videos"), { recursive: true });

const manifestPath = join(root, "src/content/demo-media.json");
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};

const browser = await chromium.launch();
for (const p of projects) {
  process.stdout.write(`● ${p.slug} … `);
  try {
    manifest[p.slug] = await record(browser, p);
    console.log("done");
  } catch (err) {
    console.log(`failed: ${err.message}`);
  }
}
await browser.close();
rmSync(join(root, ".demo-tmp"), { recursive: true, force: true });

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nWrote ${Object.keys(manifest).length} entries to src/content/demo-media.json`);
