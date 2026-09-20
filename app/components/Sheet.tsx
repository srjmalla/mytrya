/** Section header: a mono label on the left, meta on the right, rule beneath. */
export function SheetHead({
  label,
  meta,
}: {
  label: string;
  meta?: string;
}) {
  return (
    <div className="sheet-head">
      <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink">
        {label}
      </h2>
      {meta ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-45">
          {meta}
        </p>
      ) : null}
    </div>
  );
}

/** A fixed-width monospace figure, drawn with box characters. */
export function Diagram({ alt, art }: { alt: string; art: string }) {
  return (
    <figure className="mt-8 border rule-hair bg-paper-2">
      <div className="diagram px-4 py-5 sm:px-6">
        <pre role="img" aria-label={alt} className="text-ink-70">
          {art}
        </pre>
      </div>
    </figure>
  );
}
