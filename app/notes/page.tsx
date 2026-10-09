import Link from "next/link";
import { Breadcrumbs, Cta } from "../components/ui";
import JsonLd from "../components/JsonLd";
import { NOTES } from "../lib/notes";
import { fmtDate } from "../lib/activity";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "Notes on building AI employees and internal tools",
  description:
    "Technical notes from building and running AI systems in production: tool design, measuring agents without ratings, choosing between Intercom Fin, Freddy and a custom agent, and approval steps for actions that touch money.",
  path: "/notes",
});

export default function NotesPage() {
  return (
    <>
      <div className="wrap pb-16 pt-10">
        <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Notes", path: "/notes" }])} />
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Notes", href: "/notes" }]} />
        <h1 className="h-display mt-8 text-[44px] sm:text-[60px]">Notes</h1>
        <p className="mt-6 max-w-[60ch] pb-10 text-[19px] leading-[1.6] text-ink-2">
          What building these systems taught me, written down while it&rsquo;s fresh. Every claim comes from a system in the
          case files.
        </p>
        <ol className="rule-b">
          {NOTES.map((n) => (
            <li key={n.slug}>
              <Link href={`/notes/${n.slug}`} className="row-link gap-x-8 gap-y-1 px-1 md:grid-cols-[8rem_minmax(0,1fr)]">
                <span className="meta pt-1.5">{fmtDate(n.published)}</span>
                <span>
                  <span className="row-title h-section text-[24px]">{n.title}</span>
                  <span className="mt-2 block max-w-[66ch] text-[17px] leading-snug text-ink-2">{n.description}</span>
                  <span className="meta mt-2 block">{n.tags.join(" · ")}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <Cta />
    </>
  );
}
