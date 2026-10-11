import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, Cta, Leaf, StatusDot, workUp } from "../../components/ui";
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

  const next = WORK[(WORK.indexOf(w) + 1) % WORK.length];

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

        <header className="pb-12 pt-8">
          <p className="meta flex flex-wrap items-center gap-x-4 gap-y-1">
            <StatusDot up={workUp(w.status)} label={w.status} />
            <span>{w.origin}</span>
            <span>{w.year}</span>
          </p>
          <h1 className="h-display mt-4 text-[44px] sm:text-[60px]">{w.name}</h1>
          <p className="mt-6 max-w-[62ch] text-[19px] leading-[1.65] text-ink-2">{w.summary}</p>
          {w.url ? (
            <a href={w.url} className="btn btn-ink mt-8">Open {w.name} ↗</a>
          ) : null}
        </header>

        {w.image ? (
          <figure className="mb-12 overflow-hidden rounded-[20px] border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={w.image.src} alt={w.image.alt} width={w.image.width} height={w.image.height} loading="lazy" className="block h-auto w-full" />
          </figure>
        ) : null}

        <Leaf label="The problem">
          <div className="prose-note">{w.problem.map((p, n) => <p key={n}>{p}</p>)}</div>
        </Leaf>
        <Leaf label="What it does">
          <ul className="prose-note">{w.does.map((d) => <li key={d}>{d}</li>)}</ul>
        </Leaf>
        <Leaf label="Where it stands">
          <p className="prose-note">{w.now}</p>
        </Leaf>

        <nav className="rule-t pt-8" aria-label="Next">
          <Link href={`/work/${next.slug}`} className="group block">
            <span className="meta">Next</span>
            <span className="h-section mt-1 block text-[22px] transition-colors group-hover:text-sun-ink">{next.name}</span>
          </Link>
        </nav>
      </article>
      <Cta title="Something like this in mind?" />
    </>
  );
}
