"use client"

import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [hidden, setHidden] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const hideAt = reduceMotion ? 200 : 1050
    const t1 = setTimeout(() => setHidden(true), hideAt)
    const t2 = setTimeout(() => setGone(true), hideAt + 500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (gone) return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50 radial-fade" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative flex size-16 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-brand/30" />
          <span className="absolute inset-0 animate-pulse-ring rounded-full border border-brand/50" />
          <span className="font-mono text-lg font-semibold text-brand">B</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
          <span>Initializing portfolio</span>
          <span className="animate-blink text-brand">_</span>
        </div>
        <div className="h-px w-40 overflow-hidden bg-border">
          <span className="block h-full w-1/2 animate-marquee bg-brand" />
        </div>
      </div>
    </div>
  )
}
