import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="wrap py-24">
      <p className="meta">404</p>
      <h1 className="h-display mt-3 text-[40px]">That page isn&rsquo;t here.</h1>
      <p className="mt-4 max-w-[58ch] text-[18px] leading-relaxed text-ink-2">
        It may have moved when the site was rebuilt. The case files and notes are all linked from the home page.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-ink">Home</Link>
        <Link href="/work" className="btn btn-line">Case files</Link>
      </div>
    </div>
  );
}
