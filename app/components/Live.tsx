"use client";

import { useSyncExternalStore } from "react";

function ago(iso: string, now: number) {
  const s = Math.max(0, (now - new Date(iso).getTime()) / 1000);
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} h ago`;
  const d = Math.round(s / 86400);
  return d === 1 ? "yesterday" : `${d} days ago`;
}

/** One shared clock for every live element: ticks every 15 s, null during server render. */
let now = 0;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    now = Date.now();
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 15_000);
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

function useNow(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => (now ||= Date.now()),
    () => null,
  );
}

/** Relative time, recomputed in the browser so a day-old build still reads correctly. Falls back to the date. */
export function Ago({ iso, fallback }: { iso: string; fallback: string }) {
  const t = useNow();
  return <time dateTime={iso} suppressHydrationWarning>{t ? ago(iso, t) : fallback}</time>;
}

/** The current time in Kathmandu. */
export function KathmanduClock() {
  const t = useNow();
  const text = t
    ? new Date(t).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kathmandu" })
    : "--:--";
  return <span suppressHydrationWarning>{text}</span>;
}
