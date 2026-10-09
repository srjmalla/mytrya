import { NOTES } from "../lib/notes";
import { PERSON, SITE } from "../lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** RSS of the notes, newest first. */
export function GET() {
  const items = NOTES.map((n) => ({
    title: n.title,
    link: `${SITE.url}/notes/${n.slug}`,
    date: new Date(n.published),
    body: n.description,
  })).sort((a, b) => +b.date - +a.date);
  const newest = items[0]?.date ?? new Date();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${esc(SITE.name)}: notes</title>
<link>${SITE.url}</link>
<description>${esc(`Notes from ${PERSON.name}, AI engineer.`)}</description>
<language>en</language>
<lastBuildDate>${newest.toUTCString()}</lastBuildDate>
${items
  .map(
    (i) => `<item><title>${esc(i.title)}</title><link>${i.link}</link><guid isPermaLink="true">${i.link}</guid><pubDate>${i.date.toUTCString()}</pubDate><description>${esc(i.body)}</description></item>`,
  )
  .join("\n")}
</channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
