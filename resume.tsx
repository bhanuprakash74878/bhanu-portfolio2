"use client"

import { useEffect, useState } from "react"
import { FileText, Eye, Download, X, ShieldAlert, Clock } from "lucide-react"
import { content } from "@/lib/content"
import { Section } from "@/components/section"
import { Reveal } from "@/components/reveal"

export function Resume() {
  const { resume, profile } = content
  const hasResume = Boolean(resume.url)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    if (!confirmOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setConfirmOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [confirmOpen])

  const startDownload = () => {
    if (!resume.url) return
    const a = document.createElement("a")
    a.href = resume.url
    a.download = `${profile.name.replace(/\s+/g, "-")}-Resume.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setConfirmOpen(false)
  }

  return (
    <Section id="resume" index="09" eyebrow="Resume" title="My resume">
      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <FileText className="size-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">{profile.name} — Resume</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {hasResume
                    ? "Preview it in the browser, or download a copy. Nothing downloads automatically."
                    : "A downloadable resume hasn't been uploaded yet. This section is ready to serve it the moment it is."}
                </p>
                <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <Clock className="size-3.5" aria-hidden="true" />
                  Last updated: {resume.lastUpdated ?? "Not available yet"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={hasResume ? (resume.url as string) : undefined}
                target={hasResume ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-disabled={!hasResume}
                onClick={(e) => {
                  if (!hasResume) e.preventDefault()
                }}
                className={`inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-colors ${
                  hasResume
                    ? "hover:border-brand/60"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                <Eye className="size-4" />
                View Resume
              </a>
              <button
                onClick={() => hasResume && setConfirmOpen(true)}
                disabled={!hasResume}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="size-4" />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {confirmOpen ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-confirm-title"
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setConfirmOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <ShieldAlert className="size-5" aria-hidden="true" />
              </span>
              <button
                onClick={() => setConfirmOpen(false)}
                aria-label="Cancel download"
                className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-[18px]" />
              </button>
            </div>
            <h3 id="resume-confirm-title" className="mt-4 text-lg font-semibold">
              Download resume?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              You&apos;re about to download {profile.name}&apos;s resume as a PDF to your device.
              Confirm to continue, or cancel to keep browsing.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                Cancel
              </button>
              <button
                onClick={startDownload}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Download className="size-4" />
                Confirm download
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Section>
  )
}
