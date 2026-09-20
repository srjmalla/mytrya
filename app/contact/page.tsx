import { Breadcrumbs, SheetHead } from "../components/Sheet";
import ContactForm from "../components/ContactForm";
import JsonLd from "../components/JsonLd";
import { PERSON, SITE } from "../lib/site";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "Contact",
  description: `Describe the process you want automated and ${PERSON.name} replies within one working day with a scoping call or a reason it isn't worth automating. Email ${SITE.email}.`,
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
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <JsonLd data={[breadcrumbs([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]), contactLd]} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <h1 className="display mt-4 max-w-3xl text-[36px] leading-[1.1] sm:text-[46px]">
        Describe the process. I&rsquo;ll tell you if it&rsquo;s worth automating.
      </h1>

      <div className="mt-10 grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div>
          <ContactForm />
        </div>

        <aside className="lg:pt-1">
          <SheetHead label="Or write directly" as="h2" />
          <a href={`mailto:${SITE.email}`} className="mt-4 inline-block font-mono text-[14px] text-mark underline decoration-1 hover:no-underline">
            {SITE.email}
          </a>
          {SITE.bookingUrl ? (
            <>
              <SheetHead label="Or book the call" as="h2" />
              <a href={SITE.bookingUrl} className="btn btn-ghost mt-4">Pick a time</a>
            </>
          ) : null}

          <div className="mt-10">
            <SheetHead label="What happens next" as="h2" />
            <ol className="mt-4 space-y-4 text-[14.5px] leading-snug text-ink-70">
              <li className="flex gap-3"><span className="font-mono text-[10px] tnum text-ink-45">1</span>I read it and reply within one working day.</li>
              <li className="flex gap-3"><span className="font-mono text-[10px] tnum text-ink-45">2</span>If it looks like a fit, a 30-minute call. Free.</li>
              <li className="flex gap-3"><span className="font-mono text-[10px] tnum text-ink-45">3</span>A written spec and a fixed price, or an honest no.</li>
            </ol>
          </div>

          <div className="mt-10">
            <SheetHead label="Hours" as="h2" />
            <p className="mt-3 text-[14.5px] leading-snug text-ink-70">
              {SITE.locality}, UTC+5:45. Full overlap with European working hours; US East Coast mornings for calls.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
