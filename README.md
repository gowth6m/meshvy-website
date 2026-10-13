# Meshvy website

The landing site for [Meshvy](https://github.com/gowth6m/meshvy) — a native
macOS app for running coding agents across several repositories at once, on an
infinite canvas.

One page. Everything on it is drawn from the app's own README, so the site and
the product say the same thing.

## Running it

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| | |
|---|---|
| `npm run dev` | dev server (Turbopack) |
| `npm run build` | production build |
| `npm run lint` | eslint |
| `npm run typecheck` | tsc, no emit |
| `npm run format` | prettier |

## How it is put together

- **Next.js 16** (App Router), **Tailwind 4**, **shadcn/ui**. Scaffolded from
  the Nacre template; everything below `src/` is this project's own.
- `src/lib/site.ts` holds every brand fact the page renders — the install
  command, the repo and release URLs, the platform line. Change the one-liner
  there and both places it appears follow.
- `src/app/globals.css` holds the design tokens. The palette is the brand
  mark's own, which is Night Owl's: `--color-void` `#011627` is the canvas,
  `--color-paper` `#D6DEEB` is type, and `--color-mint` `#64FFDA` is the node
  in the middle of the M — the primary, used for anything live, clean or
  actionable. `--color-panel` and `--color-raised` are steps along the same
  navy. The one other accent is `--color-sand`, for a string: a branch name,
  a path you would type. A screenshot dropped on the page sits on the colours
  it was taken on.
- Sections live in `src/components/sections/`, one file each, composed in
  `src/app/page.tsx`.

### The canvas

The structural idea is that the page is the app's canvas. `.canvas` paints the
dot field, `.node` is the card chrome (hairline, panel fill, title bar), and
`.bloom` is the mint glow under a board. `WorkspaceDiagram` draws a real
workspace node, with a chip for each repository it holds — the app gives a
repository no node of its own, so neither does the page.

### Images

`public/shots/` holds screenshots taken from the app with its own snapshot
harness:

```sh
Meshvy --snapshot out.png [--palette] [--orchestrator "task"]
```

Replace a file in place and the page picks it up. `public/brand/` holds the mark and app icon as supplied — `mark.svg` for light
grounds, `mark-on-dark.svg` for dark, `mark-mono.svg` for one ink, plus the two
app icons. Nothing on the page loads them: the mark is drawn inline by
`src/components/brand/mark.tsx` so it can take `currentColor` and pulse its
centre node. They are there to hand out and to render from.

`public/og-image.png` and the favicons are rendered from `tools/render/` — see
the README there, and re-render them if the headline or the mark changes.

### Fonts and type

Two voices, matching the app: **Host Grotesk** for everything spoken, and
**JetBrains Mono** for everything the machine says — branch names, paths,
shortcuts, status, figures and every section eyebrow.

## Deploying

Works on Vercel with no configuration. Set `NEXT_PUBLIC_SITE_URL` to the
production domain anywhere else; see `.env.example`.
