import Image from "next/image"
import { ArrowDownIcon } from "lucide-react"

import InstallCommand from "@/components/elements/install-command"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export default function Hero() {
  return (
    // The pill floats over this section rather than pushing it down, so the
    // top padding has to clear it and then leave the headline room to breathe:
    // 40px of air under a 88px headline read as crowding.
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
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
          <h1 className="enter mx-auto max-w-[11.5em]">
            The infinite canvas for orchestrating AI agents
          </h1>

          {/* The heading already names the canvas, so the lede spends its two
              lines on the thing the heading cannot say: that this is one
              branch across many repositories, not one agent in one folder. */}
          <p className="enter mx-auto mt-5 max-w-2xl text-base text-slate delay-75 md:text-lg">
            Meet Meshvy. One branch cut across every repository you pick, an
            agent with its own terminal on each, and the whole operation in
            front of you.
          </p>

          {/* gap-9 matches the mt-9 above the command, so the box sits in
              equal air rather than being crowded from below by the buttons. */}
          <div className="enter mx-auto mt-9 flex max-w-3xl flex-col items-stretch gap-9 delay-150">
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
          <p className="enter mt-5 font-mono text-xs text-slate delay-200">
            macOS 14 and later, Apple Silicon and Intel. You bring Claude Code.
          </p>
        </div>
      </div>

      {/*
        The board, framed the way the app frames a node and lit from underneath,
        so the first thing on the page is the thing you are installing.
      */}
      <div className="enter container mt-14 delay-300 md:mt-20">
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
