import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-45">404</p>
      <h1 className="mt-3 font-serif text-[34px] leading-tight">That page isn&rsquo;t here.</h1>
      <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed text-ink-70">
        The old site answered every URL with the home page. This one tells you when something is missing.
      </p>
      <Link href="/" className="btn btn-primary mt-8">Home</Link>
    </div>
  );
}
