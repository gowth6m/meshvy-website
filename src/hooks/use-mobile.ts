import * as React from "react"

const MOBILE_BREAKPOINT = 768
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

// useSyncExternalStore rather than the registry's useState-in-an-effect: the
// viewport is an external store, and reading it this way keeps the first
// client render in step with the subscription instead of setting state from
// inside the effect that subscribes.
export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.innerWidth < MOBILE_BREAKPOINT,
    // There is no viewport on the server, so the markup is the desktop one and
    // the sidebar swaps to its sheet after hydration.
    () => false
  )
}
