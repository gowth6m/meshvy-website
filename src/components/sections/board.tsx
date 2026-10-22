import Image from "next/image"
import { GlobeIcon, HistoryIcon, TerminalIcon } from "lucide-react"

import FeatureRow from "@/components/elements/feature-row"
import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"

// What the board is made of. A repository is not on this list: it is a chip
// on its workspace node, and the board is for what runs in it.
const sources = [
  {
    icon: HistoryIcon,
    name: "Session cards",
    source: "~/.claude/projects",
    detail:
      "Title, folder, branch, model, prompts sent, tool calls, context size at the last turn, and last activity.",
  },
  {
    icon: TerminalIcon,
    name: "Terminal nodes",
    source: "a real pty",
    detail:
      "The coordinator, the threads it starts, and plain shells — each one you can read, interrupt and type into.",
  },
  {
    icon: GlobeIcon,
    name: "Browser nodes",
    source: "⌘B",
    detail:
      "A real page on the canvas, keeping its cookies between launches and reopening where you left it.",
  },
]

const browserTools = [
  {
    name: "browser_open",
    detail: "point a node at a URL, opening one if there is not one",
  },
  {
    name: "browser_snapshot",
    detail: "the page's text, plus every control with a CSS selector",
  },
  {
    name: "browser_click · browser_type",
    detail: "act on a selector the snapshot handed back",
  },
  {
    name: "browser_console",
    detail: "what the page logged, and what it threw",
  },
  {
    name: "browser_screenshot",
    detail: "a PNG it can read with the Read tool",
  },
  {
    name: "browser_eval · browser_wait_for",
    detail: "run JavaScript · wait for text or an element",
  },
]

export default function Board() {
  return (
    <section id="board" className="section-padding overflow-hidden">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="on the canvas"
            title="The board reads your machine, not your memory."
            lede="Nothing on it is a thing you have to keep in sync. Cards come from the transcripts Claude Code already writes, each repository's state from git itself, and all of it refreshes as the files underneath change."
          />
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="heading-gap grid gap-4 md:grid-cols-3 md:gap-5">
            {sources.map(({ icon: Icon, name, source, detail }) => (
              <li key={name} className="node p-6">
                <Icon className="size-4 text-mint" />
                <h3 className="mt-4">{name}</h3>
                <p className="mt-1.5 font-mono text-[0.6875rem] text-slate">
                  {source}
                </p>
                <p className="mt-3 text-sm text-slate">{detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="container mt-24 space-y-24 md:mt-32 md:space-y-32">
        <FeatureRow
          eyebrow="changes"
          title="Every file the agents touched, across every repo."
          bleed="start"
          shot={{
            src: "/shots/changes.png",
            alt: "The changes inspector listing two modified files in the api repository with a unified diff open beside them.",
            width: 3000,
            height: 1800,
          }}
        >
          <p>
            Select a repository — its chip on the workspace node, or its row in
            the sidebar — to see what it has touched against HEAD: modified,
            added, deleted, renamed, untracked, with per-file{" "}
            <span className="font-mono text-mint">+</span>
            <span className="font-mono text-destructive">−</span> counts and a
            unified diff showing both line numbers.
          </p>
          <p>
            Select the workspace node instead and you get the same list across
            every repository at once, which is the view you actually want after
            a coordinator run.
          </p>
        </FeatureRow>

        <FeatureRow
          eyebrow="the command palette"
          title="⌘K is one box, including the inside of your terminals."
          bleed="end"
          shot={{
            src: "/shots/palette.png",
            alt: "The Meshvy command palette open over the canvas, listing matches across workspaces, repositories and running terminals.",
            width: 3000,
            height: 1800,
          }}
        >
          <p>
            Start an agent in any repository, switch workspace, jump to a node
            by name, branch or path, and change the permission mode — without
            leaving the keyboard.
          </p>
          <p>
            With three characters or more it also searches{" "}
            <em className="text-paper not-italic">inside</em> your live
            terminals and shows the line it matched. That is the one thing the
            canvas itself cannot tell you.
          </p>
        </FeatureRow>
      </div>

      <div className="container mt-24 md:mt-32">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">the browser</p>
            <h3 className="mt-4 font-display text-2xl leading-[1.15] font-semibold tracking-[-0.03em] md:text-[2rem]">
              The app being built, next to the agent building it.
            </h3>
            <div className="mt-5 space-y-4 text-[0.9375rem] text-slate">
              <p>
                A workspace gives you the repositories and the agents. What they
                are building is a running application — so put it on the board
                too. Type{" "}
                <span className="font-mono text-sand">localhost:3000</span> into
                a browser node and watch your app beside the session writing it.
              </p>
              <p>
                The point is that an agent can drive the same page. Every
                session Meshvy starts gets a{" "}
                <span className="font-mono text-mint">browser_*</span> tool set
                over MCP, with no setup from you. Typing fires the events a
                framework listens for, so React and Vue forms see it, and agents
                are told to check the console before claiming a web change
                works.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="divide-y divide-hair overflow-hidden rounded-xl border border-hair">
              {browserTools.map((tool) => (
                <li
                  key={tool.name}
                  className="flex flex-col gap-1 bg-panel px-5 py-4 sm:flex-row sm:items-baseline sm:gap-5"
                >
                  <code className="shrink-0 font-mono text-xs text-mint sm:w-56">
                    {tool.name}
                  </code>
                  <span className="text-sm text-slate">{tool.detail}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate">
              Plus <span className="font-mono">browser_list</span>,{" "}
              <span className="font-mono">browser_navigate</span>,{" "}
              <span className="font-mono">browser_reload</span>,{" "}
              <span className="font-mono">browser_back</span> and{" "}
              <span className="font-mono">browser_close</span>. The engine is
              WebKit — the same one Safari uses — because that is what macOS can
              host inside a node on the canvas.
            </p>
          </Reveal>
        </div>

        {/* The claim above is that an agent reads the console it broke; this
            is that, with the 404 the refunds panel threw sitting in the
            inspector beside the page that threw it. */}
        <Reveal delay={0.12} className="heading-gap">
          <figure className="node overflow-hidden p-1.5 md:p-2">
            <Image
              src="/shots/browser.png"
              alt="A browser node on the canvas showing a running Ledger dashboard, with the inspector beside it reporting the console error the page threw: refunds panel failed to load, GET /v1/refunds — 404."
              width={3600}
              height={1840}
              sizes="(min-width: 1024px) 78rem, 100vw"
              className="rounded-md md:rounded-sm"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
