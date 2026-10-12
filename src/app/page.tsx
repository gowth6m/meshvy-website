import type { Metadata } from "next"

import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import Board from "@/components/sections/board"
import Delegation from "@/components/sections/delegation"
import Hero from "@/components/sections/hero"
import Install from "@/components/sections/install"
import Model from "@/components/sections/model"
import Safety from "@/components/sections/safety"
import Shortcuts from "@/components/sections/shortcuts"
import Speed from "@/components/sections/speed"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({ path: "/" })

export default function Home() {
  return (
    <>
      <Navbar />
      {/* The whole page sits on the app's canvas, dot grid and all. */}
      <main id="main-content" className="canvas flex-1">
        <Hero />
        <Model />
        <Delegation />
        <Board />
        <Speed />
        <Safety />
        <Shortcuts />
        <Install />
      </main>
      <Footer />
    </>
  )
}
