import type { Metadata } from "next"

import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import Board from "@/components/sections/board"
import Delegation from "@/components/sections/delegation"
import Hero from "@/components/sections/hero"
import Install from "@/components/sections/install"
import Mac from "@/components/sections/mac"
import Model from "@/components/sections/model"
import Safety from "@/components/sections/safety"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({ path: "/" })

export default function Home() {
  return (
    <>
      <Navbar />
      {/* The whole page sits on the app's canvas, dot grid and all. */}
      <main id="main-content" className="canvas flex-1">
        <Hero />
        {/* The nav has one Features entry, and these three sections are what
            it covers: the anchor is the region, not whichever of them happens
            to come first. Each keeps its own id for the footer's deep links. */}
        <div id="features">
          <Model />
          <Delegation />
          <Board />
        </div>
        <Mac />
        <Safety />
        <Install />
      </main>
      <Footer />
    </>
  )
}
