"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * The hero: the support console with cases moving through it. Illustrative: the
 * channels, tools, hand-off rules and console sections are the real system's; the
 * customers and wording are invented. No client data.
 */

type Kind = "work" | "wait" | "done" | "human";
type Step = { tool: string; text: string; kind?: Kind };
type Case = {
  id: number;
  channel: "Chat widget" | "Ticket" | "Live chat";
  subject: string;
  customer: string;
  steps: Step[];
  outcome: string;
  end: Kind;
};

const CASES: Case[] = [
  {
    id: 4182,
    channel: "Chat widget",
    subject: "Webhooks stopped firing since yesterday",
    customer: "Pro plan, signed in",
    steps: [
      { tool: "intake", text: "not an auto-reply, not spam · brand A profile" },
      { tool: "kb.search", text: "“Webhook retries” covers delivery, not silence" },
      { tool: "devboard.search", text: "nothing open on webhooks" },
      { tool: "reply", text: "asks for the endpoint and the last delivery ID", kind: "wait" },
      { tool: "customer", text: "“Endpoint returns 500 since the deploy last night.”" },
      { tool: "devboard.create", text: "bug filed with payload, account and timeline" },
      { tool: "reply", text: "sent: cause, workaround, linked to the dev item" },
      { tool: "follow_up", text: "scheduled: re-read in 24 h" },
    ],
    outcome: "Diagnosed · bug filed · following up",
    end: "done",
  },
  {
    id: 4183,
    channel: "Ticket",
    subject: "CSV export fails on our big board",
    customer: "Pro plan, 40 seats",
    steps: [
      { tool: "kb.search", text: "no article covers it → no product claims" },
      { tool: "devboard.search", text: "known bug: export times out over 5k items" },
      { tool: "devboard.comment", text: "customer linked to the open item" },
      { tool: "draft", text: "workaround + status, as a private note" },
      { tool: "learn", text: "human edited the draft → judged, learning proposed" },
    ],
    outcome: "Linked to dev item · learning proposed",
    end: "done",
  },
  {
    id: 4184,
    channel: "Ticket",
    subject: "Quiet since the workaround · follow-up",
    customer: "Pro plan, 40 seats · day 2",
    steps: [
      { tool: "schedule", text: "24 h since the last reply · agent re-opens the case" },
      { tool: "ticket.read", text: "no answer from the customer" },
      { tool: "devboard.read", text: "linked item moved to Done · fix shipped" },
      { tool: "draft", text: "“the fix is live, here is what changed”" },
      { tool: "ticket.close", text: "closed with a note · reopens if they write back", kind: "done" },
    ],
    outcome: "Closed on its own schedule",
    end: "done",
  },
  {
    id: 4185,
    channel: "Live chat",
    subject: "How do I add a teammate?",
    customer: "Starter plan",
    steps: [
      { tool: "kb.search", text: "“Inviting your team” · rerank 0.93" },
      { tool: "reply", text: "answered with the article link · 38 s" },
    ],
    outcome: "Resolved on first reply",
    end: "done",
  },
  {
    id: 4186,
    channel: "Chat widget",
    subject: "Is SSO on the roadmap?",
    customer: "Visitor, not signed in",
    steps: [
      { tool: "kb.search", text: "nothing published on SSO" },
      { tool: "rule", text: "no article, no answer → don't guess" },
      { tool: "request_human", text: "handed over with a written summary", kind: "human" },
    ],
    outcome: "With a person · summary attached",
    end: "human",
  },
  {
    id: 4187,
    channel: "Ticket",
    subject: "Login loop after enabling SSO",
    customer: "Business plan, 120 seats",
    steps: [
      { tool: "intake", text: "topic: login loop after SSO · 3rd today" },
      { tool: "kb.search", text: "no article · devboard.search: nothing open" },
      { tool: "escalate", text: "Slack, with the 3 tickets summarised → engineering", kind: "wait" },
      { tool: "engineer", text: "“Reproduced. Rolling back the IdP change.”" },
      { tool: "devboard.create", text: "item opened · 3 tickets linked" },
      { tool: "draft", text: "holding reply for all three, as private notes" },
      { tool: "kb.draft", text: "“Login loop after SSO” proposed for review" },
      { tool: "brief", text: "tomorrow’s morning brief: 3 tickets, 3.4× the daily average" },
    ],
    outcome: "Escalated · 3 tickets linked · article drafted",
    end: "done",
  },
];

const SIDEBAR = ["Today", "Chats", "Drafts", "Knowledge base", "Evals", "Analytics", "System"];
const TICK = 1300;

function StatusPill({ kind, label }: { kind: Kind; label: string }) {
  const tone =
    kind === "work"
      ? "text-lime border-lime/30 bg-lime/[0.07]"
      : kind === "wait"
        ? "text-amber border-amber/30 bg-amber/[0.07]"
        : kind === "human"
          ? "text-ink-2 border-line-2 bg-white/[0.03]"
          : "text-ink-3 border-line bg-transparent";
  return (
    <span className={`inline-flex h-[22px] items-center gap-1.5 rounded-full border px-2 font-mono text-[11px] whitespace-nowrap ${tone}`}>
      {kind === "work" ? <span className="dot dot-live !h-[5px] !w-[5px]" /> : kind === "wait" ? <span className="dot dot-wait !h-[5px] !w-[5px]" /> : kind === "done" ? <span>✓</span> : <span>→</span>}
      {label}
    </span>
  );
}

