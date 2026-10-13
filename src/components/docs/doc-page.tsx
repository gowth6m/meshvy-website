import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { docsPager, findDocsEntry } from "@/lib/docs"
import { cn } from "@/lib/utils"

type DocPageProps = {
  /** This page's own href. Everything else is read from the docs tree. */
  href: string
  children: React.ReactNode
}

// The frame every docs page shares: the title and lede from the tree, the body
// in docs type, and the two pages either side of this one.
export default function DocPage({ href, children }: DocPageProps) {
  const entry = findDocsEntry(href)
  const { previous, next } = docsPager(href)

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 md:px-8 md:py-16">
      <header>
        <h1 className="font-display text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.035em] text-paper md:text-[2.75rem]">
          {entry.title}
        </h1>
        <p className="mt-4 text-[1.0625rem] text-slate">{entry.lede}</p>
      </header>

      <div className="docs-prose mt-12">{children}</div>

      {(previous || next) && (
        <nav
          aria-label="Pagination"
          className="mt-20 grid gap-3 border-t border-hair pt-8 sm:grid-cols-2"
        >
          {/* The previous card holds its column even when there is no previous
              page, so next never slides over to the start of the row. */}
          <div>
            {previous && <PagerLink entry={previous} direction="previous" />}
          </div>
          {next && <PagerLink entry={next} direction="next" />}
        </nav>
      )}
    </div>
  )
}

function PagerLink({
  entry,
  direction,
}: {
  entry: { title: string; href: string }
  direction: "previous" | "next"
}) {
  const isNext = direction === "next"

  return (
    <Link
      href={entry.href}
      className={cn(
        "flex h-full flex-col gap-1 rounded-xl border border-hair bg-panel p-4 transition-colors hover:border-slate/50 focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none",
        isNext && "text-end"
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-slate uppercase",
          isNext && "justify-end"
        )}
      >
        {!isNext && <ArrowLeftIcon className="size-3" />}
        {direction}
        {isNext && <ArrowRightIcon className="size-3" />}
      </span>
      <span className="font-display font-semibold tracking-[-0.02em] text-paper">
        {entry.title}
      </span>
    </Link>
  )
}
