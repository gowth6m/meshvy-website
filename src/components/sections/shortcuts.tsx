import Reveal from "@/components/elements/reveal"

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

export default function Shortcuts() {
  return (
    <section className="section-padding">
      <div className="container">
        <Reveal>
          <div className="canvas rounded-2xl border border-hair px-6 py-10 md:px-10 md:py-12">
            <p className="eyebrow">using it</p>
            <h2 className="mt-4 max-w-xl">Reachable without the trackpad.</h2>

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
              page can be scrolled — the zoom stays the canvas&rsquo;s.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
