import { Fragment } from "react";
import Link from "next/link";
import { Cta, FaqList, StatusDot, workUp } from "./components/ui";
import Office from "./components/Office";
import ScreenCase from "./components/ScreenCase";
import CaseDemo from "./components/CaseDemo";
import { WORK } from "./lib/work";
import { FAQ_HOME } from "./lib/faq";
import { PERSON, PHILOSOPHY, SITE } from "./lib/site";
import { STEPS } from "./lib/process";
import { meta } from "./lib/meta";

export const metadata = meta({
  title: `${SITE.name} · Bring AI into your business, in a way that lasts`,
  ogTitle: `${SITE.name} · The world is changing. Rise with it.`,
  description: SITE.description,
  path: "/",
});

const HEADLINE = "The world is changing. Rise with it".split(" ");

const BUILDS = [
  { title: "Finding where AI fits", body: "We start from your work, not from the tools: what is worth handing to AI now, what isn't yet, and what to do first." },
  { title: "AI employees", body: "Most of our work today. They take a whole job off your team, such as support, and hand off to a person when they should." },
  { title: "Tools and automation", body: "Morning summaries for the people who decide, and the copying, chasing and sorting that eats someone's week." },
];

export default function Home() {
  const [lead, ...rest] = ["support-agent-platform", "offscript", "nepse-copilot"]
    .map((s) => WORK.find((w) => w.slug === s))
    .filter((w): w is (typeof WORK)[number] => Boolean(w));

  return (
    <div className="home">
      <Office
        copy={
          <>
            <h1 className="h-display t-office">
              {HEADLINE.map((w, i) => (
                <Fragment key={i}>
                  <span className="rise-in" style={{ "--i": i + 1 } as React.CSSProperties}>
                    {w}
                    {i === HEADLINE.length - 1 && <span className="text-sun">.</span>}
                  </span>{" "}
                </Fragment>
              ))}
            </h1>
            <p className="rise-in mt-5 max-w-[44ch] t-body text-ink-2" style={{ "--i": 9 } as React.CSSProperties}>
              Mytrya helps you bring AI into your business in a way that lasts, so your team stays calm and keeps growing.
            </p>
            <div className="rise-in mt-7 flex flex-wrap gap-3" style={{ "--i": 11 } as React.CSSProperties}>
              <Link href="/contact" className="btn btn-ink">Book a call</Link>
              <Link href="/work" className="btn btn-line">See the work</Link>
            </div>
          </>
        }
      >
        <Link href="/work/support-intelligence" className="screen screen-left" aria-label="Support Intelligence, case study">
          <span className="screen-brief">
            <span className="screen-bar">
              <span>Morning summary</span>
              <span className="screen-status">Support desk</span>
            </span>
            <span className="screen-ask">What kept coming up yesterday</span>
            <span className="brief-row"><b>Export timeouts</b><i>Product: fix is in review</i></span>
            <span className="brief-row"><b>Invoice wording</b><i>Sales: confuses buyers</i></span>
            <span className="brief-row"><b>Setup steps</b><i>Marketing: guide skips one</i></span>
            <span className="screen-note">Invented example</span>
          </span>
        </Link>
        <Link href={`/work/${lead.slug}`} className="screen screen-right" aria-label={`${lead.name}, case study`}>
          <ScreenCase />
        </Link>
        <Link href="/process" className="board" aria-label="How a project runs">
          <span className="board-title">How a project runs</span>
          {STEPS.map((st, i) => (
            <span key={st.title} className="board-step">{i + 1}. {st.title}</span>
          ))}
        </Link>
        <Link href="/contact" className="pin pin-phone">Book a call</Link>
        <Link href="/faq" className="pin pin-notes">Before you write</Link>
      </Office>

      <section className="band" aria-labelledby="why-h">
        <div className="wrap">
          <h2 id="why-h" className="h-display lit max-w-[19ch] t-statement">
            {PHILOSOPHY.line.split(" ").map((w, i) => (
              <Fragment key={i}>
                <span style={{ "--i": i } as React.CSSProperties}>{w}</span>{" "}
              </Fragment>
            ))}
          </h2>
          <ul className="mt-16 grid gap-x-12 gap-y-10 md:mt-24 md:grid-cols-3">
            {PHILOSOPHY.principles.map((p, i) => (
              <li key={p.title}>
                <Glyph kind={i} />
                <h3 className="h-section mt-6 t-title">{p.title}</h3>
                <p className="mt-2 max-w-[34ch] t-body-sm text-ink-2">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="build-h">
        <div className="wrap">
          <h2 id="build-h" className="h-display max-w-[16ch] t-section">AI that fits the way you already work.</h2>
          <dl className="offer mt-12 md:mt-16">
            {BUILDS.map((b) => (
              <div key={b.title} className="offer-row">
                <dt className="h-display t-offer">{b.title}</dt>
                <dd className="max-w-[46ch] t-body text-ink-2">{b.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="band" aria-labelledby="work-h">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="work-h" className="h-display max-w-[14ch] t-section">Running today. Watch one case.</h2>
            <Link href={`/work/${lead.slug}`} className="a t-label">Read the case study</Link>
          </div>
          <p className="mt-5 max-w-[56ch] t-body text-ink-2">{lead.line}.</p>
          <CaseDemo />

          <ol className="rule-b mt-16">
            {rest.map((w) => (
              <li key={w.slug}>
                <Link href={`/work/${w.slug}`} className="row-link gap-x-8 gap-y-2 md:grid-cols-[minmax(0,1fr)_10rem]">
                  <span>
                    <span className="row-title h-section block t-title transition-colors">{w.name}</span>
                    <span className="mt-1.5 block max-w-[60ch] t-body-sm text-ink-2">{w.line}.</span>
                  </span>
                  <span className="meta md:pt-1.5 md:text-right"><StatusDot up={workUp(w.status)} label={w.status} /></span>
                </Link>
              </li>
            ))}
          </ol>
          <Link href="/work" className="a mt-6 inline-block t-label">All work</Link>
        </div>
      </section>

      <section className="band" aria-labelledby="who-h">
        <div className="wrap grid items-center gap-10 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)] md:gap-20">
          <div className="portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PERSON.image} alt={PERSON.name} width={720} height={720} loading="lazy" />
          </div>
          <div>
            <h2 id="who-h" className="h-display t-section">You&rsquo;ll work with {PERSON.name}.</h2>
            <p className="mt-6 max-w-[50ch] t-body text-ink-2">
              I run Mytrya. The person on your first call is the person who works with you all the way, from
              deciding where AI fits to looking after it once it&rsquo;s running.
            </p>
            <p className="mt-4 max-w-[50ch] t-body text-ink-2">
              I&rsquo;m also a musician, an actor and, lately, a golfer, though the ball hasn&rsquo;t fully agreed on that
              last one. Mostly it means I&rsquo;ve spent my life learning new things from scratch.
            </p>
            <Link href="/about" className="btn btn-line mt-8">About Mytrya</Link>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="faq-h">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div>
            <h2 id="faq-h" className="h-display t-section">Before you write</h2>
            <Link href="/faq" className="a mt-6 inline-block t-label">All questions</Link>
          </div>
          <FaqList items={FAQ_HOME} />
        </div>
      </section>

      <Cta />
    </div>
  );
}

/** Three small drawings for the three principles: rooted, held at the centre, widening. */
function Glyph({ kind }: { kind: number }) {
  return (
    <svg viewBox="0 0 64 64" className="glyph" aria-hidden>
      {kind === 0 && (
        <>
          <rect x="26" y="10" width="12" height="12" className="glyph-fill" />
          <path d="M8 34h48" />
          <path d="M32 22v24M32 46l-14 10M32 46l14 10M32 46v12" />
        </>
      )}
      {kind === 1 && (
        <>
          <rect x="26" y="26" width="12" height="12" className="glyph-fill" />
          <path d="M12 44c4 8 12 12 20 12s16-4 20-12M12 20c4-8 12-12 20-12s16 4 20 12" />
        </>
      )}
      {kind === 2 && (
        <>
          <rect x="27" y="27" width="10" height="10" className="glyph-fill" />
          <circle cx="32" cy="32" r="12" />
          <circle cx="32" cy="32" r="21" strokeDasharray="3 5" />
        </>
      )}
    </svg>
  );
}
