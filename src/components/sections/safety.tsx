import { CheckIcon } from "lucide-react"

import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { cn } from "@/lib/utils"

const nevers = ["push", "merge", "rebase", "rewrite history", "commit for you"]

const guarantees = [
  {
    title: "Two write commands, both of which you ask for",
    detail:
      "The only git that writes is worktree add and worktree remove. Everything else Meshvy does to a repository is reading.",
  },
  {
    title: "Inspection never contends with an agent",
    detail:
      "Reads run with GIT_OPTIONAL_LOCKS=0, so looking at a tree cannot block the agent working in it — or be blocked by it.",
  },
  {
    title: "Closing a workspace keeps its checkouts",
    detail:
      "Archiving takes it off the board and leaves every worktree registered and every branch where it is. Deleting is a separate choice.",
  },
  {
    title: "The uninstaller refuses to lose work",
    detail:
      "It hands each worktree back with git worktree remove and prunes the origin — but leaves alone any checkout holding uncommitted or unpushed work, and tells you which and why.",
  },
]

export default function Safety() {
  return (
    <section id="safety" className="section-padding">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="what meshvy does not do"
              title="It never pushes, merges, or rewrites history."
              lede="Your repositories are the one thing here that is genuinely irreplaceable. Meshvy treats them as read-only except where you have explicitly said otherwise."
            />

            <ul className="mt-9 flex flex-wrap gap-2">
              {nevers.map((never) => (
                <li
                  key={never}
                  className={cn(
                    "chip gap-2 text-slate",
                    // A hairline through the word: the action is cut, not merely absent.
                    "relative before:absolute before:inset-x-2 before:top-1/2 before:h-px before:bg-slate/60"
                  )}
                >
                  {never}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="divide-y divide-hair overflow-hidden rounded-xl border border-hair">
              {guarantees.map((guarantee) => (
                <li key={guarantee.title} className="flex gap-4 bg-panel p-6">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-mint" />
                  <div>
                    <p className="font-display text-[0.9375rem] font-semibold tracking-[-0.015em] text-paper">
                      {guarantee.title}
                    </p>
                    <p className="mt-1.5 text-sm text-slate">
                      {guarantee.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
