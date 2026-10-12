import Image from "next/image"
import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react"

import InstallCommand from "@/components/elements/install-command"
import Reveal from "@/components/elements/reveal"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"
import { externalLink } from "@/lib/utils"

const needs = [
  {
    term: "macOS 14 or later",
    detail: "Universal — one build for Apple Silicon and Intel.",
  },
  {
    term: "Claude Code, signed in",
    detail:
      "Meshvy drives the claude CLI rather than the API, so install it first.",
    link: { label: "Get Claude Code", href: site.claudeCode },
  },
  {
    term: "Nothing else",
    detail:
      "Releases are signed with a Developer ID and notarised by Apple, so the download opens without a warning.",
  },
]

export default function Install() {
  return (
    <section id="install" className="pt-20 pb-20 md:pt-24 md:pb-28 lg:pt-32">
      <div className="container">
        <Reveal>
          <div className="bloom">
            <div className="node overflow-hidden">
              <div className="px-6 pt-12 pb-10 text-center md:px-12 md:pt-16">
                <p className="eyebrow justify-center">install</p>
                <h2 className="mx-auto mt-4 max-w-xl">
                  Meshvy starts empty. You add the repos.
                </h2>
                <p className="mx-auto mt-5 max-w-lg text-[1.0625rem] text-slate">
                  One command: it downloads the latest release, checks it
                  against the published SHA-256 and installs it to{" "}
                  <span className="font-mono text-sm text-sand">
                    /Applications
                  </span>
                  . Run it again to update.
                </p>

                <div className="mx-auto mt-9 max-w-3xl">
                  <InstallCommand />
                </div>

                <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
                  <Button asChild size="lg">
                    <a href={site.download}>
                      Download the DMG
                      <ArrowDownIcon data-icon="inline-end" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={site.repo} {...externalLink("Read the source")}>
                      Read the source
                      <ArrowUpRightIcon data-icon="inline-end" />
                    </a>
                  </Button>
                </div>

                <dl className="mx-auto mt-12 grid max-w-3xl gap-6 text-start sm:grid-cols-3">
                  {needs.map((need) => (
                    <div key={need.term} className="border-t border-hair pt-4">
                      <dt className="font-mono text-xs text-paper">
                        {need.term}
                      </dt>
                      <dd className="mt-2 text-sm text-slate">
                        {need.detail}
                        {need.link && (
                          <>
                            {" "}
                            <a
                              href={need.link.href}
                              {...externalLink(need.link.label)}
                              className="rounded-sm text-mint underline decoration-mint/40 underline-offset-4 transition-colors hover:decoration-mint focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none"
                            >
                              {need.link.label}
                            </a>
                            .
                          </>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Inset by the node's padding, so its corners sit concentric
                  with the node's own: outer radius minus the inset. */}
              <figure className="mx-1.5 mb-1.5 overflow-hidden rounded-md border-t border-hair md:mx-2 md:mb-2 md:rounded-sm">
                <Image
                  src="/shots/empty.png"
                  alt="Meshvy on first launch: an empty canvas with a prompt to create a workspace."
                  width={3000}
                  height={1880}
                  sizes="(min-width: 1024px) 72rem, 100vw"
                />
              </figure>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
