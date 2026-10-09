import { Breadcrumbs, Cta, FaqList } from "../components/ui";
import JsonLd from "../components/JsonLd";
import { FAQ } from "../lib/faq";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "Questions about hiring Mytrya: price, process, AI employees",
  description:
    "What Mytrya does, who it's for, what projects cost, why one engineer rather than an agency, when to use Intercom Fin or Freshdesk Freddy instead, which models are used, who owns the code, and how to start.",
  path: "/faq",
});

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <div className="wrap pb-16 pt-10">
        <JsonLd data={[breadcrumbs([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]), faqLd]} />
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]} />
        <h1 className="h-display mt-8 max-w-[20ch] text-[44px] sm:text-[60px]">Questions people ask before they write</h1>
        <p className="mt-6 max-w-[60ch] pb-10 text-[19px] leading-[1.6] text-ink-2">
          Each answer is written to stand on its own, so it can be quoted without the rest of the page.
        </p>
        <div className="max-w-[820px]">
          <FaqList items={FAQ} as="h2" />
        </div>
      </div>
      <Cta title="A question that isn't here?" />
    </>
  );
}
