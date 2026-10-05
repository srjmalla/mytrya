// Builds app/data/activity.json: a shipping log from my own products' commits and a
// live check of each product. Runs before every build (npm "prebuild"), locally and in
// the daily GitHub Action, so the site changes as the work does.
//
// Needs a GitHub token that can read the product repos: GITHUB_TOKEN / ACTIVITY_TOKEN,
// or a logged-in `gh`. Without one it keeps the committed snapshot, so a build never fails
// for lack of a token. Client repos are never read.

import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";

const OUT = new URL("../app/data/activity.json", import.meta.url);

const PRODUCTS = [
  { id: "narrately", name: "Narrately", repo: "srjmalla/narrately", url: "https://narrately.mytrya.com", work: "narrately" },
  { id: "offscript", name: "offScript", repo: "srjmalla/offscript", url: "https://offscript.mytrya.com", work: "offscript" },
  { id: "nepse", name: "NEPSE Copilot", repo: "srjmalla/suraj-nepse", url: "https://nepse.mytrya.com", work: "nepse-copilot" },
];

// Commits that are plumbing, or that talk about credentials, stay out of a public log.
const SKIP = /\b(merge|trigger deployment|password|secret|token|credential|security|api key|env var|dns|typo|wip|bump)\b/i;

function token() {
  const env = process.env.ACTIVITY_TOKEN || process.env.GITHUB_TOKEN;
  if (env) return env;
  try {
    return execSync("gh auth token", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
}

async function gh(path, auth) {
  const res = await fetch(`https://api.github.com/${path}`, {
    headers: { Authorization: `Bearer ${auth}`, Accept: "application/vnd.github+json", "User-Agent": "mytrya-site" },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${path}`);
  return res.json();
}

async function commits(repo, auth) {
  const out = [];
  for (let page = 1; page <= 3; page++) {
    const batch = await gh(`repos/${repo}/commits?per_page=100&page=${page}`, auth);
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

/** First line only, cut at a semicolon, at most 120 characters. */
function tidy(message) {
  let line = message.split("\n")[0].trim();
  line = line.split("; ")[0];
  if (line.length > 120) line = `${line.slice(0, 117).replace(/\s+\S*$/, "")}…`;
  return line;
}

async function check(url) {
  const started = Date.now();
  try {
    // Signed-in products answer with a redirect to sign-in; that still means "up".
    const res = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(10_000) });
    return { up: res.status < 400, code: res.status, ms: Date.now() - started };
  } catch {
    return { up: false, code: 0, ms: Date.now() - started };
  }
}

/** ISO week key, e.g. 2026-W40. */
function week(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const start = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return `${d.getUTCFullYear()}-W${String(Math.ceil(((d - start) / 86400000 + 1) / 7)).padStart(2, "0")}`;
}

/** Consecutive weeks with at least one shipped change, counting back from this week (or last). */
function streak(dates) {
  const weeks = new Set(dates.map((d) => week(new Date(d))));
  const cursor = new Date();
  if (!weeks.has(week(cursor))) cursor.setUTCDate(cursor.getUTCDate() - 7);
  let n = 0;
  while (weeks.has(week(cursor))) {
    n++;
    cursor.setUTCDate(cursor.getUTCDate() - 7);
  }
  return n;
}

async function main() {
  const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : null;
  const auth = token();

  const status = await Promise.all(PRODUCTS.map((p) => check(p.url)));

  if (!auth) {
    console.warn("[activity] no GitHub token; keeping the committed log, refreshing status only");
    if (previous) {
      previous.products = previous.products.map((p, i) => ({ ...p, status: status[i] }));
      previous.checkedAt = new Date().toISOString();
      writeFileSync(OUT, JSON.stringify(previous, null, 2) + "\n");
    }
    return;
  }

  const log = [];
  const products = [];
  for (const [i, p] of PRODUCTS.entries()) {
    let list = [];
    try {
      list = await commits(p.repo, auth);
    } catch (err) {
      console.warn(`[activity] ${p.repo}: ${err.message}`);
      const old = previous?.products.find((x) => x.id === p.id);
      products.push({ ...(old ?? p), status: status[i] });
      log.push(...(previous?.log.filter((e) => e.product === p.id) ?? []));
      continue;
    }
    const entries = list
      .filter((c) => c.parents?.length < 2)
      .map((c) => ({ date: c.commit.author.date, product: p.id, message: tidy(c.commit.message) }))
      .filter((e) => !SKIP.test(e.message));
    log.push(...entries);
    products.push({
      id: p.id,
      name: p.name,
      url: p.url,
      work: p.work,
      lastShipped: entries[0]?.date ?? null,
      changes30d: entries.filter((e) => Date.now() - new Date(e.date) < 30 * 86400000).length,
      status: status[i],
    });
  }

  log.sort((a, b) => b.date.localeCompare(a.date));
  const data = {
    generatedAt: new Date().toISOString(),
    checkedAt: new Date().toISOString(),
    streakWeeks: streak(log.map((e) => e.date)),
    changes30d: log.filter((e) => Date.now() - new Date(e.date) < 30 * 86400000).length,
    products,
    // The newest 150 overall, plus each product's newest 15, so a quiet product isn't crowded out.
    log: log.filter((e, i) => i < 150 || log.filter((x) => x.product === e.product).indexOf(e) < 15),
  };
  mkdirSync(new URL("../app/data/", import.meta.url), { recursive: true });
  writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`[activity] ${data.log.length} entries, ${data.streakWeeks}-week streak, ${data.changes30d} changes in 30 days`);
}

main().catch((err) => {
  // The site must still build; the committed snapshot stands in.
  console.warn(`[activity] ${err.message}; keeping the committed snapshot`);
});
