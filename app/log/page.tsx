import Link from "next/link";
import { Breadcrumbs, Cta, StatusDot } from "../components/ui";
import JsonLd from "../components/JsonLd";
import { ACTIVITY, byDay, fmtDate, productName, productWork } from "../lib/activity";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "Build log: what shipped, day by day",
  description: `Every change shipped to Mytrya's own products, from their commit history: ${ACTIVITY.changes30d} changes in the last 30 days, a ${ACTIVITY.streakWeeks}-week shipping streak. Rebuilt daily.`,
  path: "/log",
});

export default function LogPage() {
  const days = byDay(ACTIVITY.log);
  return (
    <>
      <div className="wrap pb-16 pt-10">
        <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Build log", path: "/log" }])} />
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Build log", href: "/log" }]} />
        <h1 className="h-display mt-8 text-[44px] sm:text-[60px]">Build log</h1>
        <p className="mt-6 max-w-[62ch] text-[19px] leading-[1.6] text-ink-2">
          What shipped to my own products, taken from their commit history and rebuilt every day. Client work isn&rsquo;t
          listed here; it lives in the client&rsquo;s repositories.
        </p>
        <dl className="mt-8 grid max-w-[760px] grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-4">
          {[
            ["Shipping streak", `${ACTIVITY.streakWeeks} weeks`],
            ["Changes, 30 days", String(ACTIVITY.changes30d)],
            ["Products", String(ACTIVITY.products.length)],
            ["Last rebuilt", fmtDate(ACTIVITY.generatedAt)],
          ].map(([k, v]) => (
            <div key={k} className="bg-paper p-4">
              <dt className="meta">{k}</dt>
              <dd className="mt-1 font-sans text-[20px] font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="meta mt-4 flex flex-wrap gap-x-5 gap-y-1">
          {ACTIVITY.products.map((p) => (
            <Link key={p.id} href={`/work/${p.work}`} className="hover:text-ink"><StatusDot up={p.status.up} label={p.name} /></Link>
          ))}
        </p>

        <div className="mt-12">
          {days.map(([day, entries]) => (
            <section key={day} className="leaf !py-6">
              <div className="leaf-label"><h2 className="font-medium text-ink"><time dateTime={day}>{fmtDate(entries[0].date)}</time></h2><p>{entries.length} {entries.length === 1 ? "change" : "changes"}</p></div>
              <ul>
                {entries.map((e, i) => {
                  const work = productWork(e.product);
                  return (
                    <li key={i} className="grid gap-x-6 py-1.5 sm:grid-cols-[8.5rem_minmax(0,1fr)]">
                      <span className="meta">{work ? <Link href={`/work/${work}`} className="hover:text-ink">{productName(e.product)}</Link> : productName(e.product)}</span>
                      <span className="text-[16.5px] leading-snug">{e.message}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <Cta />
    </>
  );
}
