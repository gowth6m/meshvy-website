import CodeNode from "@/components/elements/code-node"
import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import WorkspaceDiagram from "@/components/elements/workspace-diagram"

const BRANCH = "payments-revamp"

const tree = ["api", "web", "worker"]

// The arrow column lines up on the longest name, one space clear of it.
const COLUMN = Math.max(...tree.map((name) => name.length)) + 2

const notes = [
  {
    term: "It is one branch, not three",
    detail:
      "Name the workspace, pick the repositories, choose the base branch to cut from. Meshvy cuts the same branch in each one. Another branch means another workspace.",
  },
  {
    term: "They are worktrees, not copies",
    detail:
      "Every checkout is a real git worktree registered inside your own repository. Nothing is cloned, nothing is moved, and your existing checkout stays exactly where it is.",
  },
  {
    term: "Archiving touches nothing on disk",
    detail:
      "Take a workspace off the board and the worktrees stay registered and the branch stays put. Deleting them is a separate thing, and it still asks.",
  },
]

export default function Model() {
  return (
    <section id="model" className="section-padding">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="the model"
            title="One branch. Every repo. One folder."
            lede="A feature that spans three services shouldn't mean three checkouts, three terminals and three places to lose track of. A workspace is all of them, cut once."
          />
        </Reveal>

        <div className="heading-gap grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <CodeNode title="on disk">
              <span className="text-paper">~/.meshvy/{BRANCH}/</span>
              {tree.map((name) => (
                <span key={name}>
                  {"\n  "}
                  <span className="text-mint">{name}/</span>
                  <span className="text-slate">
                    {" ".repeat(COLUMN - name.length - 1)}→ repo &ldquo;
                    {name}&rdquo; on{" "}
                  </span>
                  <span className="text-sand">{BRANCH}</span>
                </span>
              ))}
            </CodeNode>

            <dl className="mt-8 space-y-7">
              {notes.map((note) => (
                <div key={note.term}>
                  <dt className="font-display text-[0.9375rem] font-semibold tracking-[-0.015em] text-paper">
                    {note.term}
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] text-slate">
                    {note.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08} className="order-1 lg:order-2">
            <WorkspaceDiagram />
            <p className="mt-4 text-center font-mono text-[0.6875rem] text-slate">
              the workspace node, with a chip for every repo it holds
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
