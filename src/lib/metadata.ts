import type { Metadata } from "next"

import { site } from "@/lib/site"

export const siteTitle = `${site.name} — ${site.tagline}`

export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${site.name}. ${site.tagline}`,
}

type PageMetadataOptions = {
  /** Leave out on the home page to use the site title. */
  title?: string
  description?: string
  path: string
}

// Every page sets its own share title and URL; the root layout holds the rest.
export function pageMetadata({
  title,
  description = site.description,
  path,
}: PageMetadataOptions): Metadata {
  const shareTitle = title ? `${title} · ${site.name}` : siteTitle

  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      locale: "en_US",
      title: shareTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [{ url: ogImage.url, alt: ogImage.alt }],
    },
  }
}
