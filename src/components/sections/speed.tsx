import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"

const figures = [
  {
    value: "0.35",
    unit: "s",
    claim: "to index 412 MB of transcripts across 145 files, cold.",
    how: "Session metadata comes from a byte scan, not a JSON decode. The indexer memory-maps each transcript and matches literal needles per line, decoding only the few lines whose contents it needs — then caches by size and mtime, and re-scans a grown file from its last complete record.",
  },
  {
    value: "62",
    unit: "ms",
    claim: "to draw the longest session panel. It used to be 265 ms.",
    how: "Opening a session decodes only the tail of its transcript — 24 MB, back from the end. Most are smaller and read whole; the pathological ones now cost the same as the rest, whatever their length.",
  },
  {
    value: "0",
    unit: "",
    claim: "terminals restarted when you pan or zoom.",
    how: "Terminals are owned by a registry, not by the view that shows them. SwiftUI rebuilds node views on every pan and zoom, and creating the emulator there would kill and restart the shell each time. Magnifying scales the container, so a running program is never reflowed.",
  },
]

export default function Speed() {
  return (
    <section className="section-padding">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="how it stays fast"
            title="A board you can keep open all day."
            lede="A canvas that stutters is a canvas you close. These are the three places the work went."
          />
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="heading-gap grid gap-px overflow-hidden rounded-2xl border border-hair bg-hair md:grid-cols-3">
            {figures.map((figure) => (
              <li
                key={figure.claim}
                className="flex flex-col bg-panel p-7 md:p-8"
              >
                <p className="figures font-mono text-5xl leading-none font-medium tracking-[-0.04em] text-paper md:text-6xl">
                  {figure.value}
                  <span className="text-2xl text-mint md:text-3xl">
                    {figure.unit}
                  </span>
                </p>
                <p className="mt-5 text-[0.9375rem] font-medium text-paper">
                  {figure.claim}
                </p>
                <p className="mt-3 text-sm text-slate">{figure.how}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
