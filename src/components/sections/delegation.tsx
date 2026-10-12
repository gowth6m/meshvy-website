import CodeNode from "@/components/elements/code-node"
import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"

const commands = [
  {
    verb: "spawn",
    args: '<repo> "<task>"',
    note: "start an agent there; prints an agent id",
  },
  {
    verb: "wait",
    args: "<id>",
    note: "block until it finishes, print what it reported",
  },
  {
    verb: "send",
    args: '<id> "<message>"',
    note: "type a follow-up into its terminal",
  },
  {
    verb: "context",
    args: "<id>",
    note: "read what another agent has been doing",
  },
  { verb: "status", args: "", note: "every agent on the board and its state" },
]

const PAD = Math.max(
  ...commands.map((c) => `${c.verb} ${c.args}`.trimEnd().length)
)

const kinds = [
  {
    name: "The orchestrator",
    detail:
      "Runs at the workspace root, with every repository as a subdirectory beneath it.",
  },
  {
    name: "A per-repo agent",
    detail:
      "Spawned by the orchestrator or by you, with one repository as its working directory.",
  },
  {
    name: "A plain shell",
    detail:
      "No agent at all. Sometimes you just want a prompt in the right place.",
  },
]

export default function Delegation() {
  return (
    <section id="delegation" className="section-padding">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="delegation"
            title="Every delegated agent is a terminal you can type into."
            lede="When the orchestrator splits the work up, each teammate is a full Claude Code session with its own terminal node — one you can read, interrupt and answer. It delegates through a helper Meshvy puts on its PATH."
          />
        </Reveal>

        <Reveal delay={0.06} className="heading-gap">
          <CodeNode title="on the orchestrator's PATH">
            {commands.map(({ verb, args, note }) => {
              const call = `${verb} ${args}`.trimEnd()
              return (
                <span key={verb}>
                  <span className="text-mint">meshvy </span>
                  <span className="text-paper">{verb}</span>
                  {args && <span className="text-sand"> {args}</span>}
                  <span className="text-slate">
                    {" ".repeat(PAD - call.length + 3)}# {note}
                  </span>
                  {"\n"}
                </span>
              )
            })}
          </CodeNode>
        </Reveal>

        <div className="heading-gap grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            {/*
              The strongest claim on the page, so it gets the page's only
              pull quote and the mint rule that goes with it.
            */}
            <blockquote className="border-s-2 border-mint ps-6">
              <p className="font-display text-xl leading-[1.35] font-semibold tracking-[-0.025em] text-paper md:text-2xl">
                Claude&rsquo;s own Agent tool is deliberately avoided for this.
              </p>
              <p className="mt-4 text-[0.9375rem] text-slate">
                Its sub-agents run{" "}
                <em className="text-paper not-italic">inside</em> the parent
                process, with no pid and no pty, so there is nothing a terminal
                can attach to — and nothing you can watch or steer. If one gets
                used anyway it still appears as a card, read from the
                parent&rsquo;s transcript, so no work is invisible.
              </p>
            </blockquote>

            <div className="mt-8 border-t border-hair pt-8">
              <h3>Status comes from the agent, not from its screen</h3>
              <p className="mt-3 text-[0.9375rem] text-slate">
                Every session Meshvy starts is handed hooks that report what it
                is doing. A node carries a strip under its header with the tool
                in flight, the permission it is blocked on, or the first line of
                what it said when it finished. An agent that needs you is marked
                unread — on its header, in the sidebar, and on the Dock icon.{" "}
                <kbd className="chip text-paper">⌥⌘N</kbd> walks you through
                whoever is waiting.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="eyebrow">three kinds of terminal</p>
            <ul className="mt-5 divide-y divide-hair overflow-hidden rounded-xl border border-hair">
              {kinds.map((kind) => (
                <li key={kind.name} className="bg-panel px-5 py-4">
                  <p className="font-display text-[0.9375rem] font-semibold tracking-[-0.015em] text-paper">
                    {kind.name}
                  </p>
                  <p className="mt-1 text-sm text-slate">{kind.detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
