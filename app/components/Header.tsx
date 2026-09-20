import Link from "next/link";
import NavLinks from "./NavLinks";
import { SITE } from "../lib/site";

export default function Header() {
  return (
    <header className="site-header border-b rule-hair">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-ink"
          aria-label={`${SITE.name} home`}
        >
          <span aria-hidden className="block h-[9px] w-[9px] bg-mark transition-transform duration-300 group-hover:rotate-45" />
          {SITE.name}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-6">
          <span className="hidden items-center gap-6 sm:flex">
            <NavLinks className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-70 hover:text-ink" />
          </span>
          <Link href="/contact" className="btn btn-primary">
            Start a project
          </Link>
        </nav>
      </div>
      {/* mobile nav */}
      <nav
        aria-label="Primary mobile"
        className="mx-auto flex max-w-5xl gap-5 overflow-x-auto px-5 pb-3 sm:hidden"
      >
        <NavLinks className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.12em] text-ink-70" />
      </nav>
    </header>
  );
}
