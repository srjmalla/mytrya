"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One support case, stepped through as the AI support employee handles it.
 * Illustrative: the shape, tools and rules are the real system's; the customer,
 * account and wording are invented. No client data.
 */
type Step = {
  title: string;
  when: string;
  say?: { who: string; text: string };
  trace: [string, string][];
};

const STEPS: Step[] = [
  {
    title: "A message comes in",
    when: "Day 1 · 14:02 · chat widget",
    say: { who: "Customer", text: "Our trial ends tomorrow and we're still setting up the board sync. Can we have another week?" },
    trace: [
      ["channel", "chat widget on the product site, signed session"],
      ["intake", "not an auto-reply, not spam → continue"],
      ["brand", "product A profile: its name, its slice of the docs"],
    ],
  },
  {
    title: "It checks who this is",
    when: "14:02 · 0.8 s",
    trace: [
      ["billing.lookup", "trial · ends tomorrow · 6 seats · extensions so far: 0"],
      ["devboard.search", "“board sync” → 1 open item: sync stalls on boards over 5,000 items · in progress"],
      ["identifiers", "account id taken from the session, never from the model"],
    ],
  },
  {
    title: "It reads the policy",
    when: "14:02 · 0.6 s",
    trace: [
      ["kb.search", "“extend trial” → Trials and extensions (published)"],
      ["kb.search", "“board sync large” → Syncing large boards (published)"],
      ["policy", "one extension per account, up to 14 days, a person approves"],
    ],
  },
  {
    title: "It asks before money moves",
    when: "14:03",
    trace: [
      ["tool", "request_trial_extension(days: 7)"],
      ["→ slack", "#billing-approvals: account, reason, history, Approve / Decline"],
      ["state", "waiting for a person; the customer is told it's being arranged"],
    ],
  },
  {
    title: "A person approves",
    when: "14:06 · support lead, in Slack",
    trace: [
      ["approved", "by a human, with one tap"],
      ["billing.update", "trial end moved by 7 days (write gate: on)"],
      ["audit", "who approved, when, what changed"],
    ],
  },
  {
    title: "It replies, with sources",
    when: "14:06",
    say: {
      who: "AI support employee",
      text: "Done: your trial now runs for another week. One thing worth knowing first: on boards over 5,000 items the sync can stall right now. Engineering is on it, and the workaround is in this guide.",
    },
    trace: [
      ["cites", "Trials and extensions · Syncing large boards"],
      ["rule", "product specifics only from a retrieved article; none found → it escalates"],
    ],
  },
  {
    title: "It follows up",
    when: "Day 4 · scheduled",
    trace: [
      ["check", "is the sync connected? → no"],
      ["message", "offers a call, and opens a ticket for engineering"],
      ["devboard", "ticket linked to the open sync item, so the fix reaches this customer"],
    ],
  },
  {
    title: "It closes the case and learns",
    when: "Day 6",
    trace: [
      ["close", "sync connected, customer confirmed → resolved"],
      ["record", "1 approval · 2 articles cited · 1 linked dev item"],
      ["learn", "reviewed in the chat inbox; anything the team would change becomes a learning a person approves"],
    ],
  },
];

export default function Replay() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!playing) return;
    if (i >= STEPS.length - 1) {
      setPlaying(false);
      return;
    }
    timer.current = setTimeout(() => setI((n) => n + 1), 2600);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [playing, i]);

  const go = (n: number) => {
    setPlaying(false);
    setI(Math.max(0, Math.min(STEPS.length - 1, n)));
  };
  const step = STEPS[i];

  return (
    <div className="trace grid md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
      <ol className="hidden border-r border-rule md:block" aria-label="Steps">
        {STEPS.map((s, n) => (
          <li key={s.title}>
            <button
              type="button"
              className="trace-step"
              aria-current={n === i ? "step" : undefined}
              data-done={n < i ? "true" : undefined}
              onClick={() => go(n)}
            >
              <span className="trace-n font-mono text-[12px] tabular-nums">{n < i ? "✓" : String(n + 1).padStart(2, "0")}</span>
              <span className="font-sans text-[14.5px] leading-snug">{s.title}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="flex min-h-[25rem] flex-col p-5 sm:p-7">
        <div aria-live="polite" className="flex-1">
          <p className="meta">
            <span className="md:hidden">Step {i + 1} of {STEPS.length} · </span>
            {step.when}
          </p>
          <h3 className="h-section mt-2 text-[24px]">{step.title}</h3>
          {step.say ? (
            <blockquote className="mt-5 border-l-2 border-accent pl-4">
              <p className="meta">{step.say.who}</p>
              <p className="mt-1 text-[18px] leading-[1.55]">{step.say.text}</p>
            </blockquote>
          ) : null}
          <dl className="mt-5 font-mono text-[12.5px] leading-[1.6]">
            {step.trace.map(([k, v], n) => (
              <div key={n} className="grid gap-x-4 border-t border-rule py-2 sm:grid-cols-[9.5rem_minmax(0,1fr)]">
                <dt className="text-accent">{k}</dt>
                <dd className="text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => go(i - 1)} disabled={i === 0} className="btn btn-line !min-h-[38px] disabled:opacity-35">
            ← Back
          </button>
          <button type="button" onClick={() => go(i + 1)} disabled={i === STEPS.length - 1} className="btn btn-ink !min-h-[38px] disabled:opacity-35">
            Next step →
          </button>
          <button
            type="button"
            onClick={() => {
              if (i === STEPS.length - 1) setI(0);
              setPlaying((p) => !p);
            }}
            className="meta ml-auto underline decoration-rule underline-offset-4 hover:text-ink"
          >
            {playing ? "Pause" : i === STEPS.length - 1 ? "Replay from the start" : "Play it through"}
          </button>
        </div>
      </div>
    </div>
  );
}
