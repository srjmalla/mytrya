import Link from "next/link";
import { NAV, PERSON, SITE } from "../lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t rule-heavy">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em]">
            {SITE.name}
          </p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-70">
            {SITE.tagline}. Run by {PERSON.name} from {SITE.locality}.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 inline-block font-mono text-[13px] text-mark underline decoration-1 hover:no-underline"
          >
            {SITE.email}
          </a>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-45">Pages</p>
          <ul className="mt-3 space-y-2 text-[14px]">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-ink-70 hover:text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="text-ink-70 hover:text-ink">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-45">Elsewhere</p>
          <ul className="mt-3 space-y-2 text-[14px]">
            <li>
              <a href={SITE.github} rel="me noopener" className="text-ink-70 hover:text-ink">
                GitHub
              </a>
            </li>
            {SITE.linkedin ? (
              <li>
                <a href={SITE.linkedin} rel="me noopener" className="text-ink-70 hover:text-ink">
                  LinkedIn
                </a>
              </li>
            ) : null}
            <li>
              <a href="https://offscript.mytrya.com" className="text-ink-70 hover:text-ink">
                offScript
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2 border-t rule-hair px-5 py-5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-45 sm:px-8">
        <p>© {new Date().getFullYear()} {SITE.name} · {PERSON.name}</p>
        <p>{SITE.locality}, Nepal · UTC+5:45</p>
      </div>
    </footer>
  );
}
