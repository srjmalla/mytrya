"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "../lib/site";

export default function NavLinks({ className }: { className: string }) {
  const path = usePathname();
  return (
    <>
      {NAV.map((n) => {
        const active = path === n.href || path.startsWith(`${n.href}/`);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`nav-link ${className}`}
          >
            {n.label}
          </Link>
        );
      })}
    </>
  );
}
