import Link from "next/link";
import { SheetHead, Cta, FaqList } from "./components/Sheet";
import { ServiceCard, WorkRow } from "./components/Cards";
import { SERVICES, INTEGRATIONS } from "./lib/services";
import { WORK } from "./lib/work";
import { FAQ_HOME } from "./lib/faq";
import { STEPS } from "./lib/process";
import { PERSON, SITE } from "./lib/site";
import { meta } from "./lib/meta";

export const metadata = meta({
  title: `${SITE.name} · ${SITE.tagline}`,
  ogTitle: `${SITE.name} · ${SITE.tagline}`,
  description: SITE.description,
  path: "/",
});

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      {/* ── hero ── */}
      <section className="border-b rule-hair py-14 sm:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-45">
          {SITE.name} · {SITE.locality}
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-[34px] leading-[1.12] tracking-[-0.015em] sm:text-[46px] lg:text-[52px]">
          AI agents, internal tools and automation for small B2B teams.
        </h1>
        <div className="mt-8 grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="prose">
            <p>
              Mytrya is a one-person engineering practice run by {PERSON.name}. It builds systems that
              answer support tickets from your documentation, compute the numbers your team asks for every
              morning, and move data between the tools you already run. Fixed scope, fixed price, and every
              system on this site is one I built and can walk you through line by line.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:pt-1">
            <Link href="/contact" className="btn btn-primary btn-lg">Start a project</Link>
            <Link href="/work" className="btn btn-ghost">See the work</Link>
            <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-45">
              Free 30-minute scoping call · reply within one working day
            </p>
          </div>
        </div>
      </section>

      {/* ── services ── */}
      <section className="pt-14" aria-labelledby="services-h">
        <SheetHead label="What I build" meta="3 services" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {SERVICES.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
        <p className="mt-5 max-w-[80ch] font-mono text-[10.5px] uppercase leading-[1.8] tracking-[0.1em] text-ink-45">
          <span className="text-ink-70">Connected so far:</span>{" "}
          {INTEGRATIONS.flatMap((g) => g.items).join(" · ")}.{" "}
          <Link href="/services" className="text-mark underline decoration-1 hover:no-underline">Anything with an API.</Link>
        </p>
      </section>

      {/* ── who it's for / comparison ── */}
      <section className="pt-16" aria-labelledby="fit-h">
        <SheetHead label="Who this is for" />
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div className="prose">
            <h3 className="font-serif text-[22px] leading-snug text-ink">A team of 5 to 200 with a stack that doesn&rsquo;t talk to itself</h3>
            <p>
              You run a helpdesk, a CRM, a billing system and a project tracker, and a person moves
              information between them. Founders, heads of operations and heads of support are the usual
              first contact. The work is designing the piece that connects them and running it until it&rsquo;s boring.
            </p>
          </div>
          <div className="prose">
            <h3 className="font-serif text-[22px] leading-snug text-ink">When to use a platform&rsquo;s own AI instead</h3>
            <p>
              If your help centre alone answers your tickets and you only need it inside the vendor&rsquo;s console,
              switch on Intercom Fin or Freshdesk Freddy. They&rsquo;re faster to deploy and I&rsquo;ll tell you so on
              the call. Custom work earns its cost when resolving a ticket means acting in other systems, when you
              want the agent on your own site or inside your product, when you want to choose the model and keep the
              data in your own accounts, or when you need every action rehearsed before it goes live.
            </p>
          </div>
        </div>
      </section>

      {/* ── work ── */}
      <section className="pt-16" aria-labelledby="work-h">
        <SheetHead label="Work" meta={`${WORK.length} systems`} />
        <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-ink-70">
          Three client systems described in architectural detail with the client&rsquo;s name withheld, and two
          products of my own that you can open. No metrics appear here that I can&rsquo;t source.
        </p>
        <ol className="mt-4 border-b rule-hair">
          {WORK.map((w) => (
            <li key={w.slug} className="border-t rule-hair">
              <WorkRow w={w} />
            </li>
          ))}
        </ol>
      </section>

      {/* ── process ── */}
      <section className="pt-16" aria-labelledby="process-h">
        <SheetHead label="How a project runs" meta="4 steps" />
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="border-t rule-heavy pt-4">
              <p className="font-mono text-[11px] tnum text-ink-45">{s.n}</p>
              <h3 className="mt-1 font-serif text-[19px] leading-snug">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-ink-70">{s.output}</p>
            </li>
          ))}
        </ol>
        <Link href="/process" className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-mark underline decoration-1 hover:no-underline">
          The full process, including what you get at handover &rarr;
        </Link>
      </section>

      {/* ── faq ── */}
      <section className="pt-16" aria-labelledby="faq-h">
        <SheetHead label="Common questions" meta="4 of 14" />
        <FaqList items={FAQ_HOME} />
        <Link href="/faq" className="mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-mark underline decoration-1 hover:no-underline">
          All questions &rarr;
        </Link>
      </section>

      <Cta />
    </div>
  );
}
