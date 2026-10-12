import { cn } from "@/lib/utils"

type Point = readonly [number, number]

/*
  The hero's backdrop is the app's own object: node cards on a canvas, wires
  between them, and work moving along the wires. It is drawn rather than filmed,
  so it stays sharp at any width, uses the palette's literal values, and costs a
  few kilobytes of markup instead of a video.

  Two rules keep it reading as a board and not as a cobweb. Wires turn at right
  angles — a long strand that bows between two dots is a web, a staggered
  orthogonal route is a node editor. And nodes are cards with a title bar, not
  bare points, because a rectangle is something somebody built.

  The two clusters are not mirrors of each other. A real board is whatever you
  dragged onto it, so the left is an eight-node wander and the right a seven-node
  one, on their own rows, at their own widths, drifting on their own clocks.
  Nothing here tracks the pointer: the backdrop is scenery, and scenery that
  lunges at the cursor pulls the eye off the headline it sits behind.

  Geometry is in a 1200x820 user space and lives only in the page's left and
  right margins — the centre is masked out, because the headline is the thing
  you are meant to read first.

  That 1200x820 is not arbitrary. `slice` scales by whichever axis overfills, so
  a box narrower than the viewBox's aspect crops the sides — and a column sliced
  down to a 4px sliver leaves its wires trailing off the edge into nothing, which
  is the cobweb we are here to avoid. At 1.46 the viewBox is narrower than the
  banner at every width from the md breakpoint up, so width always binds and the
  crop is a gentle vertical one instead.
*/
const MESH_WIDTH = 1200
const MESH_HEIGHT = 820

const CARD_H = 22

/*
  Rows sit inside y 157..574, the band that survives the vertical crop out to a
  1920-wide viewport.

  Cards are deliberately small — 22 user units tall, a third under what reads
  comfortably as a UI panel. That is the point: a board you are looking at from
  far enough away to see all of it, which is both why fifteen of them fit in the
  margins and why none of them competes with the type in the middle.

  Nothing here lines up. No two cards share a column, no two vertical gaps are
  equal, and the widths are all different, because the one thing that would give
  away that nobody dragged these is a grid — fifteen rectangles on a lattice read
  as wallpaper, and wallpaper is a texture rather than somebody's workspace. The
  numbers are hand-placed rather than generated: a random seed scatters just as
  happily into a clump or off the edge, and these have to stay inside the margins
  the mask leaves open.
*/
const nodes = {
  l1: { x: 72, y: 170, w: 40 },
  l2: { x: 216, y: 204, w: 32 },
  l3: { x: 44, y: 256, w: 36 },
  l4: { x: 178, y: 312, w: 44 },
  l5: { x: 92, y: 352, w: 30 },
  l6: { x: 248, y: 420, w: 38 },
  l7: { x: 50, y: 468, w: 42 },
  l8: { x: 194, y: 552, w: 34 },
  r1: { x: 1136, y: 168, w: 38 },
  r2: { x: 968, y: 198, w: 32 },
  r3: { x: 1102, y: 262, w: 44 },
  r4: { x: 1162, y: 336, w: 34 },
  r5: { x: 1012, y: 388, w: 40 },
  r6: { x: 1118, y: 452, w: 32 },
  r7: { x: 990, y: 534, w: 42 },
} satisfies Record<string, { x: number; y: number; w: number }>

type NodeId = keyof typeof nodes
type Side = "l" | "r" | "t" | "b"

/** Where a wire meets a card: the middle of one of its four edges. */
function port(id: NodeId, side: Side): Point {
  const { x, y, w } = nodes[id]
  if (side === "l") return [x - w / 2, y]
  if (side === "r") return [x + w / 2, y]
  if (side === "t") return [x, y - CARD_H / 2]
  return [x, y + CARD_H / 2]
}

/*
  The three-segment route every orthogonal node editor draws: out of the source
  horizontally, one vertical run, back in horizontally. `mid` nudges the vertical
  off the halfway point so that wires sharing a lane do not stack into one long
  dashed-looking line. Corners are quadratics, radius clamped to the shorter leg
  so a tight route cannot overshoot its own turn.

  A wire leaving a top or bottom port has to do the same thing on the other axis
  — down out of the card, one horizontal run, down into the next — and `vertical`
  asks for that. It used to be free: stacked nodes shared a column, so the route
  was a straight line and nobody had to decide which way it left the card. Once
  the column went, a horizontal-first route out of a bottom edge read as a wire
  sliding along the underside of the card. So the whole thing is solved with the
  axes swapped and every point swapped back on the way out — `flip` is its own
  inverse, which is what lets one body serve both directions.
*/
function wirePath(
  [x1, y1]: Point,
  [x2, y2]: Point,
  mid = 0,
  vertical = false,
  r = 10
) {
  const flip = (a: number, b: number): Point => (vertical ? [b, a] : [a, b])
  const [u1, v1] = flip(x1, y1)
  const [u2, v2] = flip(x2, y2)
  const at = (u: number, v: number) =>
    flip(u, v)
      .map((n) => +n.toFixed(1))
      .join(" ")

  const lane = (u1 + u2) / 2 + mid
  const du = Math.sign(lane - u1) || 1
  const dv = Math.sign(v2 - v1)
  if (dv === 0) return `M${at(u1, v1)} L${at(u2, v2)}`
  const rr = Math.min(
    r,
    Math.abs(lane - u1),
    Math.abs(u2 - lane),
    Math.abs(v2 - v1) / 2
  )
  return [
    `M${at(u1, v1)}`,
    `L${at(lane - du * rr, v1)}`,
    `Q${at(lane, v1)} ${at(lane, v1 + dv * rr)}`,
    `L${at(lane, v2 - dv * rr)}`,
    `Q${at(lane, v2)} ${at(lane + du * rr, v2)}`,
    `L${at(u2, v2)}`,
  ].join(" ")
}

