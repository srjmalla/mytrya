import { SheetHead, Cta, Breadcrumbs } from "../components/Sheet";
import JsonLd from "../components/JsonLd";
import { STEPS, PRINCIPLES } from "../lib/process";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "How a project runs",
  description:
    "Four steps: a free scoping call, a written spec with a fixed price, a build with weekly dry-run demos, and a handover into your own repos with a runbook. What you get, and the rules every system is built under.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Process", path: "/process" }])} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Process", href: "/process" }]} />
      <h1 className="mt-4 max-w-3xl font-serif text-[34px] leading-[1.12] tracking-[-0.015em] sm:text-[44px]">
        How a project with Mytrya runs
      </h1>
      <div className="prose mt-6">
        <p className="!text-ink">
          A project runs in four steps: a free scoping call, a written spec with a fixed price, a build you watch
          in dry-run every week, and a handover into your own repositories with documentation and a runbook.
        </p>
        <p>
          Fixed scope and fixed price means the number doesn&rsquo;t move once we&rsquo;ve agreed the spec. If the
          spec changes, we write down the change and the new number before anyone builds it.
        </p>
      </div>

      <section className="mt-12">
        <SheetHead label="The four steps" />
        <ol className="mt-2">
          {STEPS.map((s) => (
            <li key={s.n} className="grid gap-x-10 gap-y-3 border-b rule-hair py-8 md:grid-cols-[3rem_minmax(0,1fr)_16rem]">
              <p className="font-mono text-[12px] tnum text-ink-45">{s.n}</p>
              <div>
                <h2 className="font-serif text-[24px] leading-snug">{s.title}</h2>
                <div className="prose mt-3">{s.body.map((p, i) => <p key={i}>{p}</p>)}</div>
              </div>
              <div className="border-t rule-heavy pt-3 md:border-t-0 md:border-l md:pl-6 md:pt-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-45">You get</p>
                <p className="mt-2 text-[15px] leading-snug text-ink">{s.output}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <SheetHead label="What handover includes" />
          <ul className="prose mt-2">
            <li>The code, in your GitHub or GitLab organisation, with history</li>
            <li>Deployed in your cloud accounts: Vercel, Cloudflare, AWS, or wherever you already are</li>
            <li>A README that gets a new engineer running locally in under an hour</li>
            <li>A runbook: what to check when it misbehaves, how to turn each integration off, who to call</li>
            <li>The dry-run console, so your team can rehearse changes before shipping them</li>
            <li>A recorded walkthrough with whoever will own it</li>
          </ul>
        </div>
        <div>
          <SheetHead label="After handover" />
          <div className="prose mt-4">
            <p>
              Ongoing tuning is an optional monthly retainer. It covers monitoring, model and dependency updates,
              and small changes. Many systems don&rsquo;t need one; the runbook is written so that yours might not.
            </p>
            <p>
              Fixes for anything that doesn&rsquo;t match the spec are included, for as long as the spec is the spec.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SheetHead label="Rules every system is built under" meta={`${PRINCIPLES.length}`} />
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

      <Cta title="Ready for step one?" body="The scoping call is free and takes about thirty minutes. Bring the process, not a solution." />
    </div>
  );
}
