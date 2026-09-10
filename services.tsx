import { Layout, Layers, Brain, Boxes } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { content } from "@/lib/content"
import { Section } from "@/components/section"
import { Reveal } from "@/components/reveal"

const ICONS: Record<string, LucideIcon> = {
  layout: Layout,
  layers: Layers,
  brain: Brain,
}

export function Services() {
  const { services } = content

  return (
    <Section
      id="services"
      index="08"
      eyebrow="Services"
      title="Focus areas I'm growing into"
      description="As a fresher, I'm not offering professional services yet. These are the areas I'm actively building skills in — the foundation for the work I hope to take on."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon ?? ""] ?? Boxes
          return (
            <Reveal as="article" key={s.id} delay={i * 60}>
              <div className="group h-full rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand/50">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-brand transition-colors group-hover:bg-brand/15">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.available ? "Available" : "Learning"}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
