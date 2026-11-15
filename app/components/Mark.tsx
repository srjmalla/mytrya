/**
 * The Mytrya mark: an M drawn as one rising stroke, with the accent on its high point.
 * Same geometry as app/icon.svg (apple-icon.png, favicon.ico and public/logo.png are rendered from it); keep them in sync.
 */
export default function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <path d="M10 50V18l14 20 14-26v38" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter" />
      <rect x="46" y="12" width="9" height="9" fill="var(--sun)" />
      <path d="M50.5 30v20" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
    </svg>
  );
}
