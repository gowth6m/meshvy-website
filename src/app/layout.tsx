import type { Metadata } from "next"
import { Host_Grotesk, JetBrains_Mono } from "next/font/google"
import { MotionConfig } from "motion/react"

import { ogImage, siteTitle } from "@/lib/metadata"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: siteTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Meshvy",
    "Claude Code",
    "coding agents",
    "git worktree",
    "monorepo",
    "multi-repo",
    "macOS developer tools",
    "agent orchestration",
  ],
  authors: [{ name: site.author, url: site.repo }],
  creator: site.author,
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    siteName: site.name,
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: ogImage.url, alt: ogImage.alt }],
  },
}

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(hostGrotesk.variable, jetbrainsMono.variable)}
    >
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-panel focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:ring-2 focus:ring-mint"
        >
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  )
}
