import { SheetHead, Cta, Breadcrumbs } from "../components/Sheet";
import { ServiceCard } from "../components/Cards";
import JsonLd from "../components/JsonLd";
import { SERVICES } from "../lib/services";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "Services",
  description:
    "Three things Mytrya builds for small B2B teams: AI support agents that act in your systems, internal tools that compute the numbers, and data pipelines that fail safely. Fixed scope, fixed price.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />
      <h1 className="mt-4 max-w-3xl font-serif text-[34px] leading-[1.12] tracking-[-0.015em] sm:text-[44px]">
        Three kinds of work. Each one has a page that says when it&rsquo;s the wrong choice.
      </h1>
      <div className="prose mt-6">
        <p>
          Mytrya builds AI support agents, internal tools and data pipelines. Every engagement is fixed
          scope and fixed price, agreed in writing before work starts, and delivered into your own
          repositories and cloud accounts.
        </p>
      </div>
      <div className="mt-12">
        <SheetHead label="Services" meta="3" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {SERVICES.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
      </div>
      <Cta />
    </div>
  );
}
