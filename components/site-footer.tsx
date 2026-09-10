"use client"

import { Mail, Phone } from "lucide-react"
import { content, NAV_SECTIONS } from "@/lib/content"
import { SocialLinks } from "@/components/social-links"

const QUICK = ["about", "skills", "projects", "experience", "education", "resume", "contact"]

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function SiteFooter() {
  const { profile } = content
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-md border border-brand/40 bg-brand/10 font-mono text-sm font-bold text-brand">
                B
              </span>
              <span className="text-base font-semibold">{profile.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{profile.title}</p>
            <div className="mt-5">
              <SocialLinks size="sm" />
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Quick links
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_SECTIONS.filter((s) => QUICK.includes(s.id)).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => go(s.id)}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
                >
                  <Mail className="size-4" />
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
                >
                  <Phone className="size-4" />
                  {profile.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {year} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Tirupati, India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
