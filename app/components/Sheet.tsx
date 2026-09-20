import Link from "next/link";

/** Section header: mono label, optional meta, rule beneath. */
export function SheetHead({ label, meta, as = "h2" }: { label: string; meta?: string; as?: "h2" | "h3" }) {
  const Tag = as;
  return (
    <div className="sheet-head">
      <Tag className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink">{label}</Tag>
      {meta ? <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-45">{meta}</p> : null}
    </div>
  );
}

/** A fixed-width monospace figure drawn with box characters. */
export function Diagram({ alt, art }: { alt: string; art: string }) {
  return (
    <figure className="mt-6 border rule-hair bg-paper-2">
      <div className="diagram px-4 py-5 sm:px-6">
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

/** Closing call to action used on every page. One primary action. */
export function Cta({
  title = "Have a process that runs on someone copying data between two tabs?",
  body = "Describe it: what it is, who does it, how often, and what goes wrong when it's late. I reply within one working day with a scoping call or a reason it isn't worth automating.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="mt-20 border-t rule-heavy pt-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div>
          <h2 className="max-w-2xl font-serif text-[26px] leading-[1.18] tracking-[-0.01em] sm:text-[32px]">{title}</h2>
          <p className="mt-4 max-w-[58ch] text-[16px] leading-[1.6] text-ink-70">{body}</p>
        </div>
        <div className="flex flex-col gap-3 lg:pt-2">
          <Link href="/contact" className="btn btn-primary btn-lg">Start a project</Link>
          <Link href="/process" className="btn btn-ghost">How a project runs</Link>
        </div>
      </div>
    </section>
  );
}

export function FaqList({ items, as = "h3" }: { items: { q: string; a: string }[]; as?: "h2" | "h3" }) {
  const Tag = as;
  return (
    <dl className="mt-2 divide-y rule-hair border-b rule-hair">
      {items.map((f) => (
        <div key={f.q} className="py-5">
          <dt>
            <Tag className="font-serif text-[19px] leading-snug text-ink">{f.q}</Tag>
          </dt>
          <dd className="mt-2 max-w-[66ch] text-[16px] leading-[1.6] text-ink-70">{f.a}</dd>
        </div>
      ))}
    </dl>
  );
}
