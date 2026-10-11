/**
 * The Mytrya mark: a lotus. The centre petal carries the saffron accent; the outer petals and the
 * waterline are drawn in the current text colour. Same geometry as app/icon.svg; keep the two in sync.
 */
export default function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <path d="M32 12c7 8 7 22 0 34-7-12-7-26 0-34z" fill="var(--sun)" />
      <path
        d="M30 46C20 42 12 32 12 22c9 2 16 8 19 16M34 46c10-4 18-14 18-24-9 2-16 8-19 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 52h36" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
