import Link from "next/link";
import { PRICING, SITE } from "../lib/site";

/** The rising sun behind a section. The parent needs `relative overflow-hidden`. */
export function Sun({ className = "-right-16 -bottom-[260px] h-[520px] w-[520px]" }: { className?: string }) {
  return <div aria-hidden className={`sun ${className}`} />;
}

/** A section with a small label on the left and the content beside it. */
export function Leaf({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="rule-t grid gap-4 py-12 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12 md:py-16">
      <h2 className="kicker">{label}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

/** up: live; null: running but not public. */
export function StatusDot({ up, label }: { up: boolean | null; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`dot ${up ? "dot-live" : ""}`} aria-hidden />
      {label}
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

export function FaqList({ items, as: Tag = "h3" }: { items: { q: string; a: string }[]; as?: "h2" | "h3" }) {
  return (
    <dl className="rule-b">
      {items.map((f) => (
        <div key={f.q} className="rule-t py-6">
          <dt>
            <Tag className="h-section text-[19px] text-ink">{f.q}</Tag>
          </dt>
          <dd className="mt-2.5 max-w-[64ch] text-[16.5px] leading-[1.65] text-ink-2">{f.a}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The closing block on every page. */
export function Cta({ title = "Tell me what's changing in your work." }: { title?: string }) {
  return (
    <section className="wrap pb-20 pt-6" aria-labelledby="cta-h">
      <div className="relative overflow-hidden rounded-[24px] border border-line bg-panel px-6 py-14 sm:px-12 sm:py-20">
        <Sun className="-bottom-[300px] left-1/2 h-[560px] w-[560px] -translate-x-1/2" />
        <div className="relative mx-auto max-w-[620px] text-center">
          <h2 id="cta-h" className="h-display text-[34px] sm:text-[48px]">{title}</h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-ink-2">
            A free 30-minute call. You&rsquo;ll get a reply within {PRICING.replyWithin}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-ink">Book a call</Link>
            <a href={`mailto:${SITE.email}`} className="btn btn-line">{SITE.email}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Status words on case files map to a dot: running and public, or not public. */
export function workUp(status: string): boolean | null {
  return /live/i.test(status) ? true : null;
}
