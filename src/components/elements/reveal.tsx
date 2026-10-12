"use client"

import { motion, useReducedMotion } from "motion/react"

import { cn, EASE_SOFT } from "@/lib/utils"

type RevealProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

// The initial style never depends on reduced motion, so server and client markup always match.
export default function Reveal({
  children,
  delay = 0,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const move = { duration: reduceMotion ? 0 : 0.7, ease: EASE_SOFT, delay }

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(4px)",
        transform: "translateY(16px)",
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        transform: "translateY(0px)",
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        opacity: { duration: 0.7, ease: EASE_SOFT, delay },
        filter: move,
        transform: move,
      }}
      // min-w-0 so a reveal used as a grid or flex child never becomes the
      // thing that widens its track: without it the child's min-width:auto
      // sizes to unwrapped content and a scrollable code block pushes the
      // whole page past the viewport on a narrow screen.
      className={cn("min-w-0", className)}
    >
      {children}
    </motion.div>
  )
}
