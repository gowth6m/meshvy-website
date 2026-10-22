import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon, InfoIcon } from "lucide-react"

import DocPage from "@/components/docs/doc-page"
import CodeNode from "@/components/elements/code-node"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { docsMetadata, docsNav } from "@/lib/docs"
import { site } from "@/lib/site"

const HREF = "/docs"

export const metadata: Metadata = docsMetadata(HREF)

export default function Page() {
  return (
    <DocPage href={HREF}>
      <p>
        Meshvy is a native macOS app for running coding agents across several
        repositories at once. It cuts one branch across the repositories you
        pick, checks each out side by side, and puts a real Claude Code session
        — with its own terminal — on every one of them, on an infinite canvas.
      </p>

      <Alert className="mt-8">
        <InfoIcon />
        <AlertTitle>What you need</AlertTitle>
        <AlertDescription>
          macOS 14 or later, Apple Silicon or Intel, and{" "}
          <a href={site.claudeCode} target="_blank" rel="noreferrer">
            Claude Code
          </a>{" "}
          installed and signed in — Meshvy drives the <code>claude</code> CLI
          rather than the API.
        </AlertDescription>
      </Alert>

      <h2 id="three-ideas">Three ideas</h2>
      <p>
        Everything else in these pages is detail on one of these, and they are
        worth reading in this order.
      </p>
      <ol>
        <li>
          <strong>A workspace is one branch, not one repository.</strong> You
          name it, pick the repositories it spans and choose the base branch to
          cut from. Meshvy cuts the same branch in each, as a real{" "}
          <code>git worktree</code>, all under one folder.
        </li>
        <li>
          <strong>One main chat, a thread for every piece of work.</strong> The
          coordinator runs at the workspace root and takes your requests. It
          starts a thread for each piece of work — an agent with its own
          terminal you can read, interrupt and answer — and reports back.
        </li>
        <li>
          <strong>The board reads your machine.</strong> Nodes are drawn from
          transcripts on disk, live ptys and real pages — not from a model of
          what you did.
        </li>
      </ol>

      <CodeNode title="on disk" className="mt-8">
        <span className="text-paper">~/.meshvy/payments-revamp/</span>
        {["api", "web", "worker"].map((name) => (
          <span key={name}>
            {"\n  "}
            <span className="text-mint">{name}/</span>
            <span className="text-slate">
              {" ".repeat(8 - name.length)}→ repo &ldquo;{name}&rdquo; on{" "}
            </span>
            <span className="text-sand">payments-revamp</span>
          </span>
        ))}
      </CodeNode>

      <h2 id="pages">Every page</h2>

      {docsNav.map((group) => (
        <section key={group.title} className="mt-8">
          <p className="eyebrow">{group.title}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {group.entries
              .filter((entry) => entry.href !== HREF)
              .map((entry) => (
                <Card
                  key={entry.href}
                  className="relative transition-colors hover:border-slate/50"
                >
                  <CardHeader>
                    <CardTitle>
                      {/* The whole card is the target: the link is stretched
                          over it rather than being a word inside it. */}
                      <Link
                        href={entry.href}
                        className="flex items-center gap-1.5 after:absolute after:inset-0 after:rounded-xl focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none"
                      >
                        {entry.title}
                        <ArrowRightIcon className="size-3.5 text-slate" />
                      </Link>
                    </CardTitle>
                    <CardDescription>{entry.lede}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </section>
      ))}
    </DocPage>
  )
}
