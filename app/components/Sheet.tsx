import Link from "next/link";

/** Section header: mono label with a mark, optional meta, rule beneath. */
export function SheetHead({ label, meta, as = "h2" }: { label: string; meta?: string; as?: "h2" | "h3" }) {
  const Tag = as;
  return (
    <div className="sheet-head">
      <Tag className="sheet-label font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink">{label}</Tag>
      {meta ? <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-45">{meta}</p> : null}
    </div>
  );
}

/** A fixed-width monospace figure drawn with box characters, framed like a window. */
export function Diagram({ alt, art, label = "Data flow" }: { alt: string; art: string; label?: string }) {
  return (
    <figure className="frame mt-6">
      <div className="frame-bar">
        <span className="frame-dots" aria-hidden><i /><i /><i /></span>
        <span>{label}</span>
        <span aria-hidden className="hidden sm:inline">Fig.</span>
      </div>
      <div className="diagram graph px-4 py-5 sm:px-6">
        <pre role="img" aria-label={alt} className="text-ink-70">{art}</pre>
      </div>
    </figure>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-45">
      <ol className="flex flex-wrap gap-x-2">
        {items.map((it, i) => (
          <li key={it.href} className="flex gap-x-2">
            {i < items.length - 1 ? (
              <>
                <Link href={it.href} className="hover:text-ink">{it.name}</Link>
                <span aria-hidden>/</span>
              </>
            ) : (
              <span className="text-ink-70" aria-current="page">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Closing call to action used on every page. One primary action, on an inverted panel. */
export function Cta({
  title = "Have a process that runs on someone copying data between two tabs?",
  body = "Describe it: what it is, who does it, how often, and what goes wrong when it's late. I reply within one working day with a scoping call or a reason it isn't worth automating.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="panel-ink mt-20 px-6 py-10 sm:px-10 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em]">
            <span className="mr-2 inline-block h-[7px] w-[7px] bg-mark align-[1px]" aria-hidden />
            Next step
          </p>
          <h2 className="display mt-4 max-w-2xl text-[28px] leading-[1.15] sm:text-[36px]">{title}</h2>
          <p className="muted mt-4 max-w-[58ch] text-[16px] leading-[1.6]">{body}</p>
        </div>
        <div className="flex flex-col gap-3 lg:pt-8">
          <Link href="/contact" className="btn btn-primary btn-lg">Start a project <span className="arrow" aria-hidden>&rarr;</span></Link>
          <Link href="/process" className="btn btn-ghost">How a project runs</Link>
          <p className="muted mt-1 font-mono text-[10.5px] uppercase tracking-[0.1em]">
            Free 30-minute call · one working day
          </p>
        </div>
      </div>
    </section>
  );
}

export function FaqList({ items, as = "h3" }: { items: { q: string; a: string }[]; as?: "h2" | "h3" }) {
  const Tag = as;
  return (
    <dl className="mt-2 divide-y rule-hair border-b rule-hair">
      {items.map((f, i) => (
        <div key={f.q} className="grid gap-x-6 py-5 sm:grid-cols-[2.5rem_minmax(0,1fr)]">
          <span aria-hidden className="hidden pt-1 font-mono text-[11px] tnum text-ink-45 sm:block">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <dt>
              <Tag className="font-serif text-[19px] leading-snug text-ink">{f.q}</Tag>
            </dt>
            <dd className="mt-2 max-w-[66ch] text-[16px] leading-[1.6] text-ink-70">{f.a}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

/** A row of large tabular figures with mono captions. Counts come from the data, never typed in. */
export function Counts({ items }: { items: { n: number | string; label: string }[] }) {
  return (
    <dl className="counts grid grid-cols-2 border-y rule-hair sm:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="py-5">
          <dd className="count text-ink">{typeof it.n === "number" ? String(it.n).padStart(2, "0") : it.n}</dd>
          <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-45">{it.label}</dt>
        </div>
      ))}
    </dl>
  );
}
