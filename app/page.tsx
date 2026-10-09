import Link from "next/link";
import Console from "./components/Console";
import { AgentTrace, DraftDiff, KbAnswer, WorkVisual } from "./components/Visuals";
import { KathmanduClock } from "./components/Live";
import { Cta, FaqList, StatusDot, workUp } from "./components/ui";
import { INTEGRATIONS, SERVICES } from "./lib/services";
import { WORK } from "./lib/work";
import { NOTES } from "./lib/notes";
import { FAQ_HOME } from "./lib/faq";
import { fmtDate } from "./lib/dates";
import { AVAILABILITY, PERSON, PRICING, SITE, usd } from "./lib/site";
import { meta } from "./lib/meta";

export const metadata = meta({
  title: `${SITE.name} · AI employees that do the whole job, for B2B teams`,
  ogTitle: `${SITE.name} · ${PERSON.name}, AI engineer`,
  description: SITE.description,
  path: "/",
});

function SecHead({ kicker, title, children }: { kicker: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="sec-head">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 className="h-display mt-4 text-[36px] sm:text-[52px]">{title}</h2>
      </div>
      {children ? <div className="max-w-[52ch] text-[17px] leading-[1.65] text-ink-2 md:pb-2">{children}</div> : null}
    </div>
  );
}

