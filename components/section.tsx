import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"

interface SectionProps {
  id: string
  index: string
  eyebrow: string
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-20 sm:py-28", className)}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-brand uppercase">
            <span aria-hidden="true">{index}</span>
            <span className="h-px w-8 bg-brand/40" aria-hidden="true" />
            <span className="text-muted-foreground">{eyebrow}</span>
          </div>
          <h2
            id={`${id}-heading`}
            className="mt-4 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </Reveal>
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  )
}
