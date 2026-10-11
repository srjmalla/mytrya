import { Breadcrumbs } from "../components/ui";
import ContactForm from "../components/ContactForm";
import JsonLd from "../components/JsonLd";
import { AVAILABILITY, PERSON, PRICING, SITE } from "../lib/site";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "Book a call",
  description: `Tell ${PERSON.name} what you'd like taken off your team. A reply within ${PRICING.replyWithin}, and a free 30-minute call if it's a fit. Email ${SITE.email}.`,
  path: "/contact",
});

export default function ContactPage() {
  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE.url}/contact`,
    mainEntity: { "@id": `${SITE.url}/#organization` },
  };
  return (
    <div className="wrap pb-20 pt-10">
      <JsonLd data={[breadcrumbs([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]), contactLd]} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <h1 className="h-display mt-8 max-w-[18ch] text-[40px] sm:text-[56px]">Tell me what you&rsquo;d like off your plate.</h1>

      <div className="mt-12 grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_280px]">
        <ContactForm />

        <aside className="self-start text-[16px] leading-[1.6] text-ink-2">
          <p className="font-semibold text-ink">What happens next</p>
          <ol className="mt-3 space-y-2">
            <li>1. I reply within {PRICING.replyWithin}.</li>
            <li>2. If it looks like a fit, a free 30-minute call.</li>
            <li>3. A written plan and a fixed price, or an honest no.</li>
          </ol>
          <p className="mt-8 font-semibold text-ink">Or write directly</p>
          <a href={`mailto:${SITE.email}`} className="a mt-1 inline-block">{SITE.email}</a>
          {SITE.bookingUrl ? <a href={SITE.bookingUrl} className="btn btn-line mt-6">Book the call</a> : null}
          <p className="meta mt-8">{AVAILABILITY.line} · {AVAILABILITY.start.toLowerCase()}</p>
        </aside>
      </div>
    </div>
  );
}
