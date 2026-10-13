import {
  CpuIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  TerminalIcon,
} from "lucide-react"

import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { site } from "@/lib/site"

// Why it being a Mac app is a feature and not a limitation. Each of these is
// something a cross-platform shell could not do, or could not do this way.
const traits = [
  {
    icon: CpuIcon,
    title: "Swift and SwiftUI, one dependency",
    detail:
      "No Electron, no bundled browser runtime, nothing to warm up. A universal binary for Apple Silicon and Intel on macOS 14 and later.",
  },
  {
    icon: TerminalIcon,
    title: "Real terminals, not transcripts",
    detail:
      "Every terminal node is an actual pty driving the SwiftTerm emulator, so a scrollback stays a scrollback and a TUI still draws.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Signed, notarised, and checkable",
    detail:
      "Releases are signed with a Developer ID and notarised by Apple. The release workflow gates on proving it, and the script that proves it ships with the source.",
  },
  {
    icon: RefreshCwIcon,
    title: "It updates itself, and can fall back",
    detail:
      "A newer release shows up as a pill in the toolbar with its notes. If the swap ever fails the old bundle goes back, so an update cannot leave you with nothing installed.",
  },
]

const shortcuts = [
  { keys: "⌘K", label: "Command palette" },
  { keys: "⇧⌘N", label: "New workspace" },
  { keys: "⇧⌘O", label: "Add repositories" },
  { keys: "⇧⌘T", label: "Start or focus the orchestrator" },
  { keys: "⌘T", label: "Shell at the workspace root" },
  { keys: "⌘B", label: "New browser" },
  { keys: "⌥⌘A", label: "Archive the workspace" },
  { keys: "⌥⌘N", label: "Next agent waiting on you" },
  { keys: "⌘F", label: "Find · ⇧⌘F frames the hits" },
  { keys: "⌘0", label: "Fit to content · ⌘1 actual size" },
  { keys: "⌥⌘S", label: "Toggle the sidebar · ⌥⌘I the inspector" },
  { keys: "⌘/", label: "Every shortcut, in the app" },
]

export default function Mac() {
  return (
    <section id="mac" className="section-padding">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="built for mac"
            title="A native app, not a web page in a window."
            lede="Meshvy is Swift all the way down, with one dependency and no runtime shipped beside it. It behaves like a Mac app because it is one — real ptys, real windows, and a bundle Apple has notarised."
          />
        </Reveal>

        {/* A spec sheet rather than cards: hairline over each column, the way
            the app's inspector lists what a node is made of. */}
        <div className="heading-gap grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {traits.map((trait, index) => (
            <Reveal key={trait.title} delay={index * 0.06}>
              <div className="border-t border-hair pt-5">
                <trait.icon className="size-4 text-mint" />
                <p className="mt-4 font-display text-[0.9375rem] font-semibold tracking-[-0.015em] text-paper">
                  {trait.title}
                </p>
                <p className="mt-1.5 text-sm text-slate">{trait.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 md:mt-20">
          <div className="canvas rounded-2xl border border-hair px-6 py-10 md:px-10 md:py-12">
            <p className="eyebrow">the keyboard</p>
            {/* h3, not h2: the section above already owns the heading. */}
            <h3 className="mt-4 max-w-xl font-display text-2xl leading-[1.15] font-semibold tracking-[-0.03em] md:text-[2rem]">
              Reachable without the trackpad.
            </h3>

            <ul className="mt-12 grid gap-x-10 gap-y-px sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
              {shortcuts.map((shortcut) => (
                <li
                  key={shortcut.keys}
                  className="flex items-baseline gap-4 border-b border-hair/60 py-4"
                >
                  <kbd className="w-12 shrink-0 font-mono text-[0.8125rem] text-mint">
                    {shortcut.keys}
                  </kbd>
                  <span className="text-sm text-slate">{shortcut.label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-2xl text-sm text-slate">
              Pan by dragging empty canvas or scrolling; zoom with ⌘-scroll or a
              pinch. Resting the pointer on a terminal or a browser for half a
              second hands it the wheel, so a scrollback stays reachable and a
              page can be scrolled — the zoom stays the canvas&rsquo;s. The rest
              is in{" "}
              <a
                href={site.docs}
                className="rounded-sm text-mint underline decoration-mint/40 underline-offset-4 transition-colors hover:decoration-mint focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none"
              >
                the docs
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
