/**
 * The Mytrya mark: an M drawn as one path with rounded joints, its last leg ending in the lime live dot.
 * Same geometry as app/icon.svg; keep the two in sync.
 */
export default function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <path
        d="M15 47V19l17 17 17-17v18"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="49" cy="47" r="5.5" fill="var(--lime)" />
    </svg>
  );
}
