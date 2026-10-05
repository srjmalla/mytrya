import { Breadcrumbs } from "../components/ui";
import { KathmanduClock } from "../components/Live";
import ContactForm from "../components/ContactForm";
import JsonLd from "../components/JsonLd";
import { AVAILABILITY, PERSON, PRICING, SITE, usd } from "../lib/site";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "Contact: start a project with Mytrya",
  description: `Describe the process you want automated and ${PERSON.name} replies within ${PRICING.replyWithin} with a scoping call or a reason it isn't worth automating. First projects from ${usd(PRICING.firstProjectFrom)}. Email ${SITE.email}.`,
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
      <h1 className="h-display mt-8 max-w-[20ch] text-[40px] sm:text-[56px]">
        Describe the process. I&rsquo;ll tell you if it&rsquo;s worth automating.
      </h1>

      <div className="mt-12 grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_300px]">
        <ContactForm />

        <aside className="self-start">
          <dl className="panel px-4 py-1 font-mono text-[12.5px]">
            <div className="flex justify-between gap-4 border-b border-rule py-2.5"><dt className="text-ink-3">Status</dt><dd>{AVAILABILITY.line}</dd></div>
            <div className="flex justify-between gap-4 border-b border-rule py-2.5"><dt className="text-ink-3">Start</dt><dd>{AVAILABILITY.start.replace(/^Start /, "")}</dd></div>
            <div className="flex justify-between gap-4 border-b border-rule py-2.5"><dt className="text-ink-3">Reply</dt><dd>within {PRICING.replyWithin}</dd></div>
            <div className="flex justify-between gap-4 border-b border-rule py-2.5"><dt className="text-ink-3">Kathmandu</dt><dd><KathmanduClock /> · UTC+5:45</dd></div>
            <div className="flex justify-between gap-4 border-b border-rule py-2.5"><dt className="text-ink-3">First projects</dt><dd>from {usd(PRICING.firstProjectFrom)}</dd></div>
          </dl>
          <p className="meta mt-8">Or write directly</p>
          <a href={`mailto:${SITE.email}`} className="a mt-1 inline-block text-[17px]">{SITE.email}</a>
          {SITE.bookingUrl ? (
            <a href={SITE.bookingUrl} className="btn btn-line mt-6">Book the call</a>
          ) : null}
          <p className="meta mt-8">What happens next</p>
          <ol className="mt-2 space-y-2 text-[16px] leading-snug text-ink-2">
            <li>1. I read it and reply within {PRICING.replyWithin}.</li>
            <li>2. If it looks like a fit, a 30-minute call. Free.</li>
            <li>3. A written spec and a fixed price, or an honest no.</li>
          </ol>
        </aside>
      </div>
    </div>
  );
}
