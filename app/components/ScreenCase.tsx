"use client";

import { useEffect, useRef, useState } from "react";

/** The right-hand monitor: one invented support case ticking through, on a loop while it is in view. */
const LOG = [
  "Read the case, checked the account",
  "Found the answer in the help docs",
  "Replied to the customer",
  "Reported the bug to engineering",
  "No answer in two days: followed up",
  "Fix shipped: told the customer",
  "Closed the case",
];

export default function ScreenCase() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(LOG.length);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    let visible = false;
    let i = 0;
    const tick = () => {
      if (!visible) return;
      i = i >= LOG.length ? 0 : i + 1;
      setN(i);
      timer = setTimeout(tick, i >= LOG.length ? 3200 : i === 0 ? 600 : 950);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      clearTimeout(timer);
      if (visible) timer = setTimeout(tick, 700);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={ref} className="screen-case">
      <p className="screen-bar">
        <span>AI support employee</span>
        <span className="screen-status" data-closed={n >= LOG.length || undefined}>{n >= LOG.length ? "Closed" : "Working"}</span>
      </p>
      <p className="screen-ask">“Exporting a full-year report keeps timing out.”</p>
      <ol>
        {LOG.map((l, i) => (
          <li key={l} data-on={i < n || undefined}>{l}</li>
        ))}
      </ol>
      <p className="screen-note">Invented example</p>
    </div>
  );
}
