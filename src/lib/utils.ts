import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const EASE_SOFT = [0.22, 1, 0.36, 1] as const

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Spread onto any anchor leaving the site so the new tab is always announced.
export function externalLink(label: string) {
  return {
    target: "_blank",
    rel: "noreferrer",
    "aria-label": `${label} (opens in a new tab)`,
  } as const
}
