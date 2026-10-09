import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, Cta } from "../../components/ui";
import JsonLd from "../../components/JsonLd";
import { NOTES, getNote } from "../../lib/notes";
import { WORK } from "../../lib/work";
import { PERSON, SITE } from "../../lib/site";
import { fmtDate } from "../../lib/dates";
import { meta, breadcrumbs } from "../../lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return NOTES.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNote(slug);
  if (!n) return {};
  return meta({ title: n.title, description: n.description, path: `/notes/${n.slug}`, type: "article", published: n.published, updated: n.updated });
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNote(slug);
  if (!n) notFound();
  const related = WORK.filter((w) => n.related.includes(w.slug));
  const others = NOTES.filter((x) => x.slug !== n.slug);
  const words = n.body.join(" ").split(/\s+/).length;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: n.title,
    description: n.description,
    author: { "@type": "Person", "@id": `${SITE.url}/about#person`, name: PERSON.name, url: `${SITE.url}/about` },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: `${SITE.url}/notes/${n.slug}`,
    datePublished: n.published,
    dateModified: n.updated,
    image: `${SITE.url}/opengraph-image`,
    keywords: n.tags.join(", "),
    wordCount: words,
    ...(n.sources?.length ? { citation: n.sources.map((s) => s.url) } : {}),
  };

  return (
    <>
      <article className="wrap pb-16 pt-10">
        <JsonLd data={[breadcrumbs([{ name: "Home", path: "/" }, { name: "Notes", path: "/notes" }, { name: n.title, path: `/notes/${n.slug}` }]), articleLd]} />
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Notes", href: "/notes" }, { name: n.title, href: `/notes/${n.slug}` }]} />

        <div className="mt-8 grid gap-x-10 lg:grid-cols-[200px_minmax(0,1fr)]">
          <aside className="meta mb-6 lg:sticky lg:top-6 lg:mb-0 lg:self-start">
            <p>Note · {n.tags.join(", ")}</p>
            <p className="mt-3">By <Link href="/about" className="a">{PERSON.name}</Link></p>
            <p>Published <time dateTime={n.published}>{fmtDate(n.published)}</time></p>
            {n.updated !== n.published ? <p>Updated <time dateTime={n.updated}>{fmtDate(n.updated)}</time></p> : null}
            <p>{Math.max(1, Math.round(words / 230))} min read</p>
          </aside>
          <div className="min-w-0">
            <h1 className="h-display max-w-[22ch] text-[38px] sm:text-[52px]">{n.title}</h1>
            <div className="prose-note mt-10">
              {n.body.map((p, i) => (p.startsWith("## ") ? <h2 key={i}>{p.slice(3)}</h2> : <p key={i}>{p}</p>))}
            </div>

            {n.table ? (
              <figure className="mt-10 max-w-[760px] overflow-x-auto">
                <table className="tbl min-w-[560px]">
                  <thead><tr>{n.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>{n.table.rows.map((r, i) => <tr key={i}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>)}</tbody>
                </table>
                <figcaption className="meta mt-2">{n.table.caption}</figcaption>
              </figure>
            ) : null}

            {n.sources?.length ? (
              <section className="mt-12 max-w-[66ch]">
                <h2 className="meta">Sources</h2>
                <ol className="mt-2 space-y-1 text-[15px]">
                  {n.sources.map((s) => <li key={s.url}><a href={s.url} className="a" rel="noopener">{s.label}</a></li>)}
                </ol>
              </section>
            ) : null}

            <section className="mt-14 max-w-[760px] border-t border-line-2 pt-6">
              <h2 className="meta">Drawn from</h2>
              <ul className="mt-2">
                {related.map((w) => (
                  <li key={w.slug}><Link href={`/work/${w.slug}`} className="row-link px-1"><span className="row-title h-section text-[19px]">{w.name}: <span className="font-normal text-ink-2">{w.line}</span></span></Link></li>
                ))}
              </ul>
              <h2 className="meta mt-8">More notes</h2>
              <ul className="mt-2 rule-b">
                {others.map((o) => (
                  <li key={o.slug}><Link href={`/notes/${o.slug}`} className="row-link px-1"><span className="row-title h-section text-[19px]">{o.title}</span></Link></li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
      <Cta />
    </>
  );
}
