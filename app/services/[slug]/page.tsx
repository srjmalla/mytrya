import Link from "next/link";
import { notFound } from "next/navigation";
import { SheetHead, Cta, Breadcrumbs, FaqList } from "../../components/Sheet";
import { WorkRow } from "../../components/Cards";
import JsonLd from "../../components/JsonLd";
import { SERVICES, getService } from "../../lib/services";
import { WORK } from "../../lib/work";
import { SITE } from "../../lib/site";
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

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const proof = WORK.filter((w) => s.proof.includes(w.slug));

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
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <JsonLd data={[
        breadcrumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path: `/services/${s.slug}` }]),
        serviceLd,
        faqLd,
      ]} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: s.name, href: `/services/${s.slug}` }]} />

      <h1 className="display mt-4 max-w-3xl text-[36px] leading-[1.1] sm:text-[46px]">{s.name}</h1>
      <div className="prose mt-6">
        {s.answer.map((p, i) => <p key={i} className={i === 0 ? "lead !text-ink" : ""}>{p}</p>)}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/contact" className="btn btn-primary btn-lg">Start a project <span className="arrow" aria-hidden>&rarr;</span></Link>
        <a href="#proof" className="btn btn-ghost">See it built</a>
      </div>

      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <SheetHead label="A good fit when" />
          <ul className="prose mt-2">{s.fit.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
        <div>
          <SheetHead label="Not the right call when" />
          <ul className="prose mt-2">{s.notFit.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
      </section>

      <section className="mt-14">
        <SheetHead label="What gets built" meta={`${s.builds.length} parts`} />
        <ul className="prose mt-2">{s.builds.map((b) => <li key={b}>{b}</li>)}</ul>
      </section>

      <section className="mt-14 grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <SheetHead label="How it's kept safe" />
          <ul className="prose mt-2">{s.safety.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
        <div>
          <SheetHead label="Typical stack" />
          <ul className="prose mt-2">{s.stack.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
      </section>

      <section id="proof" className="mt-14 scroll-mt-8">
        <SheetHead label="Built and running" meta={`${proof.length} case ${proof.length === 1 ? "study" : "studies"}`} />
        <ol className="mt-2 border-b rule-hair">
          {proof.map((w) => (
            <li key={w.slug} className="border-t rule-hair"><WorkRow w={w} /></li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <SheetHead label="Questions about this service" />
        <FaqList items={s.faqs} />
      </section>

      <Cta />
    </article>
  );
}
