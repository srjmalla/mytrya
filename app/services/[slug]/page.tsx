import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, Cta, FaqList, Leaf, StatusDot, workUp } from "../../components/ui";
import JsonLd from "../../components/JsonLd";
import { SERVICES, getService } from "../../lib/services";
import { WORK } from "../../lib/work";
import { NOTES } from "../../lib/notes";
import { PERSON, PRICING, SITE, usd } from "../../lib/site";
import { fmtDate } from "../../lib/dates";
import { meta, breadcrumbs } from "../../lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return meta({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}` });
}

function List({ items }: { items: string[] }) {
  return <ul className="prose-note">{items.map((b) => <li key={b}>{b}</li>)}</ul>;
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const proof = WORK.filter((w) => s.proof.includes(w.slug));
  const notes = NOTES.filter((n) => n.related.some((r) => s.proof.includes(r)));

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}/services/${s.slug}#service`,
    name: s.name,
    description: s.answer[0],
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: "Worldwide",
    serviceType: s.name,
    url: `${SITE.url}/services/${s.slug}`,
    audience: { "@type": "BusinessAudience", name: "Small B2B software and service companies, 5 to 200 people" },
    offers: {
      "@type": "Offer",
      priceSpecification: { "@type": "PriceSpecification", minPrice: s.priceFrom, priceCurrency: "USD" },
      description: "Fixed price, agreed in writing after a free scoping call",
    },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <article className="wrap pb-16 pt-10">
        <JsonLd
          data={[
            breadcrumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path: `/services/${s.slug}` }]),
            serviceLd,
            faqLd,
          ]}
        />
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: s.name, href: `/services/${s.slug}` }]} />

        <header className="mt-8 grid gap-10 pb-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <p className="meta">Service</p>
            <h1 className="h-display mt-3 max-w-[18ch] text-[44px] sm:text-[60px]">{s.name}</h1>
            <div className="mt-8 max-w-[64ch] space-y-4 text-[19px] leading-[1.65]">
              {s.answer.map((p, i) => <p key={i} className={i ? "text-ink-2" : ""}>{p}</p>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-ink">Start a project <span aria-hidden>&rarr;</span></Link>
              <a href="#proof" className="btn btn-line">See it built</a>
            </div>
          </div>
          <dl className="self-start panel px-4 py-1 font-mono text-[12.5px]">
            <div className="flex justify-between gap-4 border-b border-rule py-2.5"><dt className="text-ink-3">From</dt><dd>{usd(s.priceFrom)}, fixed</dd></div>
            <div className="flex justify-between gap-4 border-b border-rule py-2.5"><dt className="text-ink-3">Typical</dt><dd>{usd(PRICING.typicalLow)}–{usd(PRICING.typicalHigh)}</dd></div>
            <div className="flex justify-between gap-4 border-b border-rule py-2.5"><dt className="text-ink-3">Reply</dt><dd>within {PRICING.replyWithin}</dd></div>
            <div className="flex justify-between gap-4 border-b border-rule py-2.5"><dt className="text-ink-3">Built by</dt><dd><Link href="/about" className="a">{PERSON.name}</Link></dd></div>
            <div className="flex justify-between gap-4 py-2.5"><dt className="text-ink-3">Updated</dt><dd>{fmtDate(s.updated)}</dd></div>
          </dl>
        </header>

        <Leaf label="A good fit when"><List items={s.fit} /></Leaf>
        <Leaf label="Not the right call when"><List items={s.notFit} /></Leaf>
        <Leaf label="What gets built" note={<p>{s.builds.length} parts</p>}><List items={s.builds} /></Leaf>
        <Leaf label="How it's kept safe"><List items={s.safety} /></Leaf>
        <Leaf label="Typical stack"><List items={s.stack} /></Leaf>

        <section id="proof" className="leaf scroll-mt-8" aria-labelledby="proof-h">
          <div className="leaf-label"><h2 id="proof-h" className="kicker">Built and running</h2></div>
          <ol className="rule-b">
            {proof.map((w) => (
              <li key={w.slug}>
                <Link href={`/work/${w.slug}`} className="row-link gap-x-6 gap-y-1 px-1 md:grid-cols-[minmax(0,1fr)_10rem]">
                  <span>
                    <span className="row-title h-section text-[21px]">{w.name}</span>
                    <span className="mt-1 block text-[16.5px] leading-snug text-ink-2">{w.line}</span>
                  </span>
                  <span className="meta md:text-right"><StatusDot up={workUp(w.status)} label={w.status} /></span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {notes.length ? (
          <Leaf label="Further reading">
            <ul className="rule-b">
              {notes.map((n) => (
                <li key={n.slug}>
                  <Link href={`/notes/${n.slug}`} className="row-link px-1">
                    <span className="row-title h-section text-[19px]">{n.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Leaf>
        ) : null}

        <Leaf label="Questions about this">
          <FaqList items={s.faqs} />
        </Leaf>
      </article>
      <Cta />
    </>
  );
}
