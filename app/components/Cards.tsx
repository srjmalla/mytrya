import Link from "next/link";
import type { Service } from "../lib/services";
import type { Work } from "../lib/work";

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Link href={`/services/${s.slug}`} className="card group">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-45">Service</p>
      <h3 className="mt-2 font-serif text-[22px] leading-snug text-ink">{s.name}</h3>
      <p className="mt-3 text-[15px] leading-[1.55] text-ink-70">{s.answer[0]}</p>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-mark">Read more &rarr;</p>
    </Link>
  );
}

export function WorkRow({ w }: { w: Work }) {
  return (
    <Link
      href={`/work/${w.slug}`}
      className="index-row grid grid-cols-[1fr_auto] items-baseline gap-x-4 px-1 py-4 sm:grid-cols-[11rem_1fr_8rem] sm:gap-x-6"
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
        {w.status}
        {w.url ? <span className="text-mark"> &#8599;</span> : null}
        <span className="mt-1 block">{w.origin}</span>
      </span>
    </Link>
  );
}
