import Link from "next/link";
import { AVAILABILITY, PRICING, SITE, usd } from "../lib/site";

/** A notebook leaf: a margin label (and optional note) beside the content. */
export function Leaf({
  label,
  note,
  id,
  children,
  as: Tag = "h2",
}: {
  label: string;
  note?: React.ReactNode;
  id?: string;
  children: React.ReactNode;
  as?: "h2" | "h3";
}) {
  return (
    <section className="leaf" aria-labelledby={id}>
      <div className="leaf-label">
        <Tag id={id} className="kicker">{label}</Tag>
        {note ? <div className="mt-1">{note}</div> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

/** up: live; false: down; null: neither (internal, paused). */
export function StatusDot({ up, label }: { up: boolean | null; label?: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`dot ${up === null ? "" : up ? "dot-live" : "dot-down"}`} aria-hidden />
      {label ?? (up ? "Up" : "Down")}
    </span>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="meta">
      <ol className="flex flex-wrap gap-x-2">
        {items.map((it, i) => (
          <li key={it.href} className="flex gap-x-2">
            {i < items.length - 1 ? (
              <>
                <Link href={it.href} className="hover:text-ink">{it.name}</Link>
                <span aria-hidden>/</span>
              </>
            ) : (
              <span className="text-ink-2" aria-current="page">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Ascii({ alt, art, caption }: { alt: string; art: string; caption?: string }) {
  return (
    <figure className="mt-6">
      <div className="ascii">
        <pre role="img" aria-label={alt}>{art}</pre>
      </div>
      {caption ? <figcaption className="meta mt-2">{caption}</figcaption> : null}
    </figure>
  );
}

export function FaqList({ items, as: Tag = "h3" }: { items: { q: string; a: string }[]; as?: "h2" | "h3" }) {
  return (
    <dl className="rule-b">
      {items.map((f) => (
        <div key={f.q} className="rule-t py-6">
          <dt>
            <Tag className="h-section text-[19px] text-ink">{f.q}</Tag>
          </dt>
          <dd className="mt-2.5 max-w-[68ch] text-[16px] leading-[1.65] text-ink-2">{f.a}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The closing block on every page: what to send, where, and what happens next. */
export function Cta({ title = "Tell me about the process that eats someone's week." }: { title?: string }) {
  return (
    <section className="wrap pb-20 pt-6" aria-labelledby="cta-h">
      <div className="relative overflow-hidden rounded-[20px] border border-line-2 bg-panel px-6 py-14 sm:px-12 sm:py-20">
        <div aria-hidden className="glow pointer-events-none absolute -right-40 -top-40 h-[520px] w-[720px]" />
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative grid gap-10 md:grid-cols-[minmax(0,1fr)_300px] md:items-end">
          <div>
            <p className="kicker inline-flex items-center gap-2"><span className="dot dot-live" aria-hidden />{AVAILABILITY.line} · {AVAILABILITY.start.toLowerCase()}</p>
            <h2 id="cta-h" className="h-display mt-5 max-w-[18ch] text-[36px] sm:text-[52px]">{title}</h2>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.65] text-ink-2">
              What it is, who does it, how often, and what goes wrong when it&rsquo;s late. I reply within{" "}
              {PRICING.replyWithin} with a scoping call or an honest reason it isn&rsquo;t worth automating.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/contact" className="btn btn-ink justify-between">Start a project <span aria-hidden>&rarr;</span></Link>
            <a href={`mailto:${SITE.email}`} className="btn btn-line justify-between">{SITE.email}</a>
            <p className="meta mt-1">First projects from {usd(PRICING.firstProjectFrom)} · fixed price</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Status words on case files map to a dot: running, or simply not public. */
export function workUp(status: string): boolean | null {
  return /live|production/i.test(status) ? true : null;
}
