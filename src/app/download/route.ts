import { NextResponse } from "next/server"

import { site } from "@/lib/site"

const LATEST = `https://api.github.com/repos/${site.owner}/${site.repoName}/releases/latest`

// The DMG carries its version in its filename — Meshvy-0.10.3.dmg — so there is
// no fixed URL to link at. This asks GitHub which release is current and hands
// the browser straight to that asset, cached for an hour so a burst of visitors
// costs one API call rather than one each.
export async function GET() {
  try {
    const response = await fetch(LATEST, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 3600 },
    })
    if (!response.ok) throw new Error(`GitHub answered ${response.status}`)

    const release = (await response.json()) as {
      assets?: { name?: string; browser_download_url?: string }[]
    }
    const dmg = release.assets?.find((asset) => asset.name?.endsWith(".dmg"))
    if (!dmg?.browser_download_url) throw new Error("no .dmg in that release")

    return NextResponse.redirect(dmg.browser_download_url, 302)
  } catch {
    // Rate-limited, offline, or a release published without a disk image:
    // send them somewhere they can still finish the job by hand.
    return NextResponse.redirect(site.releases, 302)
  }
}
