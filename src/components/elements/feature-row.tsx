import Image from "next/image"

import Reveal from "@/components/elements/reveal"
import { cn } from "@/lib/utils"

type FeatureRowProps = {
  eyebrow: string
  title: string
  children: React.ReactNode
  shot: { src: string; alt: string; width: number; height: number }
  /** Which edge the board runs off. The canvas does not stop at the viewport. */
  bleed: "start" | "end"
}

// A feature beside a real screenshot, which overruns the page on one side the
// way a board overruns the window: the canvas keeps going, you just pan to it.
export default function FeatureRow({
  eyebrow,
  title,
  children,
  shot,
  bleed,
}: FeatureRowProps) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal
        className={cn(
          "lg:max-w-lg",
          bleed === "start" ? "lg:order-2 lg:justify-self-end" : "lg:order-1"
        )}
      >
        <p className="eyebrow">{eyebrow}</p>
        <h3 className="mt-4 font-display text-2xl leading-[1.15] font-semibold tracking-[-0.03em] md:text-[2rem]">
          {title}
        </h3>
        <div className="mt-5 space-y-4 text-[0.9375rem] text-slate">
          {children}
        </div>
      </Reveal>

      <Reveal
        delay={0.08}
        className={cn(bleed === "start" ? "lg:order-1" : "lg:order-2")}
      >
        <figure
          className={cn(
            "node overflow-hidden p-1 lg:w-[58rem] lg:max-w-none",
            bleed === "start" && "lg:-ms-[22rem]"
          )}
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes="(min-width: 1024px) 58rem, 100vw"
            className="rounded-lg"
          />
        </figure>
      </Reveal>
    </div>
  )
}
