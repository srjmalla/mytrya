import Link from "next/link";
import Replay from "./components/Replay";
import { Ago, KathmanduClock } from "./components/Live";
import { Cta, FaqList, Leaf, StatusDot, workUp } from "./components/ui";
import { SERVICES } from "./lib/services";
import { WORK } from "./lib/work";
import { NOTES } from "./lib/notes";
import { FAQ_HOME } from "./lib/faq";
import { ACTIVITY, fmtDate, productName } from "./lib/activity";
import { AVAILABILITY, PERSON, PRICING, SITE, usd } from "./lib/site";
import { meta } from "./lib/meta";

export const metadata = meta({
  title: `${SITE.name} · AI support employees and internal tools for B2B teams`,
  ogTitle: `${SITE.name} · ${PERSON.name}, AI engineer`,
  description: SITE.description,
  path: "/",
});

export default function Home() {
  const latest = ACTIVITY.log[0];
  const support = WORK.find((w) => w.slug === "support-agent-platform")!;
  return (
    <>
    <div className="wrap">
      {/* ── opening ── */}
      <section className="pb-14 pt-12 sm:pb-20 sm:pt-20">
        <p className="meta">
          {SITE.name} · {PERSON.name} · AI engineer in {SITE.locality}
        </p>
        <h1 className="h-display mt-5 max-w-[17ch] text-[42px] sm:text-[60px] lg:text-[68px]">
          AI support employees and internal tools for B2B teams of 5 to 200.
        </h1>
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="max-w-[60ch] text-[19px] leading-[1.6] text-ink-2">
            <p>
              I&rsquo;m {PERSON.name}. The AI support employee I run for a software vendor takes a case from the first
              message to closed: it checks the customer&rsquo;s billing account and the dev board, answers from the
              documentation, files bugs, asks a person before it moves money, and follows up when the customer goes
              quiet.
            </p>
            <p className="mt-4">
              I build systems like that, and internal tools that compute what your team asks for every morning. Fixed
              scope, prices on this page, and the person on the call is the person who writes the code.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-ink">Start a project <span aria-hidden>&rarr;</span></Link>
              <Link href="/work" className="btn btn-line">Read the case files</Link>
            </div>
          </div>

          {/* The live line: true at build time, kept true in the browser. */}
          <dl className="self-end border-t border-ink font-mono text-[12.5px] leading-[1.5]">
            <div className="flex justify-between gap-4 border-b border-rule py-2.5">
              <dt className="text-ink-3">Status</dt>
              <dd><StatusDot up={AVAILABILITY.open} label={AVAILABILITY.line} /></dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-rule py-2.5">
              <dt className="text-ink-3">Kathmandu</dt>
              <dd><KathmanduClock /> · UTC+5:45</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-rule py-2.5">
              <dt className="text-ink-3">Overlap</dt>
              <dd>all of Europe · US mornings</dd>
            </div>
            {latest ? (
              <div className="border-b border-rule py-2.5">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-3">Last shipped</dt>
                  <dd><Ago iso={latest.date} fallback={fmtDate(latest.date)} /> · {productName(latest.product)}</dd>
                </div>
                <dd className="mt-1 text-ink-2">&ldquo;{latest.message}&rdquo;</dd>
              </div>
            ) : null}
            <div className="flex justify-between gap-4 py-2.5">
              <dt className="text-ink-3">Shipping streak</dt>
              <dd>{ACTIVITY.streakWeeks} weeks · <Link href="/log" className="a">log</Link></dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── the replay ── */}
      <Leaf
        label="Watch a case"
        id="replay-h"
        note={<p>Illustrative case. The steps, tools and rules are the real system&rsquo;s; the customer is invented.</p>}
      >
        <p className="mb-6 max-w-[62ch] text-[18px] leading-[1.6] text-ink-2">
          A customer asks for a longer trial on the chat widget. Step through what the AI support employee does,
          from the message arriving to the case being closed six days later.
        </p>
        <Replay />
        <p className="meta mt-4">
          The system behind it: <Link href={`/work/${support.slug}`} className="a">{support.name}, the full case file</Link> ·{" "}
          {support.facts.find((f) => f.k === "Tools")?.v.split(",")[0]} tools · three channels · in production
        </p>
      </Leaf>

      {/* ── case files ── */}
      <Leaf label="Case files" id="work-h" note={<p>{WORK.length} systems, each written up as built. Client names withheld.</p>}>
        <ol className="rule-b">
          {WORK.map((w) => (
            <li key={w.slug}>
              <Link href={`/work/${w.slug}`} className="row-link gap-x-6 gap-y-1 px-1 sm:grid-cols-[3.5rem_minmax(0,1fr)_10rem]">
                <span className="meta pt-1">{w.year}</span>
                <span>
                  <span className="row-title h-section text-[21px] text-ink">{w.name}</span>
                  <span className="mt-1 block text-[16.5px] leading-snug text-ink-2">{w.line}</span>
                </span>
                <span className="meta sm:pt-1 sm:text-right">
                  <StatusDot up={workUp(w.status)} label={w.status} />
                  <span className="block">{w.origin}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Leaf>

      {/* ── running now ── */}
      <Leaf
        label="Running now"
        id="running-h"
        note={<p>Checked at every build, rebuilt daily. Last check {fmtDate(ACTIVITY.checkedAt)}.</p>}
      >
        <div className="grid gap-px border border-rule bg-rule sm:grid-cols-3">
          {ACTIVITY.products.map((p) => (
            <div key={p.id} className="flex flex-col bg-paper p-5">
              <div className="flex items-baseline justify-between gap-3">
                <Link href={`/work/${p.work}`} className="h-section text-[20px] hover:text-accent">{p.name}</Link>
                <span className="meta"><StatusDot up={p.status.up} /></span>
              </div>
              <a href={p.url} className="meta mt-1 hover:text-ink">{p.url.replace("https://", "")} ↗</a>
              <dl className="meta mt-5 space-y-1">
                <div className="flex justify-between gap-3"><dt>Last change</dt><dd className="text-ink-2">{p.lastShipped ? <Ago iso={p.lastShipped} fallback={fmtDate(p.lastShipped)} /> : "–"}</dd></div>
                <div className="flex justify-between gap-3"><dt>Changes, 30 days</dt><dd className="text-ink-2">{p.changes30d}</dd></div>
                <div className="flex justify-between gap-3"><dt>Response</dt><dd className="text-ink-2">{p.status.ms} ms</dd></div>
              </dl>
            </div>
          ))}
        </div>
      </Leaf>

      {/* ── build log ── */}
      <Leaf
        label="Build log"
        id="log-h"
        note={<p>From the commit history of my own products. {ACTIVITY.changes30d} changes in the last 30 days.</p>}
      >
        <ol className="rule-b">
          {ACTIVITY.log.slice(0, 8).map((e, n) => (
            <li key={n} className="rule-t grid gap-x-6 gap-y-0.5 py-3 sm:grid-cols-[7.5rem_8rem_minmax(0,1fr)]">
              <span className="meta">{fmtDate(e.date)}</span>
              <span className="meta text-ink-2">{productName(e.product)}</span>
              <span className="text-[16.5px] leading-snug">{e.message}</span>
            </li>
          ))}
        </ol>
        <Link href="/log" className="a meta mt-4 inline-block">The full log →</Link>
      </Leaf>

      {/* ── kinds of work ── */}
      <Leaf label="Work I take on" id="services-h" note={<p>Anything with an API, a webhook or a web page can be connected.</p>}>
        <div className="rule-b">
          {SERVICES.map((s) => (
            <div key={s.slug} className="rule-t grid gap-x-8 gap-y-2 py-6 md:grid-cols-[minmax(0,1fr)_13rem]">
              <div>
                <h3 className="h-section text-[23px]">
                  <Link href={`/services/${s.slug}`} className="hover:text-accent">{s.name}</Link>
                </h3>
                <p className="mt-2 max-w-[62ch] text-[17px] leading-[1.6] text-ink-2">{s.answer[0].split(/(?<=\.)\s/)[0]}</p>
                <p className="meta mt-3">
                  Proof:{" "}
                  {s.proof.map((slug, n) => {
                    const w = WORK.find((x) => x.slug === slug);
                    return w ? (
                      <span key={slug}>
                        {n ? ", " : ""}
                        <Link href={`/work/${slug}`} className="a">{w.name}</Link>
                      </span>
                    ) : null;
                  })}
                </p>
              </div>
              <div className="meta md:text-right">
                <p className="text-ink">From {usd(s.priceFrom)}</p>
                <Link href={`/services/${s.slug}`} className="a">What&rsquo;s included →</Link>
              </div>
            </div>
          ))}
        </div>
      </Leaf>

      {/* ── price and terms ── */}
      <Leaf label="Price and terms" id="price-h" note={<p>Published so you don&rsquo;t have to ask.</p>}>
        <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
          {[
            ["First project", `From ${usd(PRICING.firstProjectFrom)}, fixed. Scoped to ship in weeks, with a dry-run demo each week.`],
            ["Most projects", `${usd(PRICING.typicalLow)} to ${usd(PRICING.typicalHigh)}, depending on how many systems it touches and how much documentation exists.`],
            ["After handover", `Optional tuning retainer from ${usd(PRICING.retainerFrom)} a month. Many systems don't need one.`],
            ["How fast", `Reply within ${PRICING.replyWithin}. ${AVAILABILITY.start}.`],
            ["What you own", "Everything. Code in your repositories, running in your cloud accounts, with a runbook."],
            ["If I'm unavailable", "Nothing runs on my infrastructure, and every system ships documented, so another engineer can pick it up."],
          ].map(([k, v]) => (
            <div key={k} className="bg-paper p-5">
              <dt className="font-mono text-[12.5px] text-ink-3">{k}</dt>
              <dd className="mt-1.5 text-[16.5px] leading-[1.55]">{v}</dd>
            </div>
          ))}
        </dl>
        <Link href="/process" className="a meta mt-4 inline-block">How a project runs, step by step →</Link>
      </Leaf>

      {/* ── notes ── */}
      {NOTES.length ? (
        <Leaf label="Notes" id="notes-h" note={<p>What building these systems taught me, written down.</p>}>
          <ol className="rule-b">
            {NOTES.slice(0, 4).map((n) => (
              <li key={n.slug}>
                <Link href={`/notes/${n.slug}`} className="row-link gap-x-6 gap-y-1 px-1 sm:grid-cols-[7.5rem_minmax(0,1fr)]">
                  <span className="meta pt-1">{fmtDate(n.published)}</span>
                  <span>
                    <span className="row-title h-section text-[20px]">{n.title}</span>
                    <span className="mt-1 block text-[16px] leading-snug text-ink-2">{n.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Leaf>
      ) : null}

      {/* ── questions ── */}
      <Leaf label="Questions" id="faq-h">
        <FaqList items={FAQ_HOME} />
        <Link href="/faq" className="a meta mt-4 inline-block">All questions →</Link>
      </Leaf>

      <div className="h-6" />
    </div>
    <Cta />
    </>
  );
}
