"use client"

import { useCallback, useEffect, useState } from "react"
import { Menu, X, Moon, Sun, Sparkles, FileText, ArrowUpRight } from "lucide-react"
import { NAV_SECTIONS, content } from "@/lib/content"
import { useTheme } from "@/components/theme-provider"
import { openAskBhanu } from "@/lib/ask-bhanu"
import { cn } from "@/lib/utils"

const PRIMARY = ["about", "skills", "projects", "experience", "resume", "contact"]

export function SiteNav() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState("home")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    )
    for (const s of NAV_SECTIONS) {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const go = useCallback((id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/70 bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8"
        >
          <button
            onClick={() => go("home")}
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          >
            <span className="flex size-8 items-center justify-center rounded-md border border-brand/40 bg-brand/10 font-mono text-sm font-bold text-brand">
              B
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              Bhanu Prakash
            </span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_SECTIONS.filter((s) => PRIMARY.includes(s.id)).map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active === s.id ? "text-brand" : "text-muted-foreground",
                  )}
                  aria-current={active === s.id ? "true" : undefined}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </button>

            <button
              onClick={() => openAskBhanu()}
              className="hidden items-center gap-2 rounded-md border border-brand/40 bg-brand/10 px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
            >
              <Sparkles className="size-4" />
              Ask Bhanu
            </button>

            <button
              onClick={() => go("resume")}
              className="hidden items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:inline-flex"
            >
              <FileText className="size-4" />
              Resume
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:border-brand/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Menu className="size-[18px]" />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-section menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-opacity duration-300",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div
          className="absolute inset-0 bg-background/70 backdrop-blur-md"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Navigate
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-[18px]" />
            </button>
          </div>

          <nav aria-label="All sections" className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="flex flex-col">
              {NAV_SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <button
                    onClick={() => go(s.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active === s.id
                        ? "bg-brand/10 text-brand"
                        : "text-foreground hover:bg-accent",
                    )}
                    aria-current={active === s.id ? "true" : undefined}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base font-medium">{s.label}</span>
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "size-4 transition-opacity",
                        active === s.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-border p-4">
            <button
              onClick={() => {
                setMenuOpen(false)
                openAskBhanu()
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand/40 bg-brand/10 px-4 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Sparkles className="size-4" />
              Ask Bhanu — AI assistant
            </button>
            <p className="mt-3 text-center font-mono text-[11px] text-muted-foreground">
              {content.profile.location}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
