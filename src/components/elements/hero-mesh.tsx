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
  dragged onto it, so the left is a five-node ladder and the right is a shorter
  zigzag, on their own rows, at their own widths, drifting on their own clocks.
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

const CARD_H = 32

/*
  Rows sit inside y 156..640, the band that survives the vertical crop out to a
  1920-wide viewport. Widths vary because nine identical rectangles read as a
  pattern, and a pattern reads as wallpaper.
*/
const nodes = {
  l1: { x: 66, y: 196, w: 56 },
  l2: { x: 240, y: 300, w: 50 },
  l3: { x: 66, y: 378, w: 48 },
  l4: { x: 262, y: 492, w: 58 },
  l5: { x: 66, y: 582, w: 52 },
  r1: { x: 1150, y: 172, w: 54 },
  r2: { x: 986, y: 268, w: 48 },
  r3: { x: 1108, y: 394, w: 60 },
  r4: { x: 944, y: 512, w: 46 },
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
*/
function wirePath([x1, y1]: Point, [x2, y2]: Point, mid = 0, r = 13) {
  const lane = (x1 + x2) / 2 + mid
  const dx = Math.sign(lane - x1) || 1
  const dy = Math.sign(y2 - y1)
  if (dy === 0) return `M${x1} ${y1} L${x2} ${y2}`
  const rr = Math.min(
    r,
    Math.abs(lane - x1),
    Math.abs(x2 - lane),
    Math.abs(y2 - y1) / 2
  )
  return [
    `M${x1} ${y1}`,
    `L${(lane - dx * rr).toFixed(1)} ${y1}`,
    `Q${lane} ${y1} ${lane} ${(y1 + dy * rr).toFixed(1)}`,
    `L${lane} ${(y2 - dy * rr).toFixed(1)}`,
    `Q${lane} ${y2} ${(lane + dx * rr).toFixed(1)} ${y2}`,
    `L${x2} ${y2}`,
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
    // A ladder: a spine down the outer column, rungs across into the inner one.
    id: "left",
    nodes: ["l1", "l2", "l3", "l4", "l5"],
    drift: 19,
    delay: -3,
    wires: [
      { from: ["l1", "b"], to: ["l3", "t"] },
      { from: ["l3", "b"], to: ["l5", "t"] },
      { from: ["l1", "r"], to: ["l2", "l"], signal: 3.4, at: 0.9 },
      { from: ["l3", "r"], to: ["l2", "l"], mid: -24, signal: 4.6, at: 2.4 },
      { from: ["l3", "r"], to: ["l4", "l"], mid: 16 },
      { from: ["l5", "r"], to: ["l4", "l"], mid: -9, signal: 3.9, at: 1.6 },
    ],
  },
  {
    // A zigzag: one chain stepping down the margin, with a single shortcut
    // across it. Four nodes to the left's five, and none of them on its rows.
    id: "right",
    nodes: ["r1", "r2", "r3", "r4"],
    drift: 26,
    delay: -11,
    wires: [
      { from: ["r1", "l"], to: ["r2", "r"], signal: 4.2, at: 1.3 },
      { from: ["r2", "r"], to: ["r3", "l"], mid: 14, signal: 5.1, at: 3.4 },
      { from: ["r3", "l"], to: ["r4", "r"], signal: 3.7, at: 0.5 },
      { from: ["r1", "b"], to: ["r3", "t"], mid: -8 },
    ],
  },
]

const routed = clusters.map((cluster) => ({
  ...cluster,
  wires: cluster.wires.map((wire) => ({
    ...wire,
    key: `${wire.from.join("")}-${wire.to.join("")}`,
    d: wirePath(port(...wire.from), port(...wire.to), wire.mid),
  })),
}))

// Two of the nine are live sessions. The rest are idle, which is what makes the
// mint ones mean something. They sit in different slots on each side, so the
// eye does not pair them off.
const live: NodeId[] = ["l2", "r3"]

/** A node on the board: a panel with a status dot, a title bar, and two body lines. */
function Card({ id, index }: { id: NodeId; index: number }) {
  const { x, y, w } = nodes[id]
  const isLive = live.includes(id)
  const left = x - w / 2
  const top = y - CARD_H / 2
  return (
    <g
      className="animate-node-in motion-reduce:animate-none"
      style={{ animationDelay: `${260 + index * 90}ms` }}
    >
      {isLive && <circle cx={x} cy={y} r="56" fill="url(#mesh-halo)" />}
      <rect
        x={left}
        y={top}
        width={w}
        height={CARD_H}
        rx="6"
        fill="var(--color-panel)"
        stroke={isLive ? "var(--color-mint)" : "var(--color-hair)"}
        strokeWidth="1.25"
      />
      {/* The title-bar rule, which is what makes a rectangle read as a panel. */}
      <line
        x1={left}
        y1={top + 11}
        x2={left + w}
        y2={top + 11}
        stroke="var(--color-hair)"
        strokeWidth="1"
      />
      <circle
        cx={left + 8}
        cy={top + 5.5}
        r="2.2"
        fill={isLive ? "var(--color-mint)" : "var(--color-hair)"}
        className={cn(
          isLive && "animate-pulse-node motion-reduce:animate-none"
        )}
        style={
          isLive
            ? { transformOrigin: `${left + 8}px ${top + 5.5}px` }
            : undefined
        }
      />
      <rect
        x={left + 15}
        y={top + 4}
        width={w - 28}
        height="3"
        rx="1.5"
        fill="var(--color-hair)"
      />
      <rect
        x={left + 8}
        y={top + 17}
        width={w - 22}
        height="2.5"
        rx="1.25"
        fill="var(--color-hair)"
        opacity="0.75"
      />
      <rect
        x={left + 8}
        y={top + 24}
        width={(w - 22) * 0.6}
        height="2.5"
        rx="1.25"
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
      className={cn("pointer-events-none select-none", className)}
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
              stopOpacity="0.32"
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
                  <circle key={key} r="3" fill="var(--color-mint)">
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
