import type { Metadata } from "next"

import { pageMetadata } from "@/lib/metadata"

export type DocsEntry = {
  title: string
  href: string
  /** The line under the title on the page, and the card blurb on the index. */
  lede: string
  /** What goes in <meta name="description">, and nothing else. */
  description: string
}

export type DocsGroup = {
  title: string
  entries: DocsEntry[]
}

/*
  One tree, read by the sidebar, the breadcrumb, the page headers, the
  previous/next pager, the index cards and the sitemap. Adding a page here and
  dropping a file at its href is the whole job — nothing else lists them.
*/
export const docsNav: DocsGroup[] = [
  {
    title: "Getting started",
    entries: [
      {
        title: "Overview",
        href: "/docs",
        lede: "What Meshvy is, what it needs, and the three ideas the rest of these pages build on.",
        description:
          "Meshvy documentation: a native macOS app for running Claude Code agents across several repositories at once.",
      },
      {
        title: "Install",
        href: "/docs/install",
        lede: "One command, or the DMG. What it puts where, and how to check the build is really ours.",
        description:
          "Install Meshvy with the one-line script or the signed DMG, and verify the release yourself.",
      },
    ],
  },
  {
    title: "Concepts",
    entries: [
      {
        title: "Workspaces",
        href: "/docs/workspaces",
        lede: "One branch, cut as a git worktree in every repository you picked, all under one folder.",
        description:
          "How a Meshvy workspace cuts one branch across several repositories as git worktrees.",
      },
      {
        title: "Agents",
        href: "/docs/agents",
        lede: "The orchestrator, the agents it dispatches, and the helper it delegates through.",
        description:
          "How Meshvy runs an orchestrator and per-repository Claude Code agents, each in a real terminal.",
      },
      {
        title: "The board",
        href: "/docs/board",
        lede: "Five kinds of node, where each one gets its facts, and the two views that read across them.",
        description:
          "The Meshvy canvas: workspace nodes, terminals, browsers, session cards, the changes view and ⌘K.",
      },
      {
        title: "Browser nodes",
        href: "/docs/browser",
        lede: "The running application on the canvas next to the agents building it — and drivable by them.",
        description:
          "Browser nodes put a real page on the Meshvy canvas, with a browser_* MCP tool set for agents.",
      },
    ],
  },
  {
    title: "Reference",
    entries: [
      {
        title: "Keyboard",
        href: "/docs/keyboard",
        lede: "Every shortcut, and how panning, zooming and scrolling behave on an infinite canvas.",
        description:
          "Meshvy keyboard shortcuts, and how pan, zoom and scroll work on the canvas.",
      },
      {
        title: "Updating",
        href: "/docs/updating",
        lede: "How Meshvy replaces itself, and how to take it off the machine without losing work.",
        description:
          "How Meshvy updates itself from GitHub Releases, and what the uninstaller does and refuses to do.",
      },
      {
        title: "Safety",
        href: "/docs/safety",
        lede: "What Meshvy will never do to a repository, and the guarantees behind each one.",
        description:
          "Meshvy never pushes, merges or rewrites history. The git commands it runs, and the ones it does not.",
      },
    ],
  },
]

export const docsEntries = docsNav.flatMap((group) => group.entries)

export function findDocsEntry(href: string) {
  const entry = docsEntries.find((candidate) => candidate.href === href)
  if (!entry) throw new Error(`No docs entry for ${href} — add it to docsNav.`)
  return entry
}

/** The pages either side of this one, in sidebar order. */
export function docsPager(href: string) {
  const index = docsEntries.findIndex((entry) => entry.href === href)
  return {
    previous: index > 0 ? docsEntries[index - 1] : undefined,
    next: index < docsEntries.length - 1 ? docsEntries[index + 1] : undefined,
  }
}

/** The group a page belongs to, which is the middle crumb. */
export function docsGroupOf(href: string) {
  return docsNav.find((group) =>
    group.entries.some((entry) => entry.href === href)
  )
}

export function docsMetadata(href: string): Metadata {
  const entry = findDocsEntry(href)
  return pageMetadata({
    // The overview is "Docs", not "Docs · Overview".
    title: href === "/docs" ? "Docs" : `${entry.title} · Docs`,
    description: entry.description,
    path: href,
  })
}
