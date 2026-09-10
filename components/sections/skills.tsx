import { Code2, Layers, Server, BrainCircuit, Database, Cloud, GitBranch, Wrench, Boxes } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { content } from "@/lib/content"
import { Section } from "@/components/section"
import { Reveal } from "@/components/reveal"

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Programming Languages": Code2,
  Frontend: Layers,
  Backend: Server,
  "AI / ML": BrainCircuit,
  Databases: Database,
  Cloud: Cloud,
  DevOps: GitBranch,
  Tools: Wrench,
  Other: Boxes,
}

export function Skills() {
  const { skills, skillCategories } = content

  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title="A technology stack, being built from the ground up"
      description="I'm a fresher just beginning my technical journey, so this space is intentionally honest and empty for now. As I genuinely learn each technology, it will appear here with a proficiency level, learning status, and the projects it powered."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => {
          const Icon = CATEGORY_ICONS[category] ?? Boxes
          const items = skills.filter((s) => s.category === category)
          return (
            <Reveal as="article" key={category} delay={i * 40}>
              <div className="group h-full rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/50">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-brand transition-colors group-hover:bg-brand/15">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {items.length === 0 ? "Awaiting entries" : `${items.length} skills`}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold">{category}</h3>
                {items.length === 0 ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    To be added as I learn.
                  </p>
                ) : (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {items.map((s) => (
                      <li
                        key={s.id}
                        className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium"
                      >
                        {s.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
