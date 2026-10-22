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
    command: 'meshvy thread "<title>" "<task>" [--repo <repo>]',
    detail: "start a thread; prints its id",
  },
  {
    command: 'meshvy send <id> "<message>"',
    detail: "a follow-up to that thread",
  },
  {
    command: "meshvy threads",
    detail: "every thread and where it stands",
  },
  {
    command: "meshvy context <id>",
    detail: "read what a thread has been doing, without interrupting it",
  },
  {
    command: "meshvy wait <id>",
    detail: "block until it finishes its turn, print its report",
  },
  { command: "meshvy resolve <id>", detail: "put a finished thread away" },
]

const kinds = [
  {
    name: "The coordinator",
    detail:
      "The workspace’s main chat, on the workspace node at the workspace root. You tell it what you want; it starts a thread for each piece of work and reports back. ⇧⌘T starts it or focuses the one already running.",
  },
  {
    name: "A thread",
    detail:
      "One piece of work with its own Claude Code agent, in one repository or at the workspace root. Started by the coordinator, or by you with + on the Threads list or a right-click on a repository.",
  },
  {
    name: "A plain shell",
    detail:
      "No agent at all. ⌘T opens one at the workspace root; the same right-click menu opens one in a repository.",
  },
]

const states = [
  { name: "Needs you", detail: "stopped on a question only you can answer" },
  { name: "Ready", detail: "finished a turn and reported back" },
  { name: "Working", detail: "in the middle of a turn" },
  { name: "Idle", detail: "at its prompt with nothing new to say" },
  { name: "Stopped", detail: "its process has gone; restart it to carry on" },
]

export const metadata: Metadata = docsMetadata(HREF)

export default function Page() {
  return (
    <DocPage href={HREF}>
      <p>
        A workspace works the way a project does in Claude Code. The{" "}
        <strong>coordinator</strong> is its one main chat: you ask for things
        there, and it hands each piece of work to a <strong>thread</strong> — a
        full Claude Code session with its own terminal you can read, interrupt
        and answer. It sends follow-ups to the thread that owns the work and
        tells you, in a line or two, how each one went.
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

      <h2 id="threads">Threads</h2>
      <p>
        One thread per piece of work, not one per repository. Each has a short
        title, and the sidebar lists them under the coordinator with where each
        one stands, whatever wants you sorted first:
      </p>
      <dl className="mt-6 flex flex-col gap-3">
        {states.map((state) => (
          <div key={state.name} className="flex gap-3">
            <dt className="w-24 shrink-0 font-semibold text-paper">
              {state.name}
            </dt>
            <dd>{state.detail}</dd>
          </div>
        ))}
      </dl>
      <p>
        When a thread finishes a turn or needs a decision, Meshvy tells the
        coordinator with a one-line note starting <code>[meshvy]</code>, so it
        can pass on what matters without you watching every terminal. When the
        work is done, <strong>resolve</strong> the thread: it folds away under
        Resolved, nothing is stopped or deleted, and writing to it again reopens
        it.
      </p>

      <h2 id="delegating">How the coordinator starts threads</h2>
      <p>
        Meshvy puts a <code>meshvy</code> helper on the coordinator&rsquo;s
        PATH. It is the whole interface between the coordinator and the board,
        and it is the same one you could run yourself in any terminal in the
        workspace.
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
      <p>
        <code>meshvy spawn &lt;repo&gt; &quot;&lt;task&gt;&quot;</code> and{" "}
        <code>meshvy status</code>, from before threads, still work.
      </p>

      <h2 id="not-sub-agents">Why not Claude&rsquo;s own Agent tool</h2>
      <p>
        It is deliberately avoided for this. Its sub-agents run <em>inside</em>{" "}
        the parent process, with no pid and no pty, so there is nothing a
        terminal can attach to and you cannot watch or steer them. If one gets
        used anyway it still appears on the board as a card read out of the
        parent&rsquo;s transcript, so no work is invisible — it is just not
        something you can type into.
      </p>

      <h2 id="status">Knowing what a thread is doing</h2>
      <p>
        Status comes from the agent itself, not from reading its screen. Every
        session Meshvy starts is handed hooks that report what it is doing, so a
        node carries a strip under its header with the tool in flight, the
        permission it is blocked on, or the first line of what it said when it
        finished.
      </p>
      <p>
        A thread that needs you is marked unread — a dot on its header and in
        the sidebar, a count on the Dock icon, and a notification if you turn
        them on. <strong>⌥⌘N</strong> walks you through whoever is waiting.
      </p>

      <h2 id="model">Model, effort and permission mode</h2>
      <p>
        All three sit in one menu: on the pill in the toolbar, and on every
        thread card. Whatever you pick is what the next thread starts with, and
        it is remembered for next time.
      </p>
      <p>
        On a card it also retunes that session where the CLI allows it.{" "}
        <code>/model</code> and <code>/effort</code> take effect straight away.
        The permission mode is fixed at launch — ⇧⇥ cycles it inside the
        session, or restart the agent from the same menu.
      </p>

      <CodeNode title="on the coordinator's PATH" className="mt-8">
        <span className="text-slate">$ </span>
        <span className="text-paper">meshvy thread </span>
        <span className="text-mint">&quot;Refunds endpoint&quot; </span>
        <span className="text-mint">&quot;add the refunds endpoint&quot; </span>
        <span className="text-sand">--repo api</span>
        {"\n"}
        <span className="text-slate">7f21c0a9e4</span>
      </CodeNode>
    </DocPage>
  )
}
