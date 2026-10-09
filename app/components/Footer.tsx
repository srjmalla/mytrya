import Link from "next/link";
import { PERSON, SITE } from "../lib/site";

const PAGES = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/notes", label: "Notes" },
  { href: "/process", label: "How a project runs" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="text-[15px]">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_1fr_1fr]">
        <div>
          <p className="font-sans text-[19px] font-bold tracking-[-0.02em]">{SITE.name}</p>
          <p className="mt-3 max-w-[36ch] leading-relaxed text-ink-2">
            {PERSON.name}&rsquo;s practice in {SITE.locality}. AI employees, internal tools and data pipelines for
            small B2B teams.
          </p>
          <a href={`mailto:${SITE.email}`} className="a mt-4 inline-block">{SITE.email}</a>
        </div>
        <div>
          <p className="meta">Pages</p>
          <ul className="mt-3 space-y-1.5">
            {PAGES.map((p) => (
              <li key={p.href}><Link href={p.href} className="text-ink-2 hover:text-ink">{p.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="meta">Elsewhere</p>
          <ul className="mt-3 space-y-1.5">
            <li><a href={SITE.github} rel="me noopener" className="text-ink-2 hover:text-ink">GitHub</a></li>
            {SITE.linkedin ? (
              <li><a href={SITE.linkedin} rel="me noopener" className="text-ink-2 hover:text-ink">LinkedIn</a></li>
            ) : null}
            <li><a href="/feed.xml" className="text-ink-2 hover:text-ink">RSS feed</a></li>
            <li><a href="/llms.txt" className="text-ink-2 hover:text-ink">llms.txt</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap rule-t py-5 meta">
        <p>© {new Date().getFullYear()} {SITE.name} · {PERSON.name} · {SITE.locality}, Nepal · UTC+5:45</p>
      </div>
    </footer>
  );
}
