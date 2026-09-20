import { notFound } from "next/navigation";
import { SheetHead, Cta, Breadcrumbs, Diagram } from "../../components/Sheet";
import JsonLd from "../../components/JsonLd";
import { WORK, getWork } from "../../lib/work";
import { PERSON, SITE } from "../../lib/site";
import { meta, breadcrumbs } from "../../lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) return {};
  return meta({ title: `${w.name}: ${w.line}`, description: w.metaDescription, path: `/work/${w.slug}` });
}

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${w.name}: ${w.line}`,
    description: w.summary,
    author: { "@id": `${SITE.url}/about#person` },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: `${SITE.url}/work/${w.slug}`,
    datePublished: "2026-09-20",
    dateModified: "2026-09-20",
    ...(w.image ? { image: `${SITE.url}${w.image.src}` } : {}),
    about: { "@type": "SoftwareApplication", name: w.name, applicationCategory: "BusinessApplication", ...(w.url ? { url: w.url } : {}) },
  };

  return (
    <article className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <JsonLd data={[
        breadcrumbs([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }, { name: w.name, path: `/work/${w.slug}` }]),
        articleLd,
      ]} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work", href: "/work" }, { name: w.name, href: `/work/${w.slug}` }]} />

      <header className="mt-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-45">
          {w.origin} · {w.status} · {w.year}
        </p>
        <h1 className="display mt-2 text-[38px] leading-[1.05] sm:text-[52px]">{w.name}</h1>
        <p className="lead mt-5 max-w-[66ch] text-[19px] leading-[1.5] text-ink">{w.summary}</p>
        {w.url ? (
          <a href={w.url} className="mt-4 inline-block font-mono text-[12px] text-mark underline decoration-1 hover:no-underline">
            {w.url.replace(/^https:\/\//, "")} &#8599;
          </a>
        ) : null}
        <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-45">
          By {PERSON.name} · {SITE.locality}
        </p>
      </header>

      {w.image ? (
        <figure className="frame mt-10">
          <div className="frame-bar">
            <span className="frame-dots" aria-hidden><i /><i /><i /></span>
            <span>{w.url ? w.url.replace(/^https:\/\//, "") : w.name}</span>
            <span aria-hidden className="hidden sm:inline">Screenshot</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={w.image.src} alt={w.image.alt} width={w.image.width} height={w.image.height} loading="lazy" className="block h-auto w-full" />
        </figure>
      ) : null}

      <div className="mt-12 grid gap-y-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-x-14">
        <aside className="border rule-hair bg-paper-2 p-5 lg:sticky lg:top-24 lg:self-start">
          <p className="sheet-label border-b rule-heavy pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink">Facts</p>
          <dl>
            {w.facts.map((f) => (
              <div key={f.k} className="border-b rule-hair py-2.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-45">{f.k}</dt>
                <dd className="mt-1 text-[14px] leading-snug text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="min-w-0">
          <section>
            <SheetHead label="The problem" as="h2" />
            <div className="prose mt-4">{w.problem.map((p, i) => <p key={i}>{p}</p>)}</div>
          </section>

          <section className="mt-12">
            <SheetHead label="How it works" as="h2" />
            <Diagram alt={w.diagram.alt} art={w.diagram.art} />
            <ul className="prose mt-6">{w.built.map((b) => <li key={b}>{b}</li>)}</ul>
          </section>

          {w.ladder ? (
            <figure className="mt-10">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    {w.ladder.head.map((h) => (
                      <th key={h} className="border-b rule-heavy pb-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-45 first:w-[6rem]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {w.ladder.rows.map(([a, b]) => (
                    <tr key={a}>
                      <td className="border-b rule-hair py-2.5 pr-4 align-top font-mono text-[12px] tnum text-mark">{a}</td>
                      <td className="border-b rule-hair py-2.5 align-top text-[15px] leading-snug text-ink-70">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <figcaption className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-45">{w.ladder.caption}</figcaption>
            </figure>
          ) : null}

          <section className="mt-12">
            <SheetHead label="Decisions that mattered" as="h2" meta={`${w.decisions.length}`} />
            {w.decisions.map((d) => (
              <div key={d.heading} className="mt-8">
                <h3 className="font-serif text-[21px] leading-snug text-ink">{d.heading}</h3>
                <div className="prose mt-3">{d.body.map((p, i) => <p key={i}>{p}</p>)}</div>
              </div>
            ))}
          </section>

          <section className="mt-12 border-l-2 border-mark bg-paper-2 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-45">What is and isn&rsquo;t shown</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-70">{w.disclosure}</p>
          </section>
        </div>
      </div>

      <Cta title="Have a system like this in mind?" />
    </article>
  );
}