/** `signal` is the time in seconds a packet takes to cross; absent means a quiet wire. */
type Wire = {
  from: [NodeId, Side]
  to: [NodeId, Side]
  mid?: number
  signal?: number
  at?: number
}

const clusters: {
  id: string
  nodes: NodeId[]
  drift: number
  delay: number
  wires: Wire[]
}[] = [
  {
    // A chain working its way down the margin, doubling back on itself twice.
    // The spine is still there — l1 to l3 to l5 to l7 — but it steps sideways
    // at every link now, which is what a spine looks like when the nodes it
    // runs through were dropped by hand.
    id: "left",
    nodes: ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8"],
    drift: 19,
    delay: -3,
    wires: [
      { from: ["l1", "b"], to: ["l3", "t"] },
      { from: ["l3", "b"], to: ["l5", "t"] },
      { from: ["l5", "b"], to: ["l7", "t"] },
      { from: ["l1", "r"], to: ["l2", "l"], mid: 10, signal: 3.4, at: 0.9 },
      { from: ["l3", "r"], to: ["l2", "l"], mid: -16 },
      { from: ["l5", "r"], to: ["l4", "l"], signal: 3.9, at: 1.6 },
      { from: ["l4", "r"], to: ["l6", "l"], mid: 4 },
      { from: ["l7", "r"], to: ["l6", "l"], mid: 18, signal: 4.6, at: 3.1 },
      { from: ["l7", "r"], to: ["l8", "l"], mid: -14 },
    ],
  },
  {
    // The same idea with a different hand: a chain that crosses its own column
    // twice, plus two shortcuts cutting down past it. Seven nodes to the left's
    // eight, and not one of them on a row the left uses.
    id: "right",
    nodes: ["r1", "r2", "r3", "r4", "r5", "r6", "r7"],
    drift: 26,
    delay: -11,
    wires: [
      { from: ["r1", "l"], to: ["r2", "r"], signal: 4.2, at: 1.3 },
      { from: ["r2", "r"], to: ["r3", "l"], mid: 12 },
      { from: ["r3", "r"], to: ["r4", "l"], mid: -4 },
      { from: ["r4", "l"], to: ["r5", "r"], signal: 3.7, at: 0.5 },
      { from: ["r5", "r"], to: ["r6", "l"], mid: 8 },
      { from: ["r6", "b"], to: ["r7", "t"], signal: 5.1, at: 2.6 },
      { from: ["r1", "b"], to: ["r4", "t"], mid: -14 },
      { from: ["r2", "b"], to: ["r5", "t"], mid: -22 },
    ],
  },
]

const routed = clusters.map((cluster) => ({
  ...cluster,
  wires: cluster.wires.map((wire) => ({
    ...wire,
    key: `${wire.from.join("")}-${wire.to.join("")}`,
    // The port the wire leaves by decides which axis it runs on first — there
    // is no second thing to configure, and no way to ask for the route that
    // slides along the edge of its own card.
    d: wirePath(
      port(...wire.from),
      port(...wire.to),
      wire.mid,
      wire.from[1] === "t" || wire.from[1] === "b"
    ),
  })),
}))

// Three of the fifteen are live sessions. The rest are idle, which is what
// makes the mint ones mean something — the ratio stays roughly what it was at
// nine nodes, because a board where most things are running is a board nobody
// believes. They sit in different columns and different rows, so the eye does
// not pair them off.
const live: NodeId[] = ["l2", "r3", "r5"]

