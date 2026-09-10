import { Radar } from "lucide-react"
import { content } from "@/lib/content"
import { Section } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { EmptyState } from "@/components/empty-state"

export function CurrentlyLearning() {
  const { currentlyLearning } = content

  return (
    <Section
      id="learning"
      index="10"
      eyebrow="Currently Learning"
      title="What I'm actively exploring"
      description="Continuous learning is the core of how I work. Active learning tracks — with progress and resources — will surface here as I begin them."
    >
      {currentlyLearning.length === 0 ? (
        <EmptyState
          icon={Radar}
          title="No active learning tracks yet"
          description="My current learning topics, progress, and resources will appear here as soon as my B.Tech coursework and self-study begin in earnest."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {currentlyLearning.map((item, i) => (
            <Reveal as="article" key={item.id} delay={i * 60}>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold">{item.name}</h3>
                  <span className="font-mono text-xs text-brand">{item.progress ?? 0}%</span>
                </div>
                {item.description ? (
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                ) : null}
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-brand transition-all"
                    style={{ width: `${item.progress ?? 0}%` }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}
