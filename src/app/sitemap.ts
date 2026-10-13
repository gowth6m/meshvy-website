import type { MetadataRoute } from "next"

import { docsEntries } from "@/lib/docs"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    // The overview first, then the pages in the order the sidebar lists them.
    ...docsEntries.map((entry) => ({
      url: `${site.url}${entry.href}`,
      priority: entry.href === "/docs" ? 0.8 : 0.6,
    })),
  ]
}
