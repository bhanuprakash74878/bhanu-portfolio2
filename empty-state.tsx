import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function EmptyState({ icon: Icon, title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-dashed border-border/70 bg-card/40 px-6 py-14 text-center",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 grid-bg opacity-40 radial-fade"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <span className="mb-5 inline-flex size-12 items-center justify-center rounded-lg border border-border bg-background text-brand">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">Coming soon</p>
        <h3 className="mt-3 text-lg font-medium">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
