import type { Metadata } from "next"

import DocPage from "@/components/docs/doc-page"
import CodeNode from "@/components/elements/code-node"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { docsMetadata } from "@/lib/docs"

const HREF = "/docs/agents"

const commands = [
  {
    command: 'meshvy spawn <repo> "<task>"',
    detail: "start an agent there; prints an agent id",
  },
  {
    command: "meshvy wait <id>",
    detail: "block until it finishes, print what it reported",
  },
  {
    command: 'meshvy send <id> "<message>"',
    detail: "type a follow-up into its terminal",
  },
  {
    command: "meshvy context <id>",
    detail: "read what another agent has been doing",
  },
  {
    command: "meshvy status",
    detail: "every agent on the board and its state",
  },
  { command: "meshvy list", detail: "the repositories this workspace holds" },
]

const kinds = [
  {
    name: "The orchestrator",
    detail:
      "Runs at the workspace root, with every repository as a subdirectory beneath it. ⇧⌘T starts it or focuses the one already running.",
  },
  {
    name: "A per-repo agent",
    detail:
      "Spawned by the orchestrator or by you, with one repository as its working directory. Right-click a repository chip or its row in the sidebar.",
  },
  {
    name: "A plain shell",
    detail:
      "No agent at all. ⌘T opens one at the workspace root; the same right-click menu opens one in a repository.",
  },
]

export const metadata: Metadata = docsMetadata(HREF)

export default function Page() {
  return (
    <DocPage href={HREF}>
      <p>
        Open Claude Code on the workspace node and every repository is a
        subdirectory beneath it, so one orchestrator can put a real agent — with
        its own terminal — on each of them. When it splits the work up, each
        teammate is a full Claude Code session you can read, interrupt and
        answer.
      </p>

      <h2 id="kinds">Three kinds of terminal</h2>
      <dl className="mt-6 flex flex-col gap-6">
        {kinds.map((kind) => (
          <div key={kind.name}>
            <dt className="font-display text-[0.9375rem] font-semibold tracking-[-0.015em] text-paper">
              {kind.name}
            </dt>
            <dd className="mt-1.5">{kind.detail}</dd>
          </div>
        ))}
      </dl>

      <h2 id="delegating">How it delegates</h2>
      <p>
        Meshvy puts a <code>meshvy</code> helper on the orchestrator&rsquo;s
        PATH. It is the whole interface between an agent and the board, and it
        is the same one you could run yourself in any terminal in the workspace.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-hair bg-panel">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[55%]">Command</TableHead>
              <TableHead>What it does</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commands.map((command) => (
              <TableRow key={command.command}>
                <TableCell className="font-mono text-[0.8125rem] text-mint">
                  {command.command}
                </TableCell>
                <TableCell className="text-slate">{command.detail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h2 id="not-sub-agents">Why not Claude&rsquo;s own Agent tool</h2>
      <p>
        It is deliberately avoided for this. Its sub-agents run <em>inside</em>{" "}
        the parent process, with no pid and no pty, so there is nothing a
        terminal can attach to and you cannot watch or steer them. If one gets
        used anyway it still appears on the board as a card read out of the
        parent&rsquo;s transcript, so no work is invisible — it is just not
        something you can type into.
      </p>

      <h2 id="status">Knowing what an agent is doing</h2>
      <p>
        Status comes from the agent itself, not from reading its screen. Every
        session Meshvy starts is handed hooks that report what it is doing, so a
        node carries a strip under its header with the tool in flight, the
        permission it is blocked on, or the first line of what it said when it
        finished.
      </p>
      <p>
        An agent that needs you is marked unread — a dot on its header and in
        the sidebar, a count on the Dock icon, and a notification if you turn
        them on. <strong>⌥⌘N</strong> walks you through whoever is waiting.
      </p>

      <h2 id="model">Model, effort and permission mode</h2>
      <p>
        All three sit in one menu: on the pill in the toolbar, and on every
        agent card. Whatever you pick is what the next agent starts with, and it
        is remembered for next time.
      </p>
      <p>
        On a card it also retunes that session where the CLI allows it.{" "}
        <code>/model</code> and <code>/effort</code> take effect straight away.
        The permission mode is fixed at launch — ⇧⇥ cycles it inside the
        session, or restart the agent from the same menu.
      </p>

      <CodeNode title="on the orchestrator's PATH" className="mt-8">
        <span className="text-slate">$ </span>
        <span className="text-paper">meshvy spawn </span>
        <span className="text-sand">api </span>
        <span className="text-mint">&quot;add the refunds endpoint&quot;</span>
        {"\n"}
        <span className="text-slate">agent_7f21 started in api</span>
      </CodeNode>
    </DocPage>
  )
}
