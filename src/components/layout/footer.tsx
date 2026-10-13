import Link from "next/link"

import Mark from "@/components/brand/mark"
import { site } from "@/lib/site"
import { externalLink } from "@/lib/utils"

const columns = [
  {
    // The nav keeps four entries; the footer is where the sections the
    // Features link covers get named one by one.
    heading: "Meshvy",
    links: [
      { label: "The model", href: "#model" },
      { label: "Delegation", href: "#delegation" },
      { label: "The board", href: "#board" },
      { label: "Built for Mac", href: "#mac" },
      { label: "Safety", href: "#safety" },
      { label: "Install", href: "#install" },
    ],
  },
  {
    heading: "Source",
    links: [
      { label: "GitHub", href: site.repo, external: true },
      { label: "Docs", href: site.docs },
      { label: "Changelog", href: site.changelog, external: true },
      { label: "Releases", href: site.releases, external: true },
      { label: "Licence", href: site.licence, external: true },
    ],
  },
  {
    heading: "Needs",
    links: [{ label: "Claude Code", href: site.claudeCode, external: true }],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-hair">
      <div className="container py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,minmax(0,0.6fr))] md:gap-8">
          <div className="max-w-xs">
            <Mark className="size-7" />
            <p className="mt-5 text-sm text-slate">
              A native macOS app for running coding agents across several
              repositories at once, on an infinite canvas.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              {/* The same label as every eyebrow; font-normal undoes the base h2 weight. */}
              <h2 className="eyebrow font-normal">{column.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => {
                  const className =
                    "rounded-sm text-sm text-slate transition-colors hover:text-paper focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none"
                  const external = "external" in link && link.external

                  return (
                    <li key={link.label}>
                      {/* A route goes through next/link; a hash and anything
                          off-site stay plain anchors. */}
                      {!external && link.href.startsWith("/") ? (
                        <Link href={link.href} className={className}>
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          {...(external ? externalLink(link.label) : {})}
                          className={className}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-hair pt-8 text-xs text-slate md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl">
            Source-available, not open source. You may run Meshvy and fork or
            modify it for your own use, including at work — you may not
            redistribute it or offer it to others as a service. The terminal
            emulator,{" "}
            <a
              href="https://github.com/migueldeicaza/SwiftTerm"
              {...externalLink("SwiftTerm")}
              className="text-paper/80 underline decoration-hair underline-offset-4 hover:decoration-slate"
            >
              SwiftTerm
            </a>
            , is MIT-licensed by its own authors.
          </p>
          <p className="shrink-0 font-mono">
            Built by{" "}
            <a
              href={site.authorUrl}
              {...externalLink(site.author)}
              className="rounded-sm text-paper/80 underline decoration-hair underline-offset-4 transition-colors hover:text-paper hover:decoration-slate focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none"
            >
              {site.author}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
