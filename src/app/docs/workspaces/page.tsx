import type { Metadata } from "next"
import { InfoIcon } from "lucide-react"

import DocPage from "@/components/docs/doc-page"
import CodeNode from "@/components/elements/code-node"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { docsMetadata } from "@/lib/docs"

const HREF = "/docs/workspaces"

const BRANCH = "payments-revamp"
const REPOS = ["api", "web", "worker"]
const COLUMN = Math.max(...REPOS.map((name) => name.length)) + 2

export const metadata: Metadata = docsMetadata(HREF)

export default function Page() {
  return (
    <DocPage href={HREF}>
      <p>
        A feature that spans three services should not mean three checkouts,
        three terminals and three places to lose track of. A workspace is all of
        them, cut once: one branch, checked out as a <code>git worktree</code>{" "}
        in every repository you picked, all under one folder.
      </p>

      <CodeNode title="on disk" className="mt-8">
        <span className="text-paper">~/.meshvy/{BRANCH}/</span>
        {REPOS.map((name) => (
          <span key={name}>
            {"\n  "}
            <span className="text-mint">{name}/</span>
            <span className="text-slate">
              {" ".repeat(COLUMN - name.length)}→ repo &ldquo;{name}&rdquo;
              on{" "}
            </span>
            <span className="text-sand">{BRANCH}</span>
          </span>
        ))}
      </CodeNode>

      <h2 id="creating">Creating one</h2>
      <p>
        <strong>⇧⌘N</strong>, then one step: name the workspace, pick the
        repositories it spans, and choose the base branch to cut from. Meshvy
        cuts the same branch in each of them. Another branch means another
        workspace — a workspace is the branch, so there is nothing to switch
        inside one.
      </p>
      <p>
        <strong>⇧⌘O</strong> adds repositories to a workspace that already
        exists; each new one is cut from its own base at that moment.
      </p>

      <h2 id="worktrees">They are worktrees, not copies</h2>
      <p>
        Every checkout is a real <code>git worktree</code> registered inside
        your own repository. Nothing is cloned, nothing is moved, and your
        existing checkout stays exactly where it is — you can keep working in it
        while agents work in the worktree.
      </p>
      <p>
        That also means they are not ordinary folders. Deleting one with{" "}
        <code>rm</code> leaves your real repository pointing at a checkout that
        no longer exists. Hand them back through Meshvy, or with{" "}
        <code>git worktree remove</code>.
      </p>

      <h2 id="the-node">The workspace node</h2>
      <p>
        The workspace is a node on the canvas, and the parent of everything else
        on it. It names the branch, hosts the orchestrator&rsquo;s Claude Code
        session in its own body — the working directory <em>is</em> that folder
        — and shows a chip per repository, marked when that one has uncommitted
        work.
      </p>
      <p>
        A repository has no node of its own: its chip is where it lives on the
        board, because the board is for what <em>runs</em> in a repository.
        Click a chip for that repository&rsquo;s changes; right-click it to open
        an agent, a shell or a browser there.
      </p>

      <h2 id="archiving">Archiving and deleting</h2>
      <p>
        <strong>⌥⌘A</strong>, or the box in the toolbar, takes a workspace off
        the board and out of the switcher without touching a thing on disk. The
        worktrees stay registered in their repositories and the branch stays
        where it is. Restore it from <strong>Archived</strong> in the workspace
        menu or at the foot of the sidebar, or with <strong>Undo</strong> on the
        banner it leaves.
      </p>

      <Alert className="mt-6">
        <InfoIcon />
        <AlertTitle>Deleting is a separate choice</AlertTitle>
        <AlertDescription>
          Removing the worktrees is its own command, it is not what archiving
          does, and it still asks before it runs.
        </AlertDescription>
      </Alert>
    </DocPage>
  )
}
