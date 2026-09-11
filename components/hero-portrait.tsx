"use client"

import { useEffect, useRef } from "react"

/**
 * Editorial photo panel for the Hero: a diagonal off-white geometric panel
 * behind a portrait cutout, with a very subtle ambient glow, thin geometric
 * accents, and a small parallax tilt on desktop hover. The panel/diagonal
 * shape and mask are driven entirely by CSS (percentage-based clip-path and
 * mask gradients) so they stay correct at any viewport size.
 */
export function HeroPortrait() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return

    let raf = 0

    function onMove(e: MouseEvent) {
      const rect = wrap!.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        img!.style.transform = `translate3d(${px * -8}px, ${py * -6}px, 0) scale(1.02)`
      })
    }

    function onLeave() {
      cancelAnimationFrame(raf)
      img!.style.transform = "translate3d(0, 0, 0) scale(1)"
    }

    wrap.addEventListener("mousemove", onMove)
    wrap.addEventListener("mouseleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener("mousemove", onMove)
      wrap.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="relative z-10 mt-14 h-[360px] w-full sm:h-[440px] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-full lg:w-[47%]"
      aria-hidden={false}
    >
      {/* Ambient glow, secondary to the portrait */}
      <div
        className="pointer-events-none absolute -inset-10 -z-10 opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(45% 55% at 70% 45%, color-mix(in oklch, var(--brand) 30%, transparent), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Diagonal off-white panel */}
      <div
        className="absolute inset-0 bg-[oklch(0.97_0.004_90)] [clip-path:polygon(10%_0%,100%_0%,100%_100%,0%_100%)] lg:[clip-path:polygon(34%_0%,100%_0%,100%_100%,2%_100%)]"
        aria-hidden="true"
      >
        {/* subtle thin geometric line accent */}
        <div
          className="absolute inset-y-0 left-0 w-px opacity-[0.15]"
          style={{ background: "linear-gradient(to bottom, transparent, oklch(0.4 0.02 264), transparent)" }}
        />
      </div>

      {/* thin accent line tracing the diagonal boundary */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 [clip-path:polygon(10%_0%,10.4%_0%,0.4%_100%,0%_100%)] lg:[clip-path:polygon(34%_0%,34.4%_0%,2.4%_100%,2%_100%)]"
        style={{ background: "color-mix(in oklch, var(--brand) 70%, transparent)" }}
        aria-hidden="true"
      />

      {/* floating particles, minimal and secondary */}
      <span
        className="absolute left-[6%] top-[14%] size-1.5 rounded-full opacity-70 animate-float lg:left-[30%]"
        style={{ background: "var(--brand)", animationDelay: "0.4s" }}
        aria-hidden="true"
      />
      <span
        className="absolute right-[10%] top-[8%] size-1 rounded-full opacity-50 animate-float"
        style={{ background: "var(--cyan)", animationDelay: "1.2s" }}
        aria-hidden="true"
      />

      {/* Portrait cutout: object-contain guarantees the full person (hair to
          shoulders) is always shown, never cropped, regardless of viewport */}
      <div
        ref={imgRef}
        className="absolute bottom-0 left-[6%] right-[4%] top-[6%] transition-transform duration-300 ease-out will-change-transform lg:left-[28%] lg:right-[3%] lg:top-[9%]"
      >
        <img
          src="/images/profile-portrait.png"
          alt="Portrait of Puttam Bhanu Prakash"
          width={760}
          height={1018}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]"
          style={{ objectPosition: "38% 100%" }}
        />
      </div>

      {/* fine grid texture confined to the panel, echoing the site's grid-bg */}
      <div
        className="grid-bg pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply [clip-path:polygon(10%_0%,100%_0%,100%_100%,0%_100%)] lg:[clip-path:polygon(34%_0%,100%_0%,100%_100%,2%_100%)]"
        aria-hidden="true"
      />
    </div>
  )
}