/** A node on the board: a panel with a status dot, a title bar, and two body lines. */
function Card({ id, index }: { id: NodeId; index: number }) {
  const { x, y, w } = nodes[id]
  const isLive = live.includes(id)
  const left = x - w / 2
  const top = y - CARD_H / 2
  return (
    <g
      className="animate-node-in motion-reduce:animate-none"
      style={{ animationDelay: `${260 + index * 70}ms` }}
    >
      {isLive && <circle cx={x} cy={y} r="40" fill="url(#mesh-halo)" />}
      {/*
        The fill is translucent rather than flat panel: the canvas dots carry
        on through the card, so it reads as something drawn on the background
        instead of a chip laid over it. A live node's mint outline is pulled
        back too — at full strength it was the brightest thing on the screen,
        and the brightest thing on the screen should be the headline.
      */}
      <rect
        x={left}
        y={top}
        width={w}
        height={CARD_H}
        rx="4"
        fill="var(--color-panel)"
        fillOpacity="0.55"
        stroke={isLive ? "var(--color-mint)" : "var(--color-hair)"}
        strokeOpacity={isLive ? 0.4 : 1}
        strokeWidth="1.25"
      />
      {/*
        The title-bar rule, which is what makes a rectangle read as a panel —
        and the first thing to protect when the panel shrinks. Everything below
        is sized off a 22-unit card: an 8-unit title strip, a 2-unit dot, and
        two body lines in the 14 that remain. Shrink the card again and these
        want shrinking with it, which is why they sit in one block.
      */}
      <line
        x1={left}
        y1={top + 8}
        x2={left + w}
        y2={top + 8}
        stroke="var(--color-hair)"
        strokeWidth="1"
      />
      <circle
        cx={left + 5.5}
        cy={top + 4}
        r="1.6"
        fill={isLive ? "var(--color-mint)" : "var(--color-hair)"}
        fillOpacity={isLive ? 0.6 : 1}
        className={cn(
          isLive && "animate-pulse-node motion-reduce:animate-none"
        )}
        style={
          isLive
            ? { transformOrigin: `${left + 5.5}px ${top + 4}px` }
            : undefined
        }
      />
      <rect
        x={left + 10}
        y={top + 3}
        width={w - 18}
        height="2.2"
        rx="1.1"
        fill="var(--color-hair)"
      />
      <rect
        x={left + 5.5}
        y={top + 11.5}
        width={w - 14}
        height="2"
        rx="1"
        fill="var(--color-hair)"
        opacity="0.75"
      />
      <rect
        x={left + 5.5}
        y={top + 15.5}
        width={(w - 14) * 0.6}
        height="2"
        rx="1"
        fill="var(--color-hair)"
        opacity="0.75"
      />
    </g>
  )
}

export default function HeroMesh({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      /*
        Scenery, held at scenery's level. The whole mesh is dimmed as one piece
        rather than per element, so the board keeps its internal contrast — a
        live node still outranks an idle one — while the entire thing sits a
        tier below the type it runs behind.
      */
      className={cn("pointer-events-none opacity-55 select-none", className)}
      style={{
        /*
          The centre is cut out of the mask so no wire ever crosses the
          headline, and the bottom fades before the board arrives — a mesh
          that runs under an opaque screenshot is noise you have paid for.
        */
        maskImage:
          "radial-gradient(ellipse 42% 46% at 50% 24%, transparent 35%, black 100%), linear-gradient(to bottom, black 48%, transparent 88%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      <svg
        viewBox={`0 0 ${MESH_WIDTH} ${MESH_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
        className="size-full"
      >
        <defs>
          {/* One halo, reused: a soft mint falloff for the live nodes. */}
          <radialGradient id="mesh-halo">
            <stop
              offset="0%"
              stopColor="var(--color-mint)"
              stopOpacity="0.16"
            />
            <stop offset="100%" stopColor="var(--color-mint)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {routed.map((cluster) => (
          /*
            Drift belongs to the cluster, never to the single node: a card that
            wanders away from the wire plugged into it is a bug you can see. The
            packets ride inside the same group for the same reason.
          */
          <g
            key={cluster.id}
            className="animate-drift motion-reduce:animate-none"
            style={{
              animationDuration: `${cluster.drift}s`,
              animationDelay: `${cluster.delay}s`,
            }}
          >
            <g
              fill="none"
              stroke="var(--color-hair)"
              strokeWidth="1.25"
              strokeLinecap="round"
            >
              {cluster.wires.map(({ key, d }, index) => (
                <path
                  key={key}
                  d={d}
                  pathLength={1}
                  strokeDasharray={1}
                  className="animate-draw motion-reduce:animate-none"
                  style={{ animationDelay: `${120 + index * 70}ms` }}
                />
              ))}
            </g>

            {cluster.nodes.map((id, index) => (
              <Card key={id} id={id} index={index} />
            ))}

            {/*
              The work in flight, and the one thing that disappears outright for
              a reduced-motion reader — a dot frozen mid-wire means nothing.
            */}
            <g className="motion-reduce:hidden">
              {cluster.wires
                .filter((wire) => wire.signal)
                .map(({ key, d, signal, at }) => (
                  <circle
                    key={key}
                    r="2.4"
                    fill="var(--color-mint)"
                    fillOpacity="0.5"
                  >
                    <animateMotion
                      dur={`${signal}s`}
                      begin={`${at}s`}
                      repeatCount="indefinite"
                      path={d}
                      calcMode="spline"
                      keyTimes="0;1"
                      keySplines="0.4 0 0.6 1"
                    />
                    <animate
                      attributeName="opacity"
                      dur={`${signal}s`}
                      begin={`${at}s`}
                      repeatCount="indefinite"
                      values="0;1;1;0"
                      keyTimes="0;0.18;0.82;1"
                    />
                  </circle>
                ))}
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}
