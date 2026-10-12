export const site = {
  name: "Meshvy",
  tagline: "The infinite canvas for orchestrating AI agents",
  description:
    "A native macOS app for running coding agents across several repositories at once. Meshvy cuts one branch across the repos you pick, checks each out side by side, and puts a real Claude Code session — with its own terminal — on every one of them.",
  url: siteUrl(),
  author: "Gowtham Ravindrathas",
  platform: "macOS 14+",
  owner: "gowth6m",
  repoName: "meshvy",
  repo: "https://github.com/gowth6m/meshvy",
  releases: "https://github.com/gowth6m/meshvy/releases",
  licence: "https://github.com/gowth6m/meshvy/blob/main/LICENSE",
  claudeCode: "https://claude.com/claude-code",
  /**
   * Resolves to the newest .dmg on GitHub at request time, so the button never
   * points at a version that has been superseded. See app/download/route.ts.
   */
  download: "/download",
  // The repository is public, so this needs no gh CLI and no sign-in.
  install:
    "curl -fsSL https://raw.githubusercontent.com/gowth6m/meshvy/main/scripts/install.sh | bash",
} as const

// Canonical links, the sitemap and share cards build on this. Vercel fills in
// the production domain; set NEXT_PUBLIC_SITE_URL anywhere else.
function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  return "http://localhost:3000"
}
