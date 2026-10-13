import type { Metadata } from "next"
import Image from "next/image"
import {
  GlobeIcon,
  HistoryIcon,
  LayersIcon,
  SquareDashedIcon,
  TerminalIcon,
} from "lucide-react"

import DocPage from "@/components/docs/doc-page"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { docsMetadata } from "@/lib/docs"

const HREF = "/docs/board"

const nodes = [
  {
    icon: SquareDashedIcon,
    name: "The workspace node",
    detail:
      "Hosts the orchestrator's session in its own body and names every repository under it, a chip each, marked when it has uncommitted work.",
  },
  {
    icon: TerminalIcon,
    name: "Terminal nodes",
    detail:
      "The agents and the shells — each a real pty you can read, interrupt and type into.",
  },
  {
    icon: GlobeIcon,
    name: "Browser nodes",
    detail:
      "The running application, drawn purple so they are findable on a board of agents.",
  },
  {
    icon: HistoryIcon,
    name: "Session cards",
    detail:
      "Read from ~/.claude/projects: title, folder, branch, model, prompts sent, tool calls, context size at the last turn, last activity.",
  },
  {
    icon: LayersIcon,
    name: "Sub-agent cards",
    detail:
      "Whatever an agent dispatched that has no terminal of its own, read out of the parent's transcript.",
  },
]

export const metadata: Metadata = docsMetadata(HREF)

export default function Page() {
  return (
    <DocPage href={HREF}>
      <p>
        Five kinds of node, and every edge runs back to the workspace: an agent
        was <em>dispatched</em> by it, a session <em>ran in</em> it, a browser{" "}
        <em>watches</em> what it is building. A session already shown by a
        terminal does not get a second card.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {nodes.map((node) => (
          <Card key={node.name}>
            <CardHeader>
              <node.icon className="size-4 text-mint" />
              <CardTitle className="mt-3">{node.name}</CardTitle>
              <CardDescription>{node.detail}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <h2 id="changes">Changes</h2>
      <p>
        Select a repository — its chip on the workspace node, or its row in the
        sidebar — to see every file it has touched against <code>HEAD</code>:
        modified, added, deleted, renamed and untracked, with per-file{" "}
        <code>+/−</code> counts and a unified diff showing both line numbers.
      </p>
      <p>
        Select the workspace node instead and you get the same list across every
        repository at once, which is the view you want after an orchestrator
        run.
      </p>

      <figure className="node mt-8 overflow-hidden p-1">
        <Image
          src="/shots/changes.png"
          alt="The changes view: every file touched across three repositories, with a unified diff beside the list."
          width={3400}
          height={2040}
          sizes="(min-width: 768px) 48rem, 100vw"
          className="rounded-lg"
        />
      </figure>

      <h2 id="command-palette">⌘K</h2>
      <p>
        One box for starting an agent in any repository, switching workspace,
        jumping to a node by name, branch or path, and changing the permission
        mode. With three characters or more it also searches <em>inside</em>{" "}
        your live terminals and shows the line it matched — the one thing the
        canvas cannot tell you.
      </p>

      <figure className="node mt-8 overflow-hidden p-1">
        <Image
          src="/shots/palette.png"
          alt="The command palette open over the canvas, matching a line inside a running terminal."
          width={3400}
          height={2040}
          sizes="(min-width: 768px) 48rem, 100vw"
          className="rounded-lg"
        />
      </figure>

      <h2 id="zoom">What a node does as you zoom out</h2>
      <p>
        Cards thin out rather than turning to mush. Below 62% they keep a title
        and a status line; below 30% they are a coloured block. A terminal and a
        browser stop drawing their contents at half scale and say where they are
        pointed instead — neither is interrupted, and both come straight back.
      </p>
      <p>
        Drag any node by its title bar, resize from the corner grip,
        double-click one to centre it, and drag the side panels from their inner
        edge.
      </p>
    </DocPage>
  )
}
