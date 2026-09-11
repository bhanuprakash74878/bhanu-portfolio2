"use client"

import { ArrowRight, Download, Sparkles } from "lucide-react"
import { content } from "@/lib/content"
import { HeroVisual } from "@/components/hero-visual"
import { HeroPortrait } from "@/components/hero-portrait"
import { SocialLinks } from "@/components/social-links"
import { openAskBhanu } from "@/lib/ask-bhanu"

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function Hero() {
  const { name, title, intro, tagline } = content.profile

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden pt-16 lg:flex lg:items-center"
      aria-labelledby="hero-heading"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 radial-fade" aria-hidden="true" />
      <HeroVisual />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <div className="max-w-3xl lg:max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand/70" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            <span className="tracking-[0.2em] uppercase">Available for internships</span>
          </div>

          <h1
            id="hero-heading"
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            {name}
          </h1>

          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-medium text-brand sm:text-xl">
            <span className="text-glow">{title}</span>
          </p>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {intro}
          </p>

          <p className="mt-6 font-mono text-xs tracking-[0.15em] text-muted-foreground/80 uppercase">
            {tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("about")}
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand/20 transition-all hover:shadow-brand/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Explore My Journey
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo("resume")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-3 text-sm font-semibold backdrop-blur transition-colors hover:border-brand/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Download className="size-4" />
              Download Resume
            </button>
            <button
              onClick={() => openAskBhanu()}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Sparkles className="size-4" />
              Ask my AI assistant
            </button>
          </div>

          <div className="mt-10">
            <SocialLinks />
          </div>
        </div>
      </div>

      <HeroPortrait />
    </section>
  )
}
