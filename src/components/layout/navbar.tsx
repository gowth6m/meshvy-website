import { ArrowDownIcon, ArrowUpRightIcon, MenuIcon } from "lucide-react"

import Mark, { Wordmark } from "@/components/brand/mark"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { site } from "@/lib/site"
import { externalLink } from "@/lib/utils"

const links = [
  { label: "The model", href: "#model" },
  { label: "Delegation", href: "#delegation" },
  { label: "The board", href: "#board" },
  { label: "Safety", href: "#safety" },
]

export default function Navbar() {
  return (
    // Zero-height sticky: the pill floats over the canvas rather than sitting
    // in a band across it, so the dot field runs unbroken to the top edge.
    <header className="sticky top-0 z-50 flex h-0 items-start justify-center px-(--nav-inset)">
      <nav
        aria-label="Main"
        className="mt-(--nav-top) flex h-(--nav-height) w-full max-w-(--nav-max-width) items-center justify-between gap-4 rounded-full bg-panel/85 ps-6 pe-2 shadow-lg ring-1 ring-hair backdrop-blur-xl"
      >
        {/* flex, not block: an inline-flex link would sit on the text baseline
            and leave the strut's descender below it, riding a few px high. */}
        <div className="flex flex-1 items-center">
          <a
            href="#main-content"
            aria-label={`${site.name} home`}
            className="inline-flex rounded-full focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none"
          >
            <Wordmark />
          </a>
        </div>

        <ul className="hidden items-center gap-7 text-sm text-slate lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-sm transition-colors duration-200 hover:text-paper focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 items-center justify-end gap-1">
          {/* Everything inside the pill is round, so nothing reads as bolted on. */}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden rounded-full sm:flex"
          >
            <a href={site.repo} {...externalLink("GitHub")}>
              GitHub
              <ArrowUpRightIcon data-icon="inline-end" />
            </a>
          </Button>
          <Button asChild size="sm" className="rounded-full">
            <a href="#install">Install</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Open menu"
                className="rounded-full lg:hidden"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Mark className="size-6" />
              </SheetHeader>

              {/* The install one-liner is too long to set in a 280px drawer,
                  so this links down to it rather than reprinting it badly. */}
              <ul className="flex flex-col px-4">
                {[...links, { label: "Install", href: "#install" }].map(
                  (link) => (
                    <li key={link.href} className="border-b border-hair">
                      <SheetClose asChild>
                        <a
                          href={link.href}
                          className="block py-4 font-display text-2xl font-semibold tracking-[-0.03em]"
                        >
                          {link.label}
                        </a>
                      </SheetClose>
                    </li>
                  )
                )}
              </ul>

              <div className="mt-8 flex flex-col gap-2 px-4">
                <SheetClose asChild>
                  <Button asChild>
                    <a href={site.download}>
                      Download the DMG
                      <ArrowDownIcon data-icon="inline-end" />
                    </a>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild variant="secondary">
                    <a href={site.repo} {...externalLink("GitHub")}>
                      GitHub
                      <ArrowUpRightIcon data-icon="inline-end" />
                    </a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
