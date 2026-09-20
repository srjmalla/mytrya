import type { System } from "../lib/systems";
import { Diagram } from "./Sheet";

export default function Teardown({ system: s }: { system: System }) {
  return (
    <article id={s.slug} className="system scroll-mt-8 border-t rule-heavy pt-7">
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="flex items-baseline gap-4">
          <span className="system-no font-mono text-[11px] tnum text-ink-45">
            {s.n}
          </span>
          <span className="font-serif text-[28px] leading-none tracking-[-0.01em] sm:text-[34px]">
            {s.name}
          </span>
        </h3>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-45">
          {s.origin} · {s.status} · <span className="tnum">{s.year}</span>
        </p>
      </header>

      <div className="mt-3 max-w-2xl pl-0 sm:pl-[3.5rem]">
        <p className="text-[17px] italic leading-snug text-ink-70">{s.line}</p>
        {s.url ? (
          <a
            href={s.url}
            className="mt-2 inline-block font-mono text-[12px] text-mark underline decoration-1 hover:no-underline"
          >
            {s.url.replace(/^https:\/\//, "")} &#8599;
          </a>
        ) : null}
      </div>

      <div className="mt-10 grid gap-y-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-x-14">
        {/* ── spec column ── */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <p className="border-b rule-hair pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-45">
            Specification
          </p>
          <dl className="mt-0">
            {s.spec.map((row) => (
              <div key={row.k} className="border-b rule-hair py-2.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-45">
                  {row.k}
                </dt>
                <dd className="mt-1 text-[14px] leading-snug text-ink">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── body column ── */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-45">
            The problem
          </p>
          {s.problem.map((p, i) => (
            <p
              key={i}
              className="mt-3 max-w-[62ch] text-[17px] leading-[1.6] text-ink"
            >
              {p}
            </p>
          ))}

          <Diagram alt={s.diagram.alt} art={s.diagram.art} />

          {s.ladder ? (
            <figure className="mt-8">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    {s.ladder.head.map((h) => (
                      <th
                        key={h}
                        className="border-b rule-heavy pb-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-45 first:w-[5.5rem]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.ladder.rows.map(([wait, heard]) => (
                    <tr key={wait}>
                      <td className="border-b rule-hair py-2.5 pr-4 align-top font-mono text-[12px] tnum text-mark">
                        {wait}
                      </td>
                      <td className="border-b rule-hair py-2.5 align-top text-[15px] leading-snug text-ink-70">
                        {heard}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <figcaption className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-45">
                {s.ladder.caption}
              </figcaption>
            </figure>
          ) : null}

          {s.notes.map((note) => (
            <section key={note.heading} className="mt-10">
              <h4 className="font-serif text-[20px] leading-snug text-ink">
                {note.heading}
              </h4>
              {note.body.map((p, i) => (
                <p
                  key={i}
                  className="mt-3 max-w-[62ch] text-[17px] leading-[1.6] text-ink-70"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
