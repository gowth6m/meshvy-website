"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRightIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { docsEntries, docsGroupOf } from "@/lib/docs"
import { site } from "@/lib/site"
import { externalLink } from "@/lib/utils"

export default function DocsHeader() {
  const pathname = usePathname()
  const entry = docsEntries.find((candidate) => candidate.href === pathname)
  const group = docsGroupOf(pathname)

  return (
    // A flat bar, not the landing page's floating pill: the sidebar is fixed
    // to the viewport and a pill over it would have nothing to float on.
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-hair bg-void/85 px-4 backdrop-blur-xl md:px-8">
      <SidebarTrigger className="-ms-1" />
      <Separator orientation="vertical" className="h-5" />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            {pathname === "/docs" ? (
              <BreadcrumbPage>Docs</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href="/docs">Docs</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>

          {/* The group is a heading in the sidebar, not a page, so it is a
              crumb you can read and not one you can follow. */}
          {entry && pathname !== "/docs" && group && (
            <>
              <BreadcrumbSeparator className="hidden sm:block" />
              <BreadcrumbItem className="hidden sm:block">
                {group.title}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{entry.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ms-auto flex items-center gap-1">
        <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
          <a href={site.repo} {...externalLink("GitHub")}>
            GitHub
            <ArrowUpRightIcon data-icon="inline-end" />
          </a>
        </Button>
        <Button asChild size="sm">
          <a href={site.download}>Download</a>
        </Button>
      </div>
    </header>
  )
}
