import { Breadcrumbs, Cta, FaqList } from "../components/ui";
import JsonLd from "../components/JsonLd";
import { FAQ } from "../lib/faq";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "Questions",
  description:
    "What Mytrya Intelligence does, what an AI employee is, whether you need one, who it's for, how mistakes are kept out, what it costs, who owns it, and how to start.",
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
        <h1 className="h-display mt-8 pb-10 text-[44px] sm:text-[60px]">Questions</h1>
        <div className="max-w-[820px]">
          <FaqList items={FAQ} as="h2" />
        </div>
      </div>
      <Cta title="A question that isn't here?" />
    </>
  );
}
