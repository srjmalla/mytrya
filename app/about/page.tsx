import Link from "next/link";
import { Breadcrumbs, Cta, Leaf, Sun } from "../components/ui";
import Mark from "../components/Mark";
import JsonLd from "../components/JsonLd";
import { PERSON, PHILOSOPHY, SITE } from "../lib/site";
import { meta, breadcrumbs } from "../lib/meta";
import { PERSON_LD } from "../lib/schema";

export const metadata = meta({
  title: `About Mytrya and ${PERSON.name}`,
  description: `${SITE.name} helps businesses bring AI into their work in a way that lasts. Run by ${PERSON.name}, also a musician and actor, and a lifelong learner of new things.`,
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
                I&rsquo;m {PERSON.name}. I help businesses bring AI into their work in a way that lasts, and I build and run
                the systems that make it happen. Right now that mostly means AI employees. {SITE.name} is the name I work
                under.
              </p>
              <p>
                The largest system I run is an AI support employee for a software company. It takes a case from the first
                message to closed, hands off to a person when it should, and learns from the replies the team actually
                sends. Around it sit a morning summary of the support desk for the company&rsquo;s leadership and two smaller
                internal tools. All of it is under <Link href="/work" className="a">Work</Link>, with the client unnamed.
              </p>
              <p>
                Outside engineering I&rsquo;m a musician and an actor. I play guitar and sarangi, I sing, and I&rsquo;ve
                performed in professional theatre productions. More recently I&rsquo;ve taken up golf. I&rsquo;d call myself
                a golfer; the ball hasn&rsquo;t fully agreed yet. None of it came naturally at first; each one was learned
                from scratch, by practising until it held.
              </p>
              <p>
                That habit of learning something new, and keeping at it, is the one I lean on most with AI. The tools
                change every few months, and the way through is the same one I&rsquo;ve used all my life. It&rsquo;s also
                how I work with clients: I help your team learn its way into the change instead of just handing over a
                system.
              </p>
              <p>
                On my own time I build products people use. <Link href="/work/offscript" className="a">offScript</Link> is a
                rehearsal partner for actors. <Link href="/work/nepse-copilot" className="a">NEPSE Copilot</Link> is an
                investing assistant for the Nepal Stock Exchange that keeps score of its own ideas.{" "}
                <Link href="/work/narrately" className="a">Narrately</Link> reads your own books aloud. All three are live.
              </p>
              <p>
                You work directly with the person who builds the system, runs it and answers when it breaks. There is no
                handoff. That costs capacity, so I take a small number of projects at a time.
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
