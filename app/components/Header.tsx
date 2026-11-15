import Link from "next/link";
import Mark from "./Mark";
import NavLinks from "./NavLinks";
import { SITE } from "../lib/site";

export default function Header() {
  return (
    <header className="site-header sticky top-0 z-40">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE.name}, home`}>
          <Mark className="h-7 w-7 text-ink" />
          <span className="t-body-sm font-bold tracking-[-0.01em]">{SITE.shortName}</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <NavLinks className="rounded-full px-3.5 py-1.5 t-small font-medium text-ink-2 transition-colors hover:text-ink aria-[current=page]:text-ink" />
        </nav>
        <Link href="/contact" className="btn btn-ink btn-sm">Book a call</Link>
      </div>
      <nav aria-label="Primary mobile" className="wrap flex gap-1 overflow-x-auto pb-2.5 md:hidden">
        <NavLinks className="whitespace-nowrap rounded-full px-3 py-1 t-small font-medium text-ink-2 aria-[current=page]:bg-line aria-[current=page]:text-ink" />
      </nav>
    </header>
  );
}
