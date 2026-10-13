"use client"

import { useRef } from "react"
import { FolderGitIcon } from "lucide-react"
import { useInView, useReducedMotion } from "motion/react"

import Mark from "@/components/brand/mark"
import { cn } from "@/lib/utils"

const BRANCH = "payments-revamp"

const repos = [
  { name: "api", status: "4 changed", tone: "sand" },
  { name: "web", status: "clean", tone: "mint" },
  { name: "worker", status: "1 changed", tone: "sand" },
] as const

// The app's own object, drawn in the browser: one workspace node, naming the
// branch and holding a chip for every repository in it. That chip is all of a
// repository the board shows — its worktree is a folder on disk, not a node,
// and the board is for what runs in it.
export default function WorkspaceDiagram({
  className,
}: {
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)
  const inView = useInView(root, { once: true, margin: "-80px" })
  const reduceMotion = useReducedMotion()

  return (
    <div ref={root} className={cn("canvas rounded-2xl p-5 md:p-7", className)}>
      {/* The orchestrator runs in here, at the workspace root. */}
      <div className="node">
        <div className="node-bar">
          <Mark className="size-4" live={inView && !reduceMotion} />
          <span className="font-mono text-xs text-paper">{BRANCH}</span>
          <span className="ms-auto inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-mint">
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-mint shadow-[0_0_8px_1px] shadow-mint/50"
            />
            orchestrator
          </span>
        </div>
        <div className="px-4 py-3.5">
          <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-slate uppercase">
            working directory
          </p>
          <p className="mt-1 font-mono text-xs break-all text-paper/90">
            ~/.meshvy/{BRANCH}/
          </p>
          {/* One chip per repository, saying whether it has uncommitted work. */}
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {repos.map((repo) => (
              <li key={repo.name} className="chip text-slate">
                <FolderGitIcon aria-hidden className="size-3" />
                {repo.name}
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 rounded-full",
                    repo.tone === "mint" ? "bg-mint" : "bg-sand"
                  )}
                />
                <span
                  className={cn(
                    "text-[0.625rem]",
                    repo.tone === "mint" ? "text-mint" : "text-sand"
                  )}
                >
                  {repo.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
