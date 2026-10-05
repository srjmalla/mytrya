import Link from "next/link";
import NavLinks from "./NavLinks";
import { PERSON, SITE } from "../lib/site";

export default function Header() {
  return (
    <header className="rule-b">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
        <Link href="/" className="group flex items-baseline gap-3" aria-label={`${SITE.name}, home`}>
          <span className="font-sans text-[19px] font-bold tracking-[-0.02em] text-ink group-hover:text-accent">{SITE.name}</span>
          <span className="meta hidden sm:inline">{PERSON.name}</span>
        </Link>
        <nav aria-label="Primary" className="order-3 flex w-full items-center gap-5 overflow-x-auto sm:order-none sm:w-auto sm:gap-7">
          <NavLinks className="whitespace-nowrap font-sans text-[15px] text-ink-2 hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:underline-offset-[6px]" />
        </nav>
        <Link href="/contact" className="btn btn-ink !min-h-[38px] !px-4 !text-[14px]">Contact</Link>
      </div>
    </header>
  );
}
