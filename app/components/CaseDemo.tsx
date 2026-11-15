"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One support case, played through once when it scrolls into view: what the AI support employee
 * does between the first message and "closed". The case is an invented example; the steps are the
 * ones in the case study (app/lib/work.ts).
 */

const STEPS = [
  "Reads the case",
  "Answers from your own documentation",
  "Reports the bug to engineering",
  "Follows up when the customer goes quiet",
  "Tells the customer when the fix is out",
  "Closes the case",
];

type Item =
  | { kind: "customer" | "reply"; step: number; text: string }
  | { kind: "did"; step: number; text: string };

const FEED: Item[] = [
  { kind: "customer", step: -1, text: "Exporting a full-year report keeps timing out. Is there a way around it?" },
  { kind: "did", step: 0, text: "Read the case and checked the account" },
  { kind: "did", step: 1, text: "Found “Exporting large reports” in the help docs" },
  { kind: "reply", step: 1, text: "Full-year exports are timing out at the moment. Exporting one quarter at a time works, and I’ve passed this to our engineers." },
  { kind: "did", step: 2, text: "Reported the timeout to engineering" },
  { kind: "did", step: 3, text: "No answer after two days, so followed up" },
  { kind: "reply", step: 4, text: "The fix is out. Full-year exports work again." },
  { kind: "did", step: 5, text: "Closed the case" },
];

const STATUS = ["Open", "Open", "Open", "With engineering", "Waiting on customer", "Fixed", "Closed"];

export default function CaseDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(FEED.length);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let played = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !played) {
          played = true;
          setN(1);
          setPlaying(true);
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (n >= FEED.length) {
      const done = setTimeout(() => setPlaying(false), 0);
      return () => clearTimeout(done);
    }
    const next = setTimeout(() => setN((v) => v + 1), FEED[n].kind === "reply" ? 1500 : 1150);
    return () => clearTimeout(next);
  }, [playing, n]);

  const step = FEED[Math.min(n, FEED.length) - 1].step;
  const status = n >= FEED.length ? "Closed" : STATUS[Math.max(0, step + 1)];

  return (
    <div ref={ref} className="case">
      <ol className="case-steps" aria-label="What the AI support employee does">
        {STEPS.map((s, i) => (
          <li key={s} data-state={i < step ? "done" : i === step ? "now" : "next"}>
            <span className="case-tick" aria-hidden />
            {s}
          </li>
        ))}
      </ol>

      <div className="case-window">
        <div className="case-bar">
          <span className="t-small font-bold text-ink">Export keeps timing out</span>
          <span className="case-status" data-closed={status === "Closed" || undefined}>{status}</span>
        </div>
        <ul className="case-feed" aria-live="off">
          {FEED.map((it, i) => (
            <li key={i} className={`case-item case-${it.kind}`} data-on={i < n || undefined}>
              {it.kind === "did" ? (
                <>
                  <span className="case-tick" aria-hidden />
                  {it.text}
                </>
              ) : (
                <>
                  <span className="case-who">{it.kind === "customer" ? "Customer" : "AI support employee"}</span>
                  {it.text}
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="case-foot">
          <p className="meta">An invented example, simplified. On tickets, a person reviews each reply before it goes out.</p>
          <button
            type="button"
            className="btn btn-line btn-sm"
            disabled={playing}
            onClick={() => {
              setN(1);
              setPlaying(true);
            }}
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  );
}
