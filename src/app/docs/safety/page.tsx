import type { Metadata } from "next"
import { CheckIcon } from "lucide-react"

import DocPage from "@/components/docs/doc-page"
import { Badge } from "@/components/ui/badge"
import { docsMetadata } from "@/lib/docs"
import { site } from "@/lib/site"

const HREF = "/docs/safety"

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
      "Archiving takes it off the board and leaves every worktree registered and every branch where it is. Deleting is a separate choice, and it asks.",
  },
  {
    title: "The uninstaller refuses to lose work",
    detail:
      "It leaves alone any checkout holding uncommitted or unpushed work, and tells you which and why.",
  },
]

export const metadata: Metadata = docsMetadata(HREF)

export default function Page() {
  return (
    <DocPage href={HREF}>
      <p>
        Your repositories are the one thing here that is genuinely
        irreplaceable. Meshvy treats them as read-only except where you have
        explicitly said otherwise, and there are only two places where that
        applies.
      </p>

      <h2 id="never">What it never does</h2>
      <ul className="mt-6 flex list-none flex-wrap gap-2 ps-0">
        {nevers.map((never) => (
          <li key={never} className="mt-0">
            <Badge
              variant="secondary"
              // A hairline through the word: the action is cut, not absent.
              className="relative font-mono text-slate before:absolute before:inset-x-2 before:top-1/2 before:h-px before:bg-slate/60"
            >
              {never}
            </Badge>
          </li>
        ))}
      </ul>

      <h2 id="guarantees">The guarantees behind that</h2>
      <ul className="mt-6 flex list-none flex-col gap-4 ps-0">
        {guarantees.map((guarantee) => (
          <li
            key={guarantee.title}
            className="mt-0 flex gap-4 rounded-xl border border-hair bg-panel p-5"
          >
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-mint" />
            <div>
              <p className="mt-0 font-display text-[0.9375rem] font-semibold tracking-[-0.015em] text-paper">
                {guarantee.title}
              </p>
              <p className="mt-1.5 text-sm">{guarantee.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      <h2 id="agents">What an agent can still do</h2>
      <p>
        Meshvy does not write to your repositories, but the agents it runs are
        Claude Code, and they do what Claude Code does: edit files, run
        commands, and commit if you have asked them to. The permission mode on
        an agent card is what governs that, and it is fixed when the session
        launches — ⇧⇥ cycles it inside the session, or restart the agent from
        the same menu.
      </p>

      <h2 id="licence">Licence</h2>
      <p>
        Source-available, not open source. You may run Meshvy and fork or modify
        it for your own use, including at work — you may not redistribute it or
        a derivative, or offer it to others as a service. The full terms are in
        the{" "}
        <a href={site.licence} target="_blank" rel="noreferrer">
          LICENSE
        </a>
        .
      </p>
    </DocPage>
  )
}
