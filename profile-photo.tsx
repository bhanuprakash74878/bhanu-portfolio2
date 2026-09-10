import Image from "next/image"
import { UserRound } from "lucide-react"
import { content } from "@/lib/content"

export function ProfilePhoto() {
  const { photoUrl, name } = content.profile
  const hasPhoto = Boolean(photoUrl)

  return (
    <div className="group relative mx-auto aspect-square w-full max-w-[300px]">
      {/* ambient glow */}
      <div
        className="absolute -inset-4 rounded-full opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, color-mix(in oklch, var(--brand) 30%, transparent), transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* rotating conic ring */}
      <div
        className="absolute inset-0 rounded-full opacity-70"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, color-mix(in oklch, var(--brand) 60%, transparent) 90deg, transparent 200deg, color-mix(in oklch, var(--cyan) 55%, transparent) 300deg, transparent 360deg)",
          animation: "spin 14s linear infinite",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-[3px] rounded-full bg-background" aria-hidden="true" />

      <div className="absolute inset-[6px] overflow-hidden rounded-full border border-border bg-card">
        {hasPhoto ? (
          <Image
            src={photoUrl as string}
            alt={`${name} — Profile Photo`}
            fill
            sizes="300px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        ) : (
          <div
            role="img"
            aria-label={`${name} — profile photo placeholder`}
            className="relative flex h-full w-full flex-col items-center justify-center gap-3 text-center"
          >
            <div className="grid-bg absolute inset-0 opacity-50" aria-hidden="true" />
            <span className="relative flex size-16 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-brand">
              <UserRound className="size-8" aria-hidden="true" />
            </span>
            <span className="relative font-mono text-xl font-semibold tracking-widest text-foreground">
              BP
            </span>
            <span className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Profile Photo
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
