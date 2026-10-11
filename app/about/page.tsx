import Link from "next/link";
import { Breadcrumbs, Cta, Leaf, Sun } from "../components/ui";
import Mark from "../components/Mark";
import JsonLd from "../components/JsonLd";
import { PERSON, PHILOSOPHY, SITE } from "../lib/site";
import { meta, breadcrumbs } from "../lib/meta";
import { PERSON_LD } from "../lib/schema";

export const metadata = meta({
  title: `About Mytrya and ${PERSON.name}`,
  description: `${SITE.name} helps small teams work through the change AI is bringing. Run by ${PERSON.name}. The name comes from Maitreya, the Buddha who is yet to come.`,
  path: "/about",
  image: { url: PERSON.image, width: PERSON.imageWidth, height: PERSON.imageHeight, alt: PERSON.name },
});

export default function AboutPage() {
  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: "2026-10-11",
    mainEntity: PERSON_LD,
    primaryImageOfPage: { "@id": `${SITE.url}/about#photo` },
  };
  return (
    <>
      <section className="relative overflow-hidden">
        <Sun />
        <div className="wrap relative pb-20 pt-10">
          <JsonLd data={[breadcrumbs([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]), profile]} />
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
          <Mark className="mt-12 h-14 w-14 text-ink" />
          <h1 className="h-display mt-6 max-w-[18ch] text-[44px] sm:text-[60px]">{PHILOSOPHY.line}</h1>
          <p className="mt-6 max-w-[52ch] text-[19px] leading-[1.6] text-ink-2">{PHILOSOPHY.name}</p>
        </div>
      </section>

      <div className="wrap pb-16">
        <Leaf label="What we believe">
          <ul className="grid gap-8">
            {PHILOSOPHY.principles.map((p) => (
              <li key={p.title}>
                <h3 className="h-section text-[22px]">{p.title}</h3>
                <p className="mt-2 max-w-[56ch] text-[17px] leading-[1.6] text-ink-2">{p.body}</p>
              </li>
            ))}
          </ul>
        </Leaf>

        <Leaf label="Who runs it">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_240px]">
            <div className="prose-note">
              <p>
                I&rsquo;m {PERSON.name}. I build AI employees for small teams and look after
                them once they&rsquo;re running. The largest one handles customer support for a software company, from the
                first message to the closed case.
              </p>
              <p>
                On my own time I make products people use: <Link href="/work/offscript" className="a">offScript</Link>, a
                rehearsal partner for actors; <Link href="/work/nepse-copilot" className="a">NEPSE Copilot</Link>, an
                investing assistant for the Nepal Stock Exchange; and <Link href="/work/narrately" className="a">Narrately</Link>,
                which reads your own books aloud.
              </p>
              <p>
                You work with me directly, from the first call to long after handover. That limits how many projects I
                take at once.
              </p>
            </div>
            <figure className="self-start overflow-hidden rounded-[20px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PERSON.image} alt={PERSON.name} width={PERSON.imageWidth} height={PERSON.imageHeight} className="block aspect-square w-full object-cover" />
            </figure>
          </div>
        </Leaf>

        <Leaf label="Elsewhere">
          <ul className="space-y-2 text-[17px]">
            <li><a href={`mailto:${SITE.email}`} className="a">{SITE.email}</a></li>
            {SITE.linkedin ? <li><a href={SITE.linkedin} rel="me noopener" className="a">LinkedIn</a></li> : null}
          </ul>
        </Leaf>
      </div>
      <Cta />
    </>
  );
}
