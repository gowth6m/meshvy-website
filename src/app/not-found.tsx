import type { Metadata } from "next"
import Link from "next/link"

import Mark from "@/components/brand/mark"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
}

export default function NotFoundPage() {
  return (
    <main
      id="main-content"
      className="canvas container flex min-h-svh flex-col items-center justify-center text-center"
    >
      <Mark className="size-9" />
      <h1 className="mt-8 text-4xl md:text-5xl">No node here.</h1>
      <p className="mt-4 max-w-sm text-slate">
        That page is not on the board. The link is broken, or it has moved.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to the canvas</Link>
      </Button>
    </main>
  )
}
