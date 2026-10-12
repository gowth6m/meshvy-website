"use client"

import { useEffect, useRef, useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export default function InstallCommand({ className }: { className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "select">("idle")
  const command = useRef<HTMLElement>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  function settle(next: "copied" | "select") {
    setState(next)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState("idle"), 2500)
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.install)
      settle("copied")
    } catch {
      // No clipboard permission, or the page is not on a secure origin. Select
      // the command instead so the keyboard still gets you there — a button
      // that silently does nothing is worse than one that hands you the text.
      const node = command.current
      if (!node) return
      const range = document.createRange()
      range.selectNodeContents(node)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
      settle("select")
    }
  }

  const label =
    state === "copied"
      ? "Install command copied"
      : state === "select"
        ? "Command selected — press Command C to copy"
        : "Copy the install command"

  return (
    <div
      className={cn(
        "group flex items-start gap-2 rounded-xl border border-hair bg-panel py-2 ps-3 pe-2 text-start lg:items-center",
        "transition-colors duration-200 focus-within:border-mint/60 hover:border-slate/50",
        className
      )}
    >
      <span aria-hidden className="font-mono text-sm leading-9 text-mint">
        $
      </span>
      {/* Wraps where there is no room and sits on one line where there is, so
          the command is always readable in full rather than clipped. The box
          is 48rem at most, which fits the whole line only from lg up; below
          that it wraps rather than running under the copy button. */}
      <code
        ref={command}
        className="min-w-0 flex-1 py-2 font-mono text-xs leading-5 break-words whitespace-pre-wrap text-paper/90 lg:overflow-x-auto lg:py-0 lg:text-[0.78125rem] lg:whitespace-nowrap"
      >
        {site.install}
      </code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-slate transition-colors hover:bg-raised hover:text-paper focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none"
      >
        {state === "copied" ? (
          <CheckIcon className="size-4 text-mint" />
        ) : (
          <CopyIcon className="size-4" />
        )}
        <span className="sr-only">{label}</span>
      </button>
      <span aria-live="polite" className="sr-only">
        {state === "idle" ? "" : label}
      </span>
    </div>
  )
}
