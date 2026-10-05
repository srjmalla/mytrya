import Link from "next/link";
import { Breadcrumbs, Cta, Leaf } from "../components/ui";
import JsonLd from "../components/JsonLd";
import { SERVICES, INTEGRATIONS, INTEGRATIONS_NOTE } from "../lib/services";
import { WORK } from "../lib/work";
import { PRICING, usd } from "../lib/site";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "Services: AI support employees, internal tools, automation",
  description: `Three things Mytrya builds for small B2B teams: AI support employees (custom AI support agents) that handle cases end to end, internal tools that compute the numbers, and data pipelines that fail safely. Fixed scope, from ${usd(PRICING.firstProjectFrom)}.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <div className="wrap pb-16 pt-10">
        <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />
        <h1 className="h-display mt-8 max-w-[20ch] text-[44px] sm:text-[60px]">Three kinds of work</h1>
        <p className="mt-6 max-w-[62ch] pb-12 text-[19px] leading-[1.6] text-ink-2">
          Mytrya builds AI support employees, internal tools and data pipelines. Every engagement is fixed scope and fixed
          price, agreed in writing, and delivered into your own repositories and accounts. First projects start at{" "}
          {usd(PRICING.firstProjectFrom)}; most land between {usd(PRICING.typicalLow)} and {usd(PRICING.typicalHigh)}.
        </p>

        {SERVICES.map((s) => (
          <Leaf key={s.slug} label={s.short} note={<p>From {usd(s.priceFrom)}</p>}>
            <h2 className="h-section text-[30px]">
              <Link href={`/services/${s.slug}`} className="hover:text-accent">{s.name}</Link>
            </h2>
            <p className="mt-4 max-w-[64ch] text-[18px] leading-[1.6]">{s.answer[0]}</p>
            <p className="meta mt-4">
              Built and running:{" "}
              {s.proof.map((slug, n) => {
                const w = WORK.find((x) => x.slug === slug);
                return w ? (
                  <span key={slug}>{n ? ", " : ""}<Link href={`/work/${slug}`} className="a">{w.name}</Link></span>
                ) : null;
              })}
            </p>
            <Link href={`/services/${s.slug}`} className="btn btn-line mt-6">What&rsquo;s included <span aria-hidden>&rarr;</span></Link>
          </Leaf>
        ))}

        <Leaf label="Connected so far" note={<p>Evidence, not a menu.</p>}>
          <dl className="max-w-[70ch]">
            {INTEGRATIONS.map((g) => (
              <div key={g.group} className="rule-t grid gap-x-6 py-3 sm:grid-cols-[13rem_minmax(0,1fr)]">
                <dt className="meta">{g.group}</dt>
                <dd className="text-[16px] leading-snug text-ink-2">{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 max-w-[62ch] text-[16px] text-ink-2">{INTEGRATIONS_NOTE}</p>
        </Leaf>
      </div>
      <Cta />
    </>
  );
}
