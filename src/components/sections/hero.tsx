import { Fragment } from "react"
import Image from "next/image"
import { ArrowDownIcon } from "lucide-react"

import HeroMesh from "@/components/elements/hero-mesh"
import InstallCommand from "@/components/elements/install-command"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

// Set as one string and split here, so the claim stays one editable sentence
// rather than a list of words somebody has to reassemble to read.
const HEADLINE = "The infinite canvas for orchestrating AI agents"

// 45ms a word: long enough to read as a sequence, short enough that the whole
// line — the page's largest paint — is up inside a second.
const WORD_STAGGER = 45

export default function Hero() {
  return (
    // The pill floats over this section rather than pushing it down, so the
    // top padding has to clear it and then leave the headline room to breathe:
    // 40px of air under a 88px headline read as crowding.
    //
    // `isolate` so the backdrop can sit at a negative z-index without falling
    // behind the canvas grid that the whole page is drawn on.
    <section className="relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/*
        The backdrop: the app's own canvas, live. Nodes in the margins, edges
        drawing themselves in as the page lands, and work moving along them.
        Masked away from the centre so it never competes with the claim.
      */}
      {/* Only from md up: the mesh lives in the page's side margins, and a
          phone has none — `slice` crops a 390px window straight through the
          masked-out centre and leaves one stray arc under the nav. */}
      <HeroMesh className="absolute inset-x-0 top-0 -z-10 hidden h-[54rem] md:block" />

      {/* The mint light under the canvas, drifting. It is the same colour the
          board below is lit with, so the two read as one light source. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[32rem] w-[52rem] -translate-x-1/2 animate-haze rounded-full opacity-70 blur-3xl motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--color-mint) 14%, transparent), transparent 68%)",
        }}
      />

      <div className="container">
        {/*
          The statement and the action, budgeted so the board below still
          breaks the fold on an 800px laptop. Everything here is sized against
          that: the claim gets two lines, the lede one sentence, and the
          command sits directly under them rather than after an essay.
        */}
        <div className="mx-auto max-w-5xl text-center">
          {/* The measure is in em, so it grows with the type and the claim
              holds at two lines instead of breaking to three on a wide
              window, where the font-size ramp outruns a fixed px cap. */}
          <h1 className="enter-words mx-auto max-w-[11.5em]">
            {HEADLINE.split(" ").map((word, index) => (
              /* The space is a text node between the words and never inside
                 one: two adjacent inline-blocks offer the line-breaker no
                 break opportunity, and the headline would set on one line at
                 any width. */
              <Fragment key={`${word}-${index}`}>
                {index > 0 && " "}
                <span
                  className="enter-word"
                  style={{ animationDelay: `${index * WORD_STAGGER}ms` }}
                >
                  {word}
                </span>
              </Fragment>
            ))}
          </h1>

          {/* "its own worktree", not "its own branch": the branch is the one
              thing every repository here shares — see the model section, which
              exists to make exactly that point. */}
          <p className="enter mx-auto mt-5 max-w-2xl text-base text-slate delay-300 md:text-lg">
            Orchestrate AI agents across multiple repositories, each with its
            own worktree and terminal, all connected in one seamless workspace.
            Build, manage, and ship in parallel.
          </p>

          {/* gap-9 matches the mt-9 above the command, so the box sits in
              equal air rather than being crowded from below by the buttons. */}
          <div className="enter mx-auto mt-9 flex max-w-3xl flex-col items-stretch gap-9 delay-500">
            <InstallCommand />
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <a href={site.download}>
                  Download the DMG
                  <ArrowDownIcon data-icon="inline-end" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#model">See how it works</a>
              </Button>
            </div>
          </div>

          {/* What the eyebrow used to claim, said where requirements belong. */}
          <p className="enter mt-5 font-mono text-xs text-slate delay-700">
            macOS 14 and later, Apple Silicon and Intel. You bring Claude Code.
          </p>
        </div>
      </div>

      {/*
        The board, framed the way the app frames a node and lit from underneath,
        so the first thing on the page is the thing you are installing. It
        arrives tilted and levels off, which is what makes it read as a surface
        being set down on the canvas rather than a picture fading up.
      */}
      <div
        className="enter-board container mt-14 md:mt-20"
        style={{ animationDelay: "480ms" }}
      >
        {/* Capped rather than full-bleed: at 92rem the board outgrew every
            line of type above it and kept widening on a large monitor. The
            bloom rides this wrapper, never the figure, which clips. */}
        <div className="bloom mx-auto max-w-6xl">
          <figure className="node overflow-hidden p-1.5 md:p-2">
            <Image
              src="/shots/board.png"
              alt="The Meshvy canvas: a payments-revamp workspace across the api, web and worker repositories, an orchestrator delegating to two agents, and a browser node running the app they are changing."
              width={3200}
              height={1520}
              priority
              sizes="(min-width: 1024px) 72rem, 100vw"
              className="rounded-md md:rounded-sm"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
