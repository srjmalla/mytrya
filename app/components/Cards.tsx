import Link from "next/link";
import type { Service } from "../lib/services";
import type { Work } from "../lib/work";

/** First sentence of a paragraph, for card excerpts. */
function firstSentence(s: string): string {
  const m = s.match(/^.*?[.!?](?=\s|$)/);
  return m ? m[0] : s;
}

export function ServiceCard({ s, index }: { s: Service; index: number }) {
  return (
    <Link href={`/services/${s.slug}`} className="card group">
      <div className="flex items-baseline justify-between">
        <span className="card-no" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-45">Service</p>
      </div>
      <h3 className="mt-5 font-serif text-[23px] leading-[1.2] text-ink">{s.name}</h3>
      <p className="mt-3 text-[15px] leading-[1.55] text-ink-70">{firstSentence(s.answer[0])}</p>
      <p className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-mark">
        Read more <span className="arrow" aria-hidden>&rarr;</span>
      </p>
    </Link>
  );
}

function isLive(status: string) {
  return /live|production/i.test(status);
}

export function WorkRow({ w }: { w: Work }) {
  return (
    <Link
      href={`/work/${w.slug}`}
      className="index-row grid grid-cols-[1fr_auto] items-baseline gap-x-4 px-3 py-4 sm:grid-cols-[11rem_1fr_8.5rem] sm:gap-x-6"
    >
      <span>
        <span className="font-serif text-[19px] leading-tight text-ink">{w.name}</span>
        <span className="mt-1 block text-[15px] leading-snug text-ink-70 sm:hidden">{w.line}</span>
        <span className="mt-1.5 block font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-45 sm:hidden">{w.stack}</span>
      </span>
      <span className="hidden text-[15px] leading-snug text-ink-70 sm:block">
        {w.line}
        <span className="mt-1 block font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-45">{w.stack}</span>
      </span>
      <span className="text-right font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-45">
        <span className="inline-flex items-center gap-1.5">
          <span className={`dot ${isLive(w.status) ? "dot-live" : ""}`} aria-hidden />
          {w.status}
          {w.url ? <span className="text-mark"> &#8599;</span> : null}
        </span>
        <span className="mt-1 block">{w.origin}</span>
      </span>
    </Link>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((it) => (
        <li key={it} className="chip">{it}</li>
      ))}
    </ul>
  );
}