export default function Home() {
  const systems = INTEGRATIONS.flatMap((g) => g.items).filter((x) => !/first-party|marketplace|web terminals/.test(x));
  const featured = ["support-agent-platform", "narrately", "nepse-copilot", "offscript", "support-intelligence", "community-signal"]
    .map((s) => WORK.find((w) => w.slug === s))
    .filter((w): w is (typeof WORK)[number] => Boolean(w));

  return (
    <>
      {/* ── hero ── */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[900px]" />
        <div aria-hidden className="glow pointer-events-none absolute left-1/2 top-[420px] h-[700px] w-[1100px] -translate-x-1/2" />
        <div className="wrap relative pb-16 pt-16 sm:pt-24">
          <p className="kicker inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-white/[0.03] px-3 py-1.5">
            <span className="dot dot-live" aria-hidden />
            {AVAILABILITY.line} · {PERSON.name}, AI engineer in {SITE.locality}
          </p>
          <h1 className="h-display mt-7 max-w-[15ch] text-[46px] sm:text-[72px] lg:text-[84px]">
            AI employees that do the whole job.
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <p className="max-w-[58ch] text-[18px] leading-[1.65] text-ink-2 sm:text-[19px]">
              Not a chat bubble that answers and hands you the rest. An AI employee takes a job off your team, works on
              its own, and hands off to a person when it should, so the people around it do the work only people can. The
              one I run for a software vendor does support: it reads each case, gets what it needs from the account and
              the dev board, acts in those systems, follows up, and closes it. I build that, and the tools around it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-ink">Start a project <span aria-hidden>&rarr;</span></Link>
              <Link href="/work/support-agent-platform" className="btn btn-line">Read the case file</Link>
            </div>
          </div>

          <div className="mt-14 sm:mt-16">
            <Console />
            <p className="meta mt-3 flex flex-wrap justify-between gap-2">
              <span>Illustrative cases. The channels, tools and hand-off rules are the production system&rsquo;s; the customers are invented.</span>
              <span>20 tools · 3 channels · in production</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── connected ── */}
      <section className="border-y border-line py-7" aria-label="Systems connected in shipped work">
        <div className="wrap flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
          <p className="meta flex-none">Connected in shipped work</p>
          <div className="marquee min-w-0 flex-1">
            <ul className="marquee-track">
              {[...systems, ...systems].map((s, i) => (
                <li key={i} className="whitespace-nowrap text-[15px] font-medium text-ink-3" aria-hidden={i >= systems.length}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="wrap">
        {/* ── the job ── */}
        <section className="py-20 sm:py-28" aria-labelledby="job-h">
          <SecHead kicker="In production: support" title={<span id="job-h">The whole job a front&#8209;line support hire does</span>}>
            Support was the first job I gave an AI employee. Answering is the easy part. The work is deciding what a case needs, looking it up, acting in the systems
            around it, knowing when to hand off, and remembering to come back. Each of those is a tool the agent picks
            up on its own, with a rule about when it may.
          </SecHead>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {[
              { v: <AgentTrace />, t: "Decides, then does", b: "One loop, 20 tools. It searches the docs and the dev board, asks the customer what it still needs, files the bug, and schedules its own follow-up. Nobody scripts the order." },
              { v: <KbAnswer />, t: "Answers only from your docs", b: "Product specifics come from a retrieved article, cited in the reply. No article, no answer: it asks or escalates." },
              { v: <DraftDiff />, t: "Learns from what your team sends", b: "It compares its draft with what was sent, a blind judge decides which was better, and a person approves each learning." },
            ].map((f) => (
              <div key={f.t} className="panel flex flex-col p-3">
                <div className="h-[268px] overflow-hidden">{f.v}</div>
                <div className="px-2 pb-3 pt-5">
                  <h3 className="h-section text-[19px]">{f.t}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">{f.b}</p>
                </div>
              </div>
            ))}
          </div>
          <ul className="mt-4 grid gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Checks before it speaks", "The account, the dev board and the docs, before it writes a word"],
              ["Files the bug", "Links the customer to the dev item, so the fix reaches them"],
              ["Hands off with a summary", "To the right person in Slack, with what it found. Anything irreversible waits for a person"],
              ["Follows up on its own", "Re-opens the case after quiet, reads what changed, then closes or re-runs"],
              ["Briefs the team", "Emerging issues each morning, by arithmetic, not opinion"],
              ["Writes what's missing", "Questions with no article become draft articles for review"],
            ].map(([t, b]) => (
              <li key={t} className="bg-bg p-5">
                <p className="text-[15px] font-medium">{t}</p>
                <p className="mt-1 text-[14px] leading-snug text-ink-3">{b}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── case files ── */}
        <section className="border-t border-line py-20 sm:py-28" aria-labelledby="work-h">
          <SecHead kicker="Case files" title={<span id="work-h">Systems I built and still run</span>}>
            Six write-ups covering the problem, the architecture and the decisions that mattered, including the ones that
            didn&rsquo;t work first time. Clients are unnamed; my own products are live and linked.
          </SecHead>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {featured.map((w, i) => (
              <Link
                key={w.slug}
                href={`/work/${w.slug}`}
                className={`panel group flex flex-col p-3 transition-colors hover:border-line-2 ${i === 0 ? "md:col-span-2 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-4" : ""}`}
              >
                <div className={`overflow-hidden ${i === 0 ? "h-[280px] md:order-2 md:h-full" : "h-[250px]"}`}>
                  <WorkVisual slug={w.slug} />
                </div>
                <div className={`flex flex-col px-2 pb-3 pt-5 ${i === 0 ? "md:justify-center md:p-6" : ""}`}>
                  <div className="meta flex flex-wrap items-center gap-x-3 gap-y-1">
                    <StatusDot up={workUp(w.status)} label={w.status} />
                    <span>{w.origin}</span>
                    <span>{w.year}</span>
                  </div>
                  <h3 className={`h-section mt-3 group-hover:text-lime ${i === 0 ? "text-[30px]" : "text-[22px]"}`}>{w.name}</h3>
                  <p className={`mt-2 leading-[1.55] text-ink-2 ${i === 0 ? "text-[17px]" : "text-[15.5px]"}`}>{w.line}</p>
                  <p className="meta mt-4">{w.stack}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── who ── */}
        <section className="border-t border-line py-20 sm:py-28" aria-labelledby="who-h">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-16">
            <figure className="relative">
              <div className="overflow-hidden rounded-[18px] border border-line-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PERSON.image} alt={`${PERSON.name}, AI engineer in ${SITE.locality}`} width={720} height={720} loading="lazy" className="block aspect-square w-full object-cover grayscale-[35%]" />
              </div>
              <figcaption className="window absolute -bottom-5 left-5 right-5 flex items-center justify-between gap-4 px-4 py-3 font-mono text-[12px] sm:left-8 sm:right-auto">
                <span className="text-ink">{PERSON.name}</span>
                <span className="text-ink-3"><KathmanduClock /> in {SITE.locality}</span>
              </figcaption>
            </figure>
            <div className="lg:pt-6">
              <p className="kicker">Who you&rsquo;d work with</p>
              <h2 id="who-h" className="h-display mt-4 text-[36px] sm:text-[52px]">One engineer, from the call to production.</h2>
              <div className="mt-6 max-w-[58ch] space-y-4 text-[17px] leading-[1.7] text-ink-2">
                <p>
                  I&rsquo;m {PERSON.name}. I build and run AI systems for B2B teams: an AI support employee for a software
                  company with two product brands, the dashboard and internal tools around it, and an invoice automation
                  that pulls invoices out of email and reads them with OCR. On my own time I ship products people use: a
                  rehearsal partner for actors, an investing copilot for the Nepal Stock Exchange, and an app that reads
                  your books aloud.
                </p>
                <p>
                  The person on the scoping call is the person who writes the code, runs it and answers when it breaks.
                  That costs capacity, so I take a few projects at a time.
                </p>
              </div>
              <dl className="mt-8 grid max-w-[560px] grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-line bg-line">
                {[
                  ["Hours", "All of Europe · US mornings"],
                  ["Reply", `Within ${PRICING.replyWithin}`],
                  ["Start", AVAILABILITY.start.replace(/^Start /, "")],
                  ["You own", "Code, accounts, runbook"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-bg p-4">
                    <dt className="meta">{k}</dt>
                    <dd className="mt-1 text-[15px]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/about" className="btn btn-line">More about me</Link>
                {SITE.linkedin ? <a href={SITE.linkedin} rel="me noopener" className="btn btn-line">LinkedIn ↗</a> : null}
              </div>
            </div>
          </div>
        </section>

        {/* ── price ── */}
        <section className="border-t border-line py-20 sm:py-28" aria-labelledby="price-h">
          <SecHead kicker="Price" title={<span id="price-h">Fixed scope, published prices</span>}>
            Agreed in writing after a free 30-minute call. The number doesn&rsquo;t move unless the spec does, and then we
            write both down first.
          </SecHead>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className={`panel group flex flex-col p-6 transition-colors hover:border-line-2 ${i === 0 ? "!border-lime/30 bg-[linear-gradient(180deg,rgba(198,242,78,0.06),transparent_60%)]" : ""}`}>
                <p className="meta">{s.short}</p>
                <p className="mt-4 text-[15px] text-ink-3">from</p>
                <p className="h-display text-[44px]">{usd(s.priceFrom)}</p>
                <h3 className="h-section mt-5 text-[19px] group-hover:text-lime">{s.name}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-[1.6] text-ink-2">{s.answer[0].split(/(?<=\.)\s/)[0]}</p>
                <p className="meta mt-6">What&rsquo;s included →</p>
              </Link>
            ))}
          </div>
          <p className="meta mt-5">
            Most projects {usd(PRICING.typicalLow)}–{usd(PRICING.typicalHigh)} · optional tuning from {usd(PRICING.retainerFrom)}/month ·{" "}
            <Link href="/process" className="a">how a project runs</Link>
          </p>
        </section>

        {/* ── notes ── */}
        {NOTES.length ? (
          <section className="border-t border-line py-20 sm:py-28" aria-labelledby="notes-h">
            <SecHead kicker="Notes" title={<span id="notes-h">What building these taught me</span>} />
            <ol className="rule-b mt-10">
              {NOTES.slice(0, 4).map((n) => (
                <li key={n.slug}>
                  <Link href={`/notes/${n.slug}`} className="row-link gap-x-8 gap-y-1 px-2 md:grid-cols-[9rem_minmax(0,1fr)_auto]">
                    <span className="meta pt-1">{fmtDate(n.published)}</span>
                    <span>
                      <span className="row-title h-section text-[21px]">{n.title}</span>
                      <span className="mt-1.5 block max-w-[70ch] text-[15px] leading-snug text-ink-3">{n.description}</span>
                    </span>
                    <span className="meta hidden pt-1 md:block">{n.tags[0]}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {/* ── questions ── */}
        <section className="border-t border-line py-20 sm:py-28" aria-labelledby="faq-h">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
            <div>
              <p className="kicker">Questions</p>
              <h2 id="faq-h" className="h-display mt-4 text-[36px] sm:text-[52px]">Before you write</h2>
              <Link href="/faq" className="a meta mt-6 inline-block">All questions →</Link>
            </div>
            <FaqList items={FAQ_HOME} />
          </div>
        </section>
      </div>

      <Cta />
    </>
  );
}
