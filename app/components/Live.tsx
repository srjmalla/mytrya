"use client";

import { useEffect, useState } from "react";

function ago(iso: string, now: number) {
  const s = Math.max(0, (now - new Date(iso).getTime()) / 1000);
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} h ago`;
  const d = Math.round(s / 86400);
  return d === 1 ? "yesterday" : `${d} days ago`;
}

function useNow(every = 30_000) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), every);
    return () => clearInterval(t);
  }, [every]);
  return now;
}

/** Relative time, recomputed in the browser so a day-old build still reads correctly. Falls back to the date. */
export function Ago({ iso, fallback }: { iso: string; fallback: string }) {
  const now = useNow();
  return <time dateTime={iso} suppressHydrationWarning>{now ? ago(iso, now) : fallback}</time>;
}

/** The current time in Kathmandu. */
export function KathmanduClock() {
  const now = useNow(15_000);
  const text = now
    ? new Date(now).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kathmandu" })
    : "--:--";
  return <span suppressHydrationWarning>{text}</span>;
}
