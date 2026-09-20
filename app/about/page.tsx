import Link from "next/link";
import { SheetHead, Cta, Breadcrumbs } from "../components/Sheet";
import JsonLd from "../components/JsonLd";
import { PRINCIPLES } from "../lib/process";
import { PERSON, SITE } from "../lib/site";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: `About ${PERSON.name}`,
  description: `${PERSON.name} runs Mytrya, a one-person AI engineering practice in Kathmandu. He builds and operates AI support agents, internal tools and data pipelines for small B2B teams.`,
  path: "/about",
});

export default function AboutPage() {
  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: "2026-09-20",
    mainEntity: { "@id": `${SITE.url}/about#person` },
  };
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <JsonLd data={[breadcrumbs([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]), profile]} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />

      <h1 className="mt-4 font-serif text-[34px] leading-[1.1] tracking-[-0.015em] sm:text-[46px]">{PERSON.name}</h1>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-45">
        {PERSON.jobTitle} · {SITE.locality}, Nepal · runs {SITE.name}
      </p>

      <div className="mt-8 grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="prose">
          <p className="!text-ink">
            I build AI systems for small B2B teams and run them in production. {SITE.name} is the name I work under.
          </p>
          <p>
            Over the last two years I&rsquo;ve built and operated an AI support agent that holds a seat in a
            software company&rsquo;s Freshdesk and acts in their billing and dev-tracking systems, a daily
            dashboard that reads the same desk for their leadership, and two smaller internal tools for the same
            team. That work is described under <Link href="/work" className="text-mark underline">Work</Link>,
            with the client unnamed.
          </p>
          <p>
            On my own time I built <a href="https://offscript.mytrya.com" className="text-mark underline">offScript</a>,
            a rehearsal partner for actors, and NEPSE Copilot, a research tool for the Nepal Stock Exchange that my
            family uses. Both are live. Both taught me things the client work didn&rsquo;t: how to make a voice
            interface wait for the right reason, and how to make a scoring system grade itself.
          </p>
          <p>
            The practice is one person on purpose. You talk to the person who writes the code, runs it and
            answers when it breaks. The cost of that is capacity, so I take a small number of projects at a time and
            say no when a project isn&rsquo;t a fit.
          </p>
          <p>
            I write most things in TypeScript on Next.js, keep data in Postgres or Redis, and use Claude, Gemini
            and OpenAI models through their APIs, chosen per task and measured where the choice matters.
          </p>
        </div>

        <aside>
          <p className="border-b rule-hair pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-45">Contact</p>
          <dl className="text-[14px]">
            <div className="border-b rule-hair py-2.5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-45">Email</dt>
              <dd className="mt-1"><a href={`mailto:${SITE.email}`} className="text-mark underline decoration-1 hover:no-underline">{SITE.email}</a></dd>
            </div>
            <div className="border-b rule-hair py-2.5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-45">GitHub</dt>
              <dd className="mt-1"><a href={SITE.github} rel="me noopener" className="text-ink hover:text-mark">github.com/srjmalla</a></dd>
            </div>
            <div className="border-b rule-hair py-2.5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-45">Hours</dt>
              <dd className="mt-1 text-ink">UTC+5:45. Full overlap with Europe, mornings for the US East Coast.</dd>
            </div>
          </dl>
        </aside>
      </div>

      <section className="mt-16">
        <SheetHead label="How I build" meta={`${PRINCIPLES.length} rules`} />
        <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-ink-70">
          These aren&rsquo;t values. They&rsquo;re rules that appear in the code of the systems under Work, and each
          exists because of something that went wrong without it.
        </p>
        <ol className="mt-6 grid gap-x-14 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="border-t rule-hair py-5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] tnum text-ink-45">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-[19px] leading-snug text-ink">{p.title}</h3>
              </div>
              <p className="mt-2 max-w-[48ch] text-[15.5px] leading-[1.6] text-ink-70">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <Cta />
    </div>
  );
}
