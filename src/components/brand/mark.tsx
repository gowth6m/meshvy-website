import { cn } from "@/lib/utils"

// The app's mark, drawn from the same geometry as Resources/brand/mark.svg:
// an M whose vertices are nodes and whose strokes are the edges between them.
// The valley node is the only mint thing in it, as on the canvas.
export default function Mark({
  className,
  live,
}: {
  className?: string
  /** Breathe the centre node, for the one place a mark stands in for a session. */
  live?: boolean
}) {
  return (
    <svg
      viewBox="2 4 44 40"
      fill="none"
      aria-hidden="true"
      className={cn("size-6 text-paper", className)}
    >
      <path
        d="M8 38V10L24 28L40 10V38M8 38L24 28"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="10" r="3.4" fill="currentColor" />
      <circle cx="40" cy="10" r="3.4" fill="currentColor" />
      <circle cx="8" cy="38" r="3.4" fill="currentColor" />
      <circle cx="40" cy="38" r="3.4" fill="currentColor" />
      {live && (
        <circle
          cx="24"
          cy="28"
          r="4.2"
          className="origin-[24px_28px] animate-pulse-node fill-mint motion-reduce:animate-none"
        />
      )}
      <circle cx="24" cy="28" r="4.2" className="fill-mint" />
    </svg>
  )
}

// The mark set beside the name, as it reads in the app's toolbar.
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Mark className="size-6 shrink-0" />
      <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.03em]">
        Meshvy
      </span>
    </span>
  )
}
