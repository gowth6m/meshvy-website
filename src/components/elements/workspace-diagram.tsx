"use client"

import { useRef } from "react"
import { FolderGitIcon, GitBranchIcon } from "lucide-react"
import { useInView, useReducedMotion } from "motion/react"

import Mark from "@/components/brand/mark"
import { cn } from "@/lib/utils"

const BRANCH = "payments-revamp"

const repos = [
  { name: "api", status: "4 changed", tone: "sand" },
  { name: "web", status: "clean", tone: "mint" },
  { name: "worker", status: "1 changed", tone: "sand" },
] as const

// The app's own object, drawn in the browser: one workspace node, one edge per
// repository, one worktree at the end of each. The edges draw themselves once,
// because the relationship they encode is the whole point of the section.
export default function WorkspaceDiagram({
  className,
}: {
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)
  const inView = useInView(root, { once: true, margin: "-80px" })
  const reduceMotion = useReducedMotion()
  const drawn = inView || reduceMotion

  return (
    <div ref={root} className={cn("canvas rounded-2xl p-5 md:p-7", className)}>
      {/* The parent: the orchestrator runs in here, at the workspace root. */}
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
          <div className="mt-3 flex flex-wrap gap-1.5">
            {repos.map((repo) => (
              <span key={repo.name} className="chip text-slate">
                <FolderGitIcon className="size-3" />
                {repo.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* The edges. Stretched to the column's width, stroked at a fixed weight. */}
      <svg
        viewBox="0 0 300 56"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="h-14 w-full"
      >
        <g fill="none" stroke="var(--color-hair)" strokeWidth="1.5">
          {[50, 150, 250].map((x, index) => (
            <path
              key={x}
              d={x === 150 ? "M150 0 V56" : `M150 0 C150 30, ${x} 26, ${x} 56`}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={drawn ? 0 : 1}
              style={{
                transition: reduceMotion
                  ? "none"
                  : `stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1) ${index * 110}ms`,
              }}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>

      {/* The children: one git worktree per repository, all on the one branch. */}
      <ul className="grid grid-cols-3 gap-2 md:gap-3">
        {repos.map((repo, index) => (
          <li
            key={repo.name}
            className={cn(
              "node px-2.5 py-2.5 transition-all duration-700 ease-soft md:px-3",
              drawn ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            )}
            style={{
              transitionDelay: reduceMotion ? "0ms" : `${400 + index * 110}ms`,
            }}
          >
            <p className="truncate font-mono text-xs text-paper">{repo.name}</p>
            <p className="mt-1.5 flex items-center gap-1 font-mono text-[0.5625rem] text-sand sm:text-[0.625rem]">
              <GitBranchIcon className="size-2.5 shrink-0" />
              <span className="truncate">{BRANCH}</span>
            </p>
            <p
              className={cn(
                "mt-2 font-mono text-[0.625rem]",
                repo.tone === "mint" ? "text-mint" : "text-sand"
              )}
            >
              {repo.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
