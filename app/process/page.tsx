import { Breadcrumbs, Cta, Leaf } from "../components/ui";
import JsonLd from "../components/JsonLd";
import { STEPS } from "../lib/process";
import { PRICING, usd } from "../lib/site";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "How a project runs: scope, fixed price, dry-run demos, handover",
  description:
    "A free scoping call, a written spec with a fixed price, a build you watch in dry-run every week, and a handover into your own repos with a runbook. What you get at each step, and what it costs.",
  path: "/process",
});

export default function ProcessPage() {
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How a project with Mytrya Intelligence runs",
    step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body.join(" ") })),
  };
  return (
    <>
      <div className="wrap pb-16 pt-10">
        <JsonLd data={[breadcrumbs([{ name: "Home", path: "/" }, { name: "Process", path: "/process" }]), howTo]} />
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Process", href: "/process" }]} />
        <h1 className="h-display mt-8 max-w-[18ch] text-[44px] sm:text-[60px]">How a project runs</h1>
        <div className="mt-6 max-w-[62ch] space-y-4 pb-12 text-[19px] leading-[1.6] text-ink-2">
          <p className="text-ink">
            A free scoping call, a written spec with a fixed price, a build you watch in dry-run every week, and a handover
            into your own repositories with documentation and a runbook.
          </p>
          <p>
            Fixed price means the number doesn&rsquo;t move once we&rsquo;ve agreed the spec. If the spec changes, we write
            down the change and the new number before anyone builds it. First projects start at{" "}
            {usd(PRICING.firstProjectFrom)}.
          </p>
        </div>

        {STEPS.map((s, i) => (
          <Leaf key={s.n} label={`Step ${i + 1}`} note={<p>You get: {s.output}</p>}>
            <h2 className="h-section text-[28px]">{s.title}</h2>
            <div className="prose-note mt-4">{s.body.map((p, k) => <p key={k}>{p}</p>)}</div>
          </Leaf>
        ))}

        <Leaf label="What handover includes">
          <ul className="prose-note">
            <li>The code, in your GitHub or GitLab organisation, with history</li>
            <li>Deployed in your cloud accounts: Vercel, Cloudflare, AWS, or wherever you already are</li>
            <li>A README that gets a new engineer running locally in under an hour</li>
            <li>A runbook: what to check when it misbehaves, how to turn each integration off, who to call</li>
            <li>The dry-run console, so your team can rehearse changes before shipping them</li>
            <li>A recorded walkthrough with whoever will own it</li>
          </ul>
        </Leaf>

        <Leaf label="After handover">
          <div className="prose-note">
            <p>
              Ongoing tuning is an optional retainer from {usd(PRICING.retainerFrom)} a month. It covers monitoring, model
              and dependency updates, and small changes. Many systems don&rsquo;t need one; the runbook is written so that
              yours might not.
            </p>
            <p>Fixes for anything that doesn&rsquo;t match the spec are included, for as long as the spec is the spec.</p>
          </div>
        </Leaf>
      </div>
      <Cta title="Step one is a thirty-minute call." />
    </>
  );
}
