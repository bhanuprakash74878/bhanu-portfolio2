import { Trophy } from "lucide-react"
import { content } from "@/lib/content"
import { Section } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { EmptyState } from "@/components/empty-state"

export function Achievements() {
  const { achievements } = content

  return (
    <Section
      id="achievements"
      index="07"
      eyebrow="Achievements"
      title="Milestones worth marking"
      description="This space is reserved for genuine achievements — recognitions, wins, and standout moments — which will be added as they happen."
    >
      {achievements.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="No achievements listed yet"
          description="Titles, descriptions, dates, organizations, and supporting links will appear here over time."
        />
      ) : (
        <ol className="space-y-4">
          {achievements.map((a, i) => (
            <Reveal as="li" key={a.id} delay={i * 60}>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start gap-4">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Trophy className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{a.title}</h3>
                    {a.organization ? (
                      <p className="text-sm text-brand">{a.organization}</p>
                    ) : null}
                    {a.description ? (
                      <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      )}
    </Section>
  )
}
