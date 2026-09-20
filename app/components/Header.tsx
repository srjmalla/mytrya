import Link from "next/link";
import { NAV, SITE } from "../lib/site";

export default function Header() {
  return (
    <header className="border-b rule-hair">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-ink"
          aria-label={`${SITE.name} home`}
        >
          {SITE.name}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-6">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-ink-70 hover:text-ink sm:inline"
            >
              {n.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary">
            Start a project
          </Link>
        </nav>
      </div>
      {/* mobile nav */}
      <nav
        aria-label="Primary mobile"
        className="mx-auto flex max-w-5xl gap-4 overflow-x-auto px-5 pb-3 sm:hidden"
      >
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.12em] text-ink-70"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
