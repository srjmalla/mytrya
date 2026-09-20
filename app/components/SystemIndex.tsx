import type { System } from "../lib/systems";

export default function SystemIndex({ systems }: { systems: System[] }) {
  return (
    <ol className="mt-1 border-b rule-hair">
      {systems.map((s) => (
        <li key={s.slug} className="border-t rule-hair first:border-t-0">
          <a
            href={`#${s.slug}`}
            className="index-row grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-4 px-1 py-4 sm:grid-cols-[2.5rem_12rem_1fr_7.5rem] sm:gap-x-6"
          >
            <span className="font-mono text-[11px] tnum text-ink-45">{s.n}</span>

            <span className="col-start-2">
              <span className="font-serif text-[19px] leading-tight text-ink">
                {s.name}
              </span>
              <span className="mt-1 block text-[15px] leading-snug text-ink-70 sm:hidden">
                {s.line}
              </span>
              <span className="mt-1.5 block font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-45 sm:hidden">
                {s.stack}
              </span>
            </span>

            <span className="col-start-3 hidden text-[15px] leading-snug text-ink-70 sm:block">
              {s.line}
              <span className="mt-1 block font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-45">
                {s.stack}
              </span>
            </span>

            <span className="col-start-3 row-start-1 text-right font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-45 sm:col-start-4">
              {s.status}
              {s.url ? <span className="text-mark"> &#8599;</span> : null}
              <span className="mt-1 block tnum">{s.year}</span>
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}
