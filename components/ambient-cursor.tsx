"use client"

import { useEffect, useRef } from "react"

/**
 * Subtle cursor-following ambient glow. Desktop + fine-pointer only, and fully
 * disabled under prefers-reduced-motion. Purely decorative and pointer-events
 * none, so it never interferes with usability.
 */
export function AmbientCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!finePointer || reduceMotion) return

    const el = ref.current
    if (!el) return

    let raf = 0
    let tx = 0
    let ty = 0
    let x = 0
    let y = 0

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      el.style.opacity = "1"
    }
    const onLeave = () => {
      el.style.opacity = "0"
    }
    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate3d(${x - 160}px, ${y - 160}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden size-80 rounded-full opacity-0 blur-[90px] transition-opacity duration-300 md:block"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklch, var(--brand) 18%, transparent), transparent 70%)",
      }}
    />
  )
}
