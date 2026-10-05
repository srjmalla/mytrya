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
        <Tag id={id} className="font-mono text-[12.5px] font-medium text-ink">{label}</Tag>
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
            <Tag className="h-section text-[20px] text-ink">{f.q}</Tag>
          </dt>
          <dd className="mt-2.5 max-w-[66ch] text-[17px] leading-[1.6] text-ink-2">{f.a}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The closing block on every page: what to send, where, and what happens next. */
export function Cta({ title = "Tell me about the process that eats someone's week." }: { title?: string }) {
  return (
    <section className="mt-8 border-t border-ink bg-ink text-paper" aria-labelledby="cta-h">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[minmax(0,1fr)_320px] md:py-20">
        <div>
          <h2 id="cta-h" className="h-display max-w-[20ch] text-[34px] sm:text-[44px]">{title}</h2>
          <p className="mt-5 max-w-[56ch] text-[18px] leading-[1.6] opacity-80">
            What it is, who does it, how often, and what goes wrong when it&rsquo;s late. I reply within{" "}
            {PRICING.replyWithin} with a scoping call or an honest reason it isn&rsquo;t worth automating.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:pt-2">
          <Link href="/contact" className="btn justify-between border-paper bg-paper text-ink hover:border-accent hover:bg-accent hover:text-paper">
            Start a project <span aria-hidden>&rarr;</span>
          </Link>
          <a href={`mailto:${SITE.email}`} className="btn justify-between border-paper/40 text-paper hover:border-paper">
            {SITE.email}
          </a>
          <p className="mt-2 font-mono text-[12.5px] leading-relaxed opacity-70">
            {AVAILABILITY.line} · {AVAILABILITY.start}
            <br />
            First projects from {usd(PRICING.firstProjectFrom)}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Status words on case files map to a dot: running, or simply not public. */
export function workUp(status: string): boolean | null {
  return /live|production/i.test(status) ? true : null;
}
