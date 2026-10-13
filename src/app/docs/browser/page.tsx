import type { Metadata } from "next"
import Image from "next/image"
import { InfoIcon } from "lucide-react"

import DocPage from "@/components/docs/doc-page"
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

const HREF = "/docs/browser"

const tools = [
  {
    name: "browser_open",
    detail: "point a node at a URL, opening one if there is not one",
  },
  {
    name: "browser_snapshot",
    detail: "the page's text, plus every control with a CSS selector",
  },
  {
    name: "browser_click · browser_type",
    detail: "act on a selector the snapshot handed back",
  },
  {
    name: "browser_console",
    detail: "what the page logged, and what it threw",
  },
  {
    name: "browser_screenshot",
    detail: "a PNG it can read with the Read tool",
  },
  {
    name: "browser_eval · browser_wait_for",
    detail: "run JavaScript · wait for text or an element",
  },
  {
    name: "browser_list · browser_navigate · browser_reload · browser_back · browser_close",
    detail: "the rest of the node's controls",
  },
]

export const metadata: Metadata = docsMetadata(HREF)

export default function Page() {
  return (
    <DocPage href={HREF}>
      <p>
        A workspace gives you the repositories and the agents. What those agents
        are building is a <em>running application</em>, and a browser node puts
        it on the canvas next to them rather than in another app.
      </p>

      <h2 id="opening">Opening one</h2>
      <p>
        <strong>⌘B</strong>, or right-click a repository and{" "}
        <strong>Open a browser here</strong>. Type <code>localhost:3000</code>{" "}
        and watch your app next to the agent writing it. It keeps cookies
        between launches, so a dev server you have signed into stays signed in,
        and the node reopens where you left it.
      </p>
      <p>
        Selecting the node puts the page&rsquo;s console in the inspector, and
        the header carries a count of what it has thrown.
      </p>

      <figure className="node mt-8 overflow-hidden p-1">
        <Image
          src="/shots/browser.png"
          alt="A browser node on the canvas showing a running app, beside the agent that is changing it."
          width={3600}
          height={1840}
          sizes="(min-width: 768px) 48rem, 100vw"
          className="rounded-lg"
        />
      </figure>

      <h2 id="tools">What an agent can do with it</h2>
      <p>
        The point is that an agent can drive the same page. Every session Meshvy
        starts is given a <code>browser_*</code> tool set over MCP, with no
        setup from you.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-hair bg-panel">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[45%]">Tool</TableHead>
              <TableHead>What it does</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools.map((tool) => (
              <TableRow key={tool.name}>
                <TableCell className="font-mono text-[0.8125rem] text-mint">
                  {tool.name}
                </TableCell>
                <TableCell className="text-slate">{tool.detail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p>
        Typing fires the <code>input</code> and <code>change</code> events a
        framework listens for, so React and Vue forms see it. Agents are told to
        check the console before claiming a web change works, and the errors a
        page throws come back attached to whatever action caused them.
      </p>

      <Alert className="mt-6">
        <InfoIcon />
        <AlertTitle>The engine is WebKit, not Chromium</AlertTitle>
        <AlertDescription>
          It is what macOS can host inside a node on the canvas — the same
          engine Safari uses. The short id in a node&rsquo;s header is how an
          agent addresses it.
        </AlertDescription>
      </Alert>
    </DocPage>
  )
}
