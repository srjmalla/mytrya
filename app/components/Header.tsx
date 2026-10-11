import Link from "next/link";
import Mark from "./Mark";
import NavLinks from "./NavLinks";
import { SITE } from "../lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/80 backdrop-blur-xl">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE.name}, home`}>
          <Mark className="h-7 w-7 text-ink" />
          <span className="text-[16px] font-bold tracking-[-0.01em]">{SITE.shortName}</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <NavLinks className="rounded-full px-3.5 py-1.5 text-[14.5px] font-medium text-ink-2 transition-colors hover:text-ink aria-[current=page]:text-ink" />
        </nav>
        <Link href="/contact" className="btn btn-ink !min-h-[38px] !px-4 !text-[14px]">Book a call</Link>
      </div>
      <nav aria-label="Primary mobile" className="wrap flex gap-1 overflow-x-auto pb-2.5 md:hidden">
        <NavLinks className="whitespace-nowrap rounded-full px-3 py-1 text-[14px] font-medium text-ink-2 aria-[current=page]:bg-panel-2 aria-[current=page]:text-ink" />
      </nav>
    </header>
  );
}
