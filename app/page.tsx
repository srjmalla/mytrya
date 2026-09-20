import Link from "next/link";
import { SheetHead, Cta, FaqList, Counts } from "./components/Sheet";
import { ServiceCard, WorkRow, Chips } from "./components/Cards";
import HeroFigure from "./components/HeroFigure";
import { SERVICES, INTEGRATIONS } from "./lib/services";
import { WORK } from "./lib/work";
import { FAQ_HOME } from "./lib/faq";
import { STEPS, PRINCIPLES } from "./lib/process";
import { PERSON, SITE } from "./lib/site";
import { meta } from "./lib/meta";

export const metadata = meta({
  title: `${SITE.name} · ${SITE.tagline}`,
  ogTitle: `${SITE.name} · ${SITE.tagline}`,
  description: SITE.description,
  path: "/",
});

export default function Home() {
  const integrations = INTEGRATIONS.flatMap((g) => g.items);
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      {/* ── hero ── */}
      <section className="py-14 sm:py-20">
        <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <p className="rise rise-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-45">
              <span className="mr-2 inline-block h-[7px] w-[7px] bg-mark align-[1px]" aria-hidden />
              {SITE.name} · {SITE.locality} · one engineer
            </p>
            <h1 className="display rise rise-2 mt-5 text-[40px] leading-[1.06] sm:text-[52px] lg:text-[58px]">
              AI agents, internal tools and <em>automation</em> for small B2B teams.
            </h1>
            <div className="prose rise rise-3 mt-7">
              <p>
                Mytrya is a one-person engineering practice run by {PERSON.name}. It builds systems that
                answer support tickets from your documentation, compute the numbers your team asks for every
                morning, and move data between the tools you already run. Fixed scope, fixed price, and every
                system on this site is one I built and can walk you through line by line.
              </p>
            </div>
            <div className="rise rise-4 mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn btn-primary btn-lg">Start a project <span className="arrow" aria-hidden>&rarr;</span></Link>
              <Link href="/work" className="btn btn-ghost btn-lg">See the work</Link>
            </div>
            <p className="rise rise-4 mt-4 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-45">
              Free 30-minute scoping call · reply within one working day
            </p>
          </div>
          <div className="rise rise-3 frame graph p-4 sm:p-6 lg:p-5">
            <HeroFigure />
          </div>
        </div>

        <div className="mt-14 sm:mt-20">
          <Counts
            items={[
              { n: WORK.length, label: "Systems documented" },
              { n: SERVICES.length, label: "Kinds of work" },
              { n: STEPS.length, label: "Steps to handover" },
              { n: PRINCIPLES.length, label: "Rules in every build" },
            ]}
          />
        </div>
      </section>

      {/* ── services ── */}
      <section className="pt-6" aria-labelledby="services-h">
        <SheetHead label="What I build" meta={`${SERVICES.length} services`} />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {SERVICES.map((s, i) => <ServiceCard key={s.slug} s={s} index={i} />)}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-[10rem_minmax(0,1fr)]">
          <p className="font-mono text-[10.5px] uppercase leading-[1.8] tracking-[0.12em] text-ink-70">
            Connected so far
          </p>
          <div>
            <Chips items={integrations} />
            <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-45">
              Evidence, not a menu.{" "}
              <Link href="/services" className="text-mark underline decoration-1 hover:no-underline">Anything with an API.</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── who it's for / comparison ── */}
      <section className="pt-20" aria-labelledby="fit-h">
        <SheetHead label="Who this is for" />
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div className="prose lead">
            <h3 className="display text-[24px] leading-[1.2] text-ink">A team of 5 to 200 with a stack that doesn&rsquo;t talk to itself</h3>
            <p className="mt-3">
              You run a helpdesk, a CRM, a billing system and a project tracker, and a person moves
              information between them. Founders, heads of operations and heads of support are the usual
              first contact. The work is designing the piece that connects them and running it until it&rsquo;s boring.
            </p>
          </div>
          <div className="prose lead" style={{ borderLeftColor: "var(--rule-soft)" }}>
            <h3 className="display text-[24px] leading-[1.2] text-ink">When to use a platform&rsquo;s own AI instead</h3>
            <p className="mt-3">
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
      <section className="pt-20" aria-labelledby="work-h">
        <SheetHead label="Work" meta={`${WORK.length} systems`} />
        <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-ink-70">
          Three client systems described in architectural detail with the client&rsquo;s name withheld, and two
          products of my own that you can open. No metrics appear here that I can&rsquo;t source.
        </p>
        <ol className="mt-6 border-b rule-hair">
          {WORK.map((w) => (
            <li key={w.slug} className="border-t rule-hair">
              <WorkRow w={w} />
            </li>
          ))}
        </ol>
      </section>

      {/* ── process ── */}
      <section className="pt-20" aria-labelledby="process-h">
        <SheetHead label="How a project runs" meta={`${STEPS.length} steps`} />
        <ol className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="relative border-t rule-heavy pt-5">
              <span aria-hidden className="absolute -top-[5px] left-0 h-[9px] w-[9px] bg-ink" />
              <p className="card-no">{s.n.padStart(2, "0")}</p>
              <h3 className="mt-3 font-serif text-[20px] leading-snug">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-ink-70">{s.output}</p>
            </li>
          ))}
        </ol>
        <Link href="/process" className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-mark underline decoration-1 hover:no-underline">
          The full process, including what you get at handover &rarr;
        </Link>
      </section>

      {/* ── faq ── */}
      <section className="pt-20" aria-labelledby="faq-h">
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
