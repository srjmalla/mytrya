import { Cta, Breadcrumbs, FaqList } from "../components/Sheet";
import JsonLd from "../components/JsonLd";
import { FAQ } from "../lib/faq";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "Frequently asked questions",
  description:
    "What Mytrya does, who it's for, how projects are priced, why one engineer rather than an agency, when to use Intercom Fin or Freshdesk Freddy instead, which models are used, who owns the code, and how to start.",
  path: "/faq",
});

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <JsonLd data={[breadcrumbs([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]), faqLd]} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]} />
      <h1 className="mt-4 max-w-3xl font-serif text-[34px] leading-[1.12] tracking-[-0.015em] sm:text-[44px]">
        Questions people ask before they write
      </h1>
      <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-ink-70">
        {FAQ.length} questions. Each answer is written to stand on its own, so it can be quoted without the rest of the page.
      </p>
      <div className="mt-8">
        <FaqList items={FAQ} as="h2" />
      </div>
      <Cta title="A question that isn't here?" body="Ask it directly. I reply within one working day." />
    </div>
  );
}