export default function Console() {
  // How many cases have arrived, and how far the newest one has got.
  const [{ arrived, step }, setClock] = useState({ arrived: 4, step: 2 });
  const [picked, setPicked] = useState<number | null>(null);
  const pause = useRef(0);

  useEffect(() => {
    const t = setInterval(() => {
      if (Date.now() < pause.current) return;
      setClock(({ arrived, step }) => {
        const active = CASES[(arrived - 1) % CASES.length];
        // When the newest case is finished, the next one arrives.
        return step < active.steps.length ? { arrived, step: step + 1 } : { arrived: arrived + 1, step: 0 };
      });
    }, TICK);
    return () => clearInterval(t);
  }, []);

  // Newest first; the list shows up to five.
  const rows = useMemo(() => {
    const out: { c: Case; n: number; progress: number }[] = [];
    for (let n = arrived - 1; n >= Math.max(0, arrived - 5); n--) {
      const c = CASES[n % CASES.length];
      out.push({ c, n, progress: n === arrived - 1 ? step : c.steps.length });
    }
    return out;
  }, [arrived, step]);

  const selected = rows.find((r) => r.n === picked) ?? rows[0];
  const shown = selected.c.steps.slice(0, selected.progress);
  const finished = selected.progress >= selected.c.steps.length;
  const waiting = shown.at(-1)?.kind === "wait" && !finished;
  const status: { kind: Kind; label: string } = finished
    ? { kind: selected.c.end, label: selected.c.end === "human" ? "With a person" : "Resolved" }
    : waiting
      ? { kind: "wait", label: "Waiting on a person" }
      : { kind: "work", label: "Working" };
  const waitingOn = rows.filter((r) => r.progress < r.c.steps.length && r.c.steps[r.progress - 1]?.kind === "wait").length;

  return (
    <div className="window">
      <div className="window-bar">
        <span className="window-dots" aria-hidden><i /><i /><i /></span>
        <span className="ml-1 truncate">support console</span>
        <span className="ml-auto inline-flex items-center gap-2"><span className="dot dot-live" aria-hidden />live</span>
      </div>
      <div className="grid min-h-[420px] md:grid-cols-[150px_minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* sidebar */}
        <ul className="hidden border-r border-line p-2.5 text-[13px] md:block" aria-hidden>
          {SIDEBAR.map((s, i) => (
            <li key={s} className={`flex items-center justify-between rounded-md px-2.5 py-1.5 ${i === 1 ? "bg-white/[0.06] text-ink" : "text-ink-3"}`}>
              {s}
              {s === "Today" && waitingOn ? <span className="font-mono text-[11px] text-amber">{waitingOn}</span> : null}
              {s === "Chats" ? <span className="font-mono text-[11px] text-ink-3">{rows.length}</span> : null}
            </li>
          ))}
        </ul>

        {/* case list */}
        <ul className="border-b border-line md:border-r md:border-b-0" aria-label="Cases">
          {rows.map((r, i) => {
            const done = r.progress >= r.c.steps.length;
            const wait = !done && r.c.steps[r.progress - 1]?.kind === "wait";
            const active = r.n === selected.n;
            return (
              <li key={r.n} className={i === 0 ? "enter" : ""}>
                <button
                  type="button"
                  onClick={() => {
                    setPicked(r.n);
                    pause.current = Date.now() + 9000;
                  }}
                  className={`block w-full border-b border-line px-3.5 py-3 text-left transition-colors ${active ? "bg-white/[0.045]" : "hover:bg-white/[0.025]"} ${i > 2 ? "hidden md:block" : ""}`}
                >
                  <span className="flex items-center justify-between gap-2 font-mono text-[11px] text-ink-3">
                    <span>#{r.c.id + Math.floor(r.n / CASES.length) * 10} · {r.c.channel}</span>
                    <span className={`dot ${done ? (r.c.end === "human" ? "" : "!bg-lime/50") : wait ? "dot-wait" : "dot-live"}`} aria-hidden />
                  </span>
                  <span className={`mt-1 block truncate text-[13.5px] ${active ? "text-ink" : "text-ink-2"}`}>{r.c.subject}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* case detail */}
        <div className="flex min-w-0 flex-col p-4 sm:p-5" aria-live="polite">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-mono text-[11px] text-ink-3">{selected.c.channel} · {selected.c.customer}</p>
              <p className="mt-1 text-[15.5px] font-medium leading-snug text-ink">{selected.c.subject}</p>
            </div>
            <StatusPill kind={status.kind} label={status.label} />
          </div>
          <ol className="mt-4 flex-1 space-y-0 font-mono text-[12px] leading-[1.5]">
            {shown.map((s, k) => (
              <li key={k} className={`grid grid-cols-[1rem_minmax(0,1fr)] gap-2 border-t border-line py-2 ${k === shown.length - 1 && !finished ? "enter" : ""}`}>
                <span className={s.kind === "wait" && k === shown.length - 1 && !finished ? "text-amber" : "text-lime"}>
                  {s.kind === "wait" && k === shown.length - 1 && !finished ? "◷" : "✓"}
                </span>
                <span className="min-w-0">
                  <span className="text-ink">{s.tool}</span>
                  <span className="text-ink-3"> · {s.text}</span>
                </span>
              </li>
            ))}
            {!finished ? (
              <li className="grid grid-cols-[1rem_minmax(0,1fr)] gap-2 border-t border-line py-2 text-ink-3">
                <span className="dot dot-live mt-[5px] !h-[5px] !w-[5px]" />
                <span>{waiting ? "waiting for a person to answer" : "working…"}</span>
              </li>
            ) : (
              <li className="mt-1 border-t border-line pt-3 text-[12px] text-lime">{selected.c.outcome}</li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
