import Link from "next/link";
import Mark from "./Mark";
import { NAV, PERSON, SITE } from "../lib/site";

export default function Footer() {
  return (
    <footer className="rule-t text-[15px]">
      <div className="wrap flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="flex items-center gap-2.5 text-[17px] font-bold"><Mark className="h-6 w-6 text-ink" />{SITE.name}</p>
          <p className="mt-3 max-w-[36ch] leading-relaxed text-ink-2">Helping small teams change with AI.</p>
          <a href={`mailto:${SITE.email}`} className="a mt-3 inline-block">{SITE.email}</a>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {[...NAV, { href: "/contact", label: "Contact" }].map((p) => (
            <li key={p.href}><Link href={p.href} className="text-ink-2 hover:text-ink">{p.label}</Link></li>
          ))}
          {SITE.linkedin ? <li><a href={SITE.linkedin} rel="me noopener" className="text-ink-2 hover:text-ink">LinkedIn</a></li> : null}
        </ul>
      </div>
      <div className="wrap rule-t py-5 meta">
        <p>© {new Date().getFullYear()} {SITE.name} · {PERSON.name}</p>
      </div>
    </footer>
  );
}
