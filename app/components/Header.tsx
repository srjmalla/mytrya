import Link from "next/link";
import NavLinks from "./NavLinks";
import { AVAILABILITY, SITE } from "../lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[rgba(8,9,10,0.78)] backdrop-blur-xl">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${SITE.name}, home`}>
          <span aria-hidden className="grid h-7 w-7 place-items-center rounded-[8px] bg-ink text-[15px] font-bold text-bg transition-colors group-hover:bg-lime">m</span>
          <span className="text-[16px] font-semibold tracking-[-0.01em]">{SITE.name}</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <NavLinks className="rounded-lg px-3 py-1.5 text-[14.5px] text-ink-2 transition-colors hover:bg-white/5 hover:text-ink aria-[current=page]:text-ink" />
        </nav>
        <div className="flex items-center gap-4">
          <span className="meta hidden items-center gap-2 lg:inline-flex">
            <span className={`dot ${AVAILABILITY.open ? "dot-live" : "dot-wait"}`} aria-hidden />
            {AVAILABILITY.line}
          </span>
          <Link href="/contact" className="btn btn-ink !min-h-[36px] !rounded-[9px] !px-3.5 !text-[14px]">Start a project</Link>
        </div>
      </div>
      <nav aria-label="Primary mobile" className="wrap flex gap-1 overflow-x-auto pb-2.5 md:hidden">
        <NavLinks className="whitespace-nowrap rounded-lg px-2.5 py-1 text-[14px] text-ink-2 aria-[current=page]:bg-white/5 aria-[current=page]:text-ink" />
      </nav>
    </header>
  );
}
