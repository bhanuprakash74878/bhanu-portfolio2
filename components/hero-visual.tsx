"use client"

import { useEffect, useRef } from "react"

/**
 * Subtle AI/network visualization on a canvas. Kept intentionally lightweight:
 * capped device-pixel-ratio, node count scaled to viewport, animation paused
 * when the tab is hidden, and a single static frame when the user prefers
 * reduced motion.
 */
export function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    let width = 0
    let height = 0
    let raf = 0
    let running = true

    const styles = getComputedStyle(document.documentElement)
    const readColor = (name: string, fallback: string) =>
      styles.getPropertyValue(name).trim() || fallback

    type Node = { x: number; y: number; vx: number; vy: number; r: number }
    let nodes: Node[] = []

    function resize() {
      const parent = canvas!.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(46, Math.max(18, Math.round((width * height) / 22000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.8,
      }))
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      const brand = readColor("--brand", "oklch(0.8 0.145 80)")
      const cyan = readColor("--cyan", "oklch(0.75 0.12 220)")

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22
            ctx.strokeStyle = `color-mix(in oklch, ${j % 3 === 0 ? cyan : brand} ${Math.round(alpha * 100)}%, transparent)`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `color-mix(in oklch, ${brand} 70%, transparent)`
        ctx.fill()
      }
    }

    function step() {
      if (!running) return
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    resize()
    if (reduceMotion) {
      draw()
    } else {
      step()
    }

    const onResize = () => {
      resize()
      if (reduceMotion) draw()
    }
    const onVisibility = () => {
      running = !document.hidden && !reduceMotion
      if (running) step()
      else cancelAnimationFrame(raf)
    }

    window.addEventListener("resize", onResize)
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full radial-fade"
    />
  )
}
