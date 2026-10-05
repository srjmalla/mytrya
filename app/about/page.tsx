import Link from "next/link";
import { Breadcrumbs, Cta, Leaf } from "../components/ui";
import { KathmanduClock } from "../components/Live";
import JsonLd from "../components/JsonLd";
import { PRINCIPLES } from "../lib/process";
import { AVAILABILITY, PERSON, SITE } from "../lib/site";
import { ACTIVITY } from "../lib/activity";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: `About ${PERSON.name}, AI engineer in Kathmandu`,
  description: `${PERSON.name} runs Mytrya, a one-person AI engineering practice in Kathmandu. He builds and runs AI support employees, internal tools and data pipelines for small B2B teams, and ships his own products.`,
  path: "/about",
});

export default function AboutPage() {
  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: ACTIVITY.generatedAt.slice(0, 10),
    mainEntity: { "@id": `${SITE.url}/about#person` },
  };
  return (
    <>
      <div className="wrap pb-16 pt-10">
        <JsonLd data={[breadcrumbs([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]), profile]} />
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />

        <header className="mt-8 grid gap-10 pb-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <p className="meta">{PERSON.jobTitle} · {SITE.locality}, Nepal · runs {SITE.name}</p>
            <h1 className="h-display mt-3 text-[44px] sm:text-[60px]">{PERSON.name}</h1>
            <div className="mt-8 max-w-[64ch] space-y-5 text-[19px] leading-[1.65]">
              <p>
                I build AI systems for small B2B teams and run them in production. {SITE.name} is the name I work under.
              </p>
              <p className="text-ink-2">
                For the last two years I&rsquo;ve built and operated an AI support employee for a software company: one
                agent that handles a case end to end across their helpdesk, their live chat and a chat widget of its own on
                their site and inside their apps. It acts in billing and on the dev board, asks a person before it moves
                money, and learns from what the human team actually sends. Alongside it sit a daily dashboard that reads
                the same desk for their leadership, and two smaller internal tools. All of it is written up under{" "}
                <Link href="/work" className="a">Work</Link>, with the client unnamed.
              </p>
              <p className="text-ink-2">
                On my own time I build products, and they keep me honest about what it takes to ship.{" "}
                <Link href="/work/offscript" className="a">offScript</Link> is a rehearsal partner for actors with two
                speech engines and a cue engine that reads the line instead of the clock.{" "}
                <Link href="/work/nepse-copilot" className="a">NEPSE Copilot</Link> is an investing copilot for the Nepal
                Stock Exchange that grades its own calls. <Link href="/work/narrately" className="a">Narrately</Link> reads
                people&rsquo;s own books aloud and narrates each sentence once for every reader. All three are live, and
                you can watch them change in the <Link href="/log" className="a">build log</Link>.
              </p>
              <p className="text-ink-2">
                The practice is one person on purpose. You talk to the person who writes the code, runs it and answers when
                it breaks. The cost of that is capacity, so I take a small number of projects at a time and say no when a
                project isn&rsquo;t a fit.
              </p>
              <p className="text-ink-2">
                I write most things in TypeScript on Next.js, keep data in Postgres or Redis, and use Claude, Gemini and
                OpenAI models through their APIs, chosen per task and measured where the choice matters.
              </p>
            </div>
          </div>
          <dl className="self-start panel px-4 py-1 font-mono text-[12.5px]">
            <div className="flex justify-between gap-4 border-b border-rule py-2.5"><dt className="text-ink-3">Status</dt><dd>{AVAILABILITY.line}</dd></div>
            <div className="flex justify-between gap-4 border-b border-rule py-2.5"><dt className="text-ink-3">Local time</dt><dd><KathmanduClock /> · UTC+5:45</dd></div>
            <div className="flex justify-between gap-4 border-b border-rule py-2.5"><dt className="text-ink-3">Email</dt><dd><a href={`mailto:${SITE.email}`} className="a">{SITE.email}</a></dd></div>
            <div className="flex justify-between gap-4 border-b border-rule py-2.5"><dt className="text-ink-3">GitHub</dt><dd><a href={SITE.github} rel="me noopener" className="a">srjmalla</a></dd></div>
            {SITE.linkedin ? (
              <div className="flex justify-between gap-4 border-b border-rule py-2.5"><dt className="text-ink-3">LinkedIn</dt><dd><a href={SITE.linkedin} rel="me noopener" className="a">Suraj Malla</a></dd></div>
            ) : null}
            <div className="py-2.5"><dt className="text-ink-3">Hours</dt><dd className="mt-1 leading-relaxed text-ink-2">Full overlap with Europe, mornings for the US East Coast.</dd></div>
          </dl>
        </header>

        <Leaf label="How I build" note={<p>Rules that appear in the code of the systems under Work. Each exists because something went wrong without it.</p>}>
          <ol className="grid gap-x-12 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="rule-t py-5">
                <h3 className="h-section text-[19px]">{p.title}</h3>
                <p className="mt-2 max-w-[48ch] text-[16px] leading-[1.6] text-ink-2">{p.body}</p>
              </li>
            ))}
          </ol>
        </Leaf>
      </div>
      <Cta />
    </>
  );
}
