import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  /** The mono label above the heading. Names the part of the app in question. */
  eyebrow: string
  title: React.ReactNode
  lede?: React.ReactNode
  align?: "start" | "center"
  className?: string
}

// The one section header on the page: a mono eyebrow, a heading, one line under it.
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 max-w-3xl">{title}</h2>
      {lede && (
        <p
          className={cn(
            "mt-6 max-w-xl text-[1.0625rem] text-slate",
            align === "center" && "mx-auto"
          )}
        >
          {lede}
        </p>
      )}
    </header>
  )
}
