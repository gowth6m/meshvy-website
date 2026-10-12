import { cn } from "@/lib/utils"

type CodeNodeProps = {
  /** What the app would put in the node's title bar. */
  title?: string
  /** Shown at the end of the title bar — a branch, a count, a state. */
  meta?: React.ReactNode
  children: React.ReactNode
  className?: string
}

// A node whose body is monospaced: a shell, a tree, a file listing. The same
// chrome as every other node on the page, so code and canvas read as one thing.
export default function CodeNode({
  title,
  meta,
  children,
  className,
}: CodeNodeProps) {
  return (
    // min-w-0: as a grid or flex child this defaults to min-width:auto, which
    // sizes to the <pre>'s unwrapped content and pushes the page wider than
    // the viewport instead of letting the pre scroll inside it.
    <div className={cn("node min-w-0 overflow-hidden", className)}>
      {title && (
        <div className="node-bar">
          <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-slate uppercase">
            {title}
          </span>
          {meta && <span className="ms-auto">{meta}</span>}
        </div>
      )}
      {/* Scrolls rather than wraps, and keeps its scrollbar: on a narrow
          screen the comment column runs off the edge and you need to know. */}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.78125rem] leading-[1.75] md:px-5">
        {children}
      </pre>
    </div>
  )
}
