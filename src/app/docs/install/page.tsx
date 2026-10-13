import type { Metadata } from "next"
import { ArrowDownIcon, TriangleAlertIcon } from "lucide-react"

import DocPage from "@/components/docs/doc-page"
import CodeNode from "@/components/elements/code-node"
import InstallCommand from "@/components/elements/install-command"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { docsMetadata } from "@/lib/docs"
import { site } from "@/lib/site"

const HREF = "/docs/install"

export const metadata: Metadata = docsMetadata(HREF)

export default function Page() {
  return (
    <DocPage href={HREF}>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">{site.platform}</Badge>
        <Badge variant="secondary">Universal — Apple Silicon and Intel</Badge>
        <Badge variant="secondary">Signed and notarised</Badge>
      </div>

      <p>
        Meshvy drives the <code>claude</code> CLI rather than the API, so
        install{" "}
        <a href={site.claudeCode} target="_blank" rel="noreferrer">
          Claude Code
        </a>{" "}
        first and sign in. There is nothing else to set up and nothing to sign
        in to for Meshvy itself.
      </p>

      <h2 id="installing">Installing</h2>

      <Tabs defaultValue="script" className="mt-6">
        <TabsList>
          <TabsTrigger value="script">One command</TabsTrigger>
          <TabsTrigger value="dmg">The DMG</TabsTrigger>
        </TabsList>

        <TabsContent value="script" className="mt-5">
          <InstallCommand />
          <p>
            It downloads the latest release, checks it against the published
            SHA-256, installs to <code>/Applications</code> and clears the
            quarantine flag. Run it again to update, or set a prefix to put it
            somewhere else:
          </p>
          <CodeNode className="mt-5">
            <span className="text-mint">PREFIX</span>
            <span className="text-slate">=</span>
            <span className="text-sand">~/Applications</span>
            <span className="text-slate">
              {" "}
              curl -fsSL &hellip;/install.sh | bash
            </span>
          </CodeNode>
        </TabsContent>

        <TabsContent value="dmg" className="mt-5">
          <p className="mt-0">
            Open the disk image and drag Meshvy to Applications. The download
            link resolves to the newest release at the moment you click it.
          </p>
          <Button asChild className="mt-6">
            <a href={site.download}>
              Download the DMG
              <ArrowDownIcon data-icon="inline-end" />
            </a>
          </Button>
        </TabsContent>
      </Tabs>

      <h2 id="verifying">Verifying the build</h2>
      <p>
        Releases are signed with a Developer ID and notarised by Apple, so a
        download opens without a warning. The release workflow gates on proving
        it rather than trusting that the signing secrets were set, and the
        script it gates on ships with the source, so you can run the same check
        yourself:
      </p>
      <CodeNode className="mt-6">
        <span className="text-slate">./scripts/verify-release.sh </span>
        <span className="text-sand">/Applications/Meshvy.app</span>
      </CodeNode>

      <h2 id="first-run">First run</h2>
      <p>
        Meshvy opens empty — there is no sample project and nothing is created
        until you make a workspace. Claude Code asks you to trust a folder it
        has not seen, so the first orchestrator in a new workspace shows its
        trust prompt. Press Enter.
      </p>

      <Alert className="mt-6">
        <TriangleAlertIcon />
        <AlertTitle>Meshvy will not answer that prompt for you</AlertTitle>
        <AlertDescription>
          Pre-answering it means writing to <code>~/.claude.json</code>, which
          every running Claude Code also writes. A read-modify-write there could
          clobber their changes.
        </AlertDescription>
      </Alert>

      <h2 id="troubleshooting">Troubleshooting</h2>

      <Accordion type="single" collapsible className="mt-6">
        <AccordionItem value="quarantine">
          <AccordionTrigger>
            &ldquo;Apple could not verify Meshvy is free of malware&rdquo;
          </AccordionTrigger>
          <AccordionContent>
            Builds before 0.10.1 were unsigned, and macOS refuses the first
            launch of one. Update to a current release — or clear the flag it
            was downloaded with:{" "}
            <code>xattr -dr com.apple.quarantine /Applications/Meshvy.app</code>
            .
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="claude">
          <AccordionTrigger>
            An agent starts and immediately stops
          </AccordionTrigger>
          <AccordionContent>
            Meshvy runs the <code>claude</code> CLI as you, so it needs to be on
            your PATH and signed in. Run <code>claude</code> once in a terminal,
            finish the sign-in, and start the agent again.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="building">
          <AccordionTrigger>Building it yourself</AccordionTrigger>
          <AccordionContent>
            macOS 14+ and a Swift 6 toolchain. Xcode is not needed — the
            compiler and SDK from the Command Line Tools are enough, and{" "}
            <code>./scripts/build-app.sh</code> produces a universal bundle. The
            full instructions are in the{" "}
            <a href={site.readme} target="_blank" rel="noreferrer">
              repository README
            </a>
            .
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </DocPage>
  )
}
