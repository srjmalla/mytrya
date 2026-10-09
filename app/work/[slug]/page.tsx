import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkVisual } from "../../components/Visuals";
import { Ascii, Breadcrumbs, Cta, StatusDot, workUp } from "../../components/ui";
import JsonLd from "../../components/JsonLd";
import { WORK, getWork } from "../../lib/work";
import { SERVICES } from "../../lib/services";
import { NOTES } from "../../lib/notes";
import { PERSON, SITE } from "../../lib/site";
import { fmtDate } from "../../lib/dates";
import { meta, breadcrumbs } from "../../lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) return {};
  return meta({
    title: w.seoTitle,
    description: w.metaDescription,
    path: `/work/${w.slug}`,
    type: "article",
    published: w.published,
    updated: w.updated,
  });
}

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();

  const i = WORK.indexOf(w);
  const next = WORK[(i + 1) % WORK.length];
  const service = SERVICES.find((s) => s.slug === w.service);
  const notes = NOTES.filter((n) => n.related.includes(w.slug));

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${w.name}: ${w.line}`.slice(0, 110),
    description: w.summary,
    author: { "@type": "Person", "@id": `${SITE.url}/about#person`, name: PERSON.name, url: `${SITE.url}/about` },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: `${SITE.url}/work/${w.slug}`,
    datePublished: w.published,
    dateModified: w.updated,
    image: w.image ? `${SITE.url}${w.image.src}` : `${SITE.url}/opengraph-image`,
    about: {
      "@type": "SoftwareApplication",
      name: w.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      ...(w.url ? { url: w.url } : {}),
    },
  };

  return (
    <>
      <article className="wrap pb-16 pt-10">
        <JsonLd
          data={[
            breadcrumbs([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }, { name: w.name, path: `/work/${w.slug}` }]),
            articleLd,
          ]}
        />
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work", href: "/work" }, { name: w.name, href: `/work/${w.slug}` }]} />

        <header className="mt-8 grid gap-10 pb-12 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <p className="meta">
              Case file · {w.origin} · {w.year}
            </p>
            <h1 className="h-display mt-3 text-[44px] sm:text-[60px]">{w.name}</h1>
            <p className="mt-4 max-w-[40ch] font-sans text-[21px] leading-[1.35] text-ink-2">{w.line}.</p>
            <p className="mt-8 max-w-[66ch] text-[19px] leading-[1.65]">{w.summary}</p>
          </div>
          <div className="flex flex-col gap-4 self-start">
          <WorkVisual slug={w.slug} />
          <dl className="panel px-4 py-1 font-mono text-[12.5px]">
            <div className="flex justify-between gap-4 border-b border-rule py-2.5">
              <dt className="text-ink-3">Status</dt>
              <dd><StatusDot up={workUp(w.status)} label={w.status} /></dd>
            </div>
            {w.url ? (
              <div className="flex justify-between gap-4 border-b border-rule py-2.5">
                <dt className="text-ink-3">Open it</dt>
                <dd><a href={w.url} className="a">{w.url.replace("https://", "")} ↗</a></dd>
              </div>
            ) : null}
            <div className="flex justify-between gap-4 border-b border-rule py-2.5">
              <dt className="text-ink-3">Written by</dt>
              <dd><Link href="/about" className="a">{PERSON.name}</Link></dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-rule py-2.5">
              <dt className="text-ink-3">Updated</dt>
              <dd><time dateTime={w.updated}>{fmtDate(w.updated)}</time></dd>
            </div>
            <div className="py-2.5">
              <dt className="text-ink-3">Stack</dt>
              <dd className="mt-1 leading-relaxed text-ink-2">{w.stack}</dd>
            </div>
          </dl>
          </div>
        </header>

        {w.image ? (
          <figure className="mb-12 border border-rule">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={w.image.src} alt={w.image.alt} width={w.image.width} height={w.image.height} loading="lazy" className="block h-auto w-full" />
          </figure>
        ) : null}

        <section className="leaf" aria-labelledby="facts-h">
          <div className="leaf-label"><h2 id="facts-h" className="kicker">Facts</h2></div>
          <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {w.facts.map((f) => (
              <div key={f.k} className="bg-paper p-4">
                <dt className="font-mono text-[12.5px] text-ink-3">{f.k}</dt>
                <dd className="mt-1 text-[16px] leading-snug">{f.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="leaf" aria-labelledby="problem-h">
          <div className="leaf-label"><h2 id="problem-h" className="kicker">The problem</h2></div>
          <div className="prose-note">{w.problem.map((p, n) => <p key={n}>{p}</p>)}</div>
        </section>

        <section className="leaf" aria-labelledby="how-h">
          <div className="leaf-label"><h2 id="how-h" className="kicker">How it works</h2></div>
          <div className="min-w-0">
            <Ascii alt={w.diagram.alt} art={w.diagram.art} caption="Data flow, as built" />
            <ul className="prose-note mt-8">{w.built.map((b) => <li key={b}>{b}</li>)}</ul>
            {w.ladder ? (
              <figure className="mt-10 max-w-[66ch]">
                <table className="tbl">
                  <thead><tr>{w.ladder.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {w.ladder.rows.map(([a, b]) => (
                      <tr key={a}><td className="whitespace-nowrap font-mono text-[13px] !text-accent">{a}</td><td>{b}</td></tr>
                    ))}
                  </tbody>
                </table>
                <figcaption className="meta mt-2">{w.ladder.caption}</figcaption>
              </figure>
            ) : null}
          </div>
        </section>

        <section className="leaf" aria-labelledby="decisions-h">
          <div className="leaf-label">
            <h2 id="decisions-h" className="kicker">Decisions that mattered</h2>
            <p className="mt-1">{w.decisions.length}</p>
          </div>
          <div>
            {w.decisions.map((d, n) => (
              <div key={d.heading} className={n ? "mt-12" : ""}>
                <h3 className="h-section max-w-[34ch] text-[24px]">{d.heading}</h3>
                <div className="prose-note mt-4">{d.body.map((p, k) => <p key={k}>{p}</p>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="leaf" aria-labelledby="shown-h">
          <div className="leaf-label"><h2 id="shown-h" className="kicker">What isn&rsquo;t shown</h2></div>
          <p className="max-w-[66ch] text-[17px] leading-[1.6] text-ink-2">{w.disclosure}</p>
        </section>

        <nav className="leaf" aria-label="Related">
          <div className="leaf-label"><p className="kicker">Related</p></div>
          <ul className="rule-b">
            {service ? (
              <li>
                <Link href={`/services/${service.slug}`} className="row-link gap-x-6 px-1 sm:grid-cols-[9rem_minmax(0,1fr)]">
                  <span className="meta pt-1">Service</span>
                  <span className="row-title h-section text-[19px]">{service.name}, from ${service.priceFrom.toLocaleString("en-US")}</span>
                </Link>
              </li>
            ) : null}
            {notes.map((n) => (
              <li key={n.slug}>
                <Link href={`/notes/${n.slug}`} className="row-link gap-x-6 px-1 sm:grid-cols-[9rem_minmax(0,1fr)]">
                  <span className="meta pt-1">Note</span>
                  <span className="row-title h-section text-[19px]">{n.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/work/${next.slug}`} className="row-link gap-x-6 px-1 sm:grid-cols-[9rem_minmax(0,1fr)]">
                <span className="meta pt-1">Next case file</span>
                <span className="row-title h-section text-[19px]">{next.name}: <span className="font-normal text-ink-2">{next.line}</span></span>
              </Link>
            </li>
          </ul>
        </nav>
      </article>
      <Cta title="Have a system like this in mind?" />
    </>
  );
}
