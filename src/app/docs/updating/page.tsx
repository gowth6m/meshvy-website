import type { Metadata } from "next"
import { TriangleAlertIcon } from "lucide-react"

import DocPage from "@/components/docs/doc-page"
import CodeNode from "@/components/elements/code-node"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { docsMetadata } from "@/lib/docs"
import { site } from "@/lib/site"

const HREF = "/docs/updating"

const flags = [
  { flag: "--dry-run", detail: "print the plan, change nothing" },
  {
    flag: "--keep-worktrees",
    detail: "remove the app but leave ~/.meshvy alone",
  },
  { flag: "--force", detail: "also remove checkouts with unsaved work" },
  { flag: "--yes", detail: "skip the confirmation" },
]

export const metadata: Metadata = docsMetadata(HREF)

export default function Page() {
  return (
    <DocPage href={HREF}>
      <p>
        Meshvy checks{" "}
        <a href={site.releases} target="_blank" rel="noreferrer">
          GitHub Releases
        </a>{" "}
        on launch. When a newer version exists a pill appears in the toolbar; it
        shows the release notes and <strong>Install and restart</strong>, which
        downloads the zip, checks it against the published SHA-256, validates
        the bundle and swaps itself. Also{" "}
        <strong>Meshvy → Check for Updates…</strong>
      </p>
      <p>
        The repository is public, so neither the listing nor the download needs
        a token. Development builds never offer updates.
      </p>

      <h2 id="rollback">If the swap fails</h2>
      <p>
        A running bundle cannot replace itself, so a detached helper waits for
        Meshvy to quit, swaps the two, clears the quarantine flag and
        relaunches. If that fails it puts the old bundle back — a failed update
        never leaves you with nothing installed.
      </p>

      <h2 id="uninstalling">Uninstalling</h2>
      <p>
        <strong>Meshvy → Uninstall Meshvy…</strong>, or run the script that
        ships inside the app:
      </p>

      <CodeNode className="mt-6">
        <span className="text-slate">
          /Applications/Meshvy.app/Contents/Resources/uninstall.sh{" "}
        </span>
        <span className="text-mint">--dry-run</span>
        <span className="text-slate"> # look first</span>
        {"\n"}
        <span className="text-slate">
          /Applications/Meshvy.app/Contents/Resources/uninstall.sh
        </span>
      </CodeNode>

      <p>
        It removes the app, <code>~/Library/Application Support/Meshvy</code>,
        the keychain entry, and the workspaces under <code>~/.meshvy</code>.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-hair bg-panel">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Flag</TableHead>
              <TableHead>What it does</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flags.map((flag) => (
              <TableRow key={flag.flag}>
                <TableCell className="font-mono text-[0.8125rem] text-mint">
                  {flag.flag}
                </TableCell>
                <TableCell className="text-slate">{flag.detail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Alert className="mt-6">
        <TriangleAlertIcon />
        <AlertTitle>The worktrees are the part worth care</AlertTitle>
        <AlertDescription>
          They are not ordinary folders, so deleting them with <code>rm</code>{" "}
          would leave every source repository pointing at a checkout that no
          longer exists. The uninstaller hands each one back with{" "}
          <code>git worktree remove</code> and prunes the origin — and leaves
          alone any checkout holding uncommitted or unpushed work, telling you
          which and why. Nothing in your own repositories is touched.
        </AlertDescription>
      </Alert>
    </DocPage>
  )
}
