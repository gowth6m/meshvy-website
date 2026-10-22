import type { Metadata } from "next"

import DocPage from "@/components/docs/doc-page"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { docsMetadata } from "@/lib/docs"

const HREF = "/docs/keyboard"

const shortcuts = [
  { action: "Command palette", keys: "⌘K" },
  { action: "New workspace", keys: "⇧⌘N" },
  { action: "Add repositories", keys: "⇧⌘O" },
  { action: "Start or focus the coordinator", keys: "⇧⌘T" },
  { action: "Shell at the workspace root", keys: "⌘T" },
  { action: "New browser", keys: "⌘B" },
  { action: "Archive the workspace", keys: "⌥⌘A" },
  { action: "Next thread waiting on you", keys: "⌥⌘N" },
  { action: "Find", keys: "⌘F · frame the hits ⇧⌘F · clear Esc" },
  { action: "Fit to content", keys: "⌘0 · actual size ⌘1 · zoom ⌘+ / ⌘−" },
  { action: "Toggle sidebar / inspector", keys: "⌥⌘S / ⌥⌘I" },
  { action: "Refresh everything", keys: "⌘R · git only ⇧⌘R" },
  { action: "Every shortcut, in the app", keys: "⌘/" },
]

export const metadata: Metadata = docsMetadata(HREF)

export default function Page() {
  return (
    <DocPage href={HREF}>
      <p>
        Nothing here needs the trackpad. <strong>⌘/</strong> prints the same
        list inside the app, which is the copy that is always current.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-hair bg-panel">
        <Table>
          <TableBody>
            {shortcuts.map((shortcut) => (
              <TableRow key={shortcut.action}>
                <TableCell className="text-paper">{shortcut.action}</TableCell>
                <TableCell className="text-end font-mono text-[0.8125rem] text-mint">
                  {shortcut.keys}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h2 id="canvas">Panning and zooming</h2>
      <p>
        Pan by dragging empty canvas or scrolling; zoom with ⌘-scroll or a
        pinch. Scrolling follows the system &ldquo;natural scrolling&rdquo;
        preference — <strong>View → Invert Scroll Direction</strong> if you want
        the opposite.
      </p>

      <h2 id="hover">Scrolling inside a node</h2>
      <p>
        Resting the pointer on a terminal or a browser for half a second hands
        it the wheel, so a scrollback stays reachable and a page can be
        scrolled. The zoom stays the canvas&rsquo;s either way — a terminal
        magnifies rather than reflowing, so the grid holds and a running program
        is not redrawn on every zoom step.
      </p>

      <h2 id="nodes">Moving nodes</h2>
      <p>
        Drag a node by its title bar, resize it from the corner grip and
        double-click it to centre it. The side panels drag from their inner
        edge.
      </p>
    </DocPage>
  )
}
