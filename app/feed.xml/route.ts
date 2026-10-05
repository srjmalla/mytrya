import { NOTES } from "../lib/notes";
import { ACTIVITY, productName } from "../lib/activity";
import { PERSON, SITE } from "../lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** RSS: notes in full-ish, plus each day's shipped changes as one item. */
export function GET() {
  const notes = NOTES.map((n) => ({
    title: n.title,
    link: `${SITE.url}/notes/${n.slug}`,
    date: new Date(n.published),
    body: n.description,
  }));
  const days = new Map<string, string[]>();
  for (const e of ACTIVITY.log.slice(0, 60)) {
    const d = e.date.slice(0, 10);
    days.set(d, [...(days.get(d) ?? []), `${productName(e.product)}: ${e.message}`]);
  }
  const log = [...days.entries()].map(([d, items]) => ({
    title: `Shipped on ${d}: ${items.length} ${items.length === 1 ? "change" : "changes"}`,
    link: `${SITE.url}/log`,
    date: new Date(`${d}T12:00:00Z`),
    body: items.join(" · "),
  }));
  const items = [...notes, ...log].sort((a, b) => +b.date - +a.date);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${esc(SITE.name)}: notes and build log</title>
<link>${SITE.url}</link>
<description>${esc(`Notes and shipped changes from ${PERSON.name}, AI engineer.`)}</description>
<language>en</language>
<lastBuildDate>${new Date(ACTIVITY.generatedAt).toUTCString()}</lastBuildDate>
${items
  .map(
    (i) => `<item><title>${esc(i.title)}</title><link>${i.link}</link><guid isPermaLink="false">${esc(i.link + "#" + i.date.toISOString())}</guid><pubDate>${i.date.toUTCString()}</pubDate><description>${esc(i.body)}</description></item>`,
  )
  .join("\n")}
</channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
