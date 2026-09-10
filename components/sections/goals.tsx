import { content } from "@/lib/content"
import { Section } from "@/components/section"
import { Reveal } from "@/components/reveal"

const HORIZON_LABEL: Record<string, string> = {
  short: "Short term",
  mid: "Mid term",
  long: "Long term",
}

export function Goals() {
  const { goals } = content

  return (
    <Section
      id="goals"
      index="11"
      eyebrow="Goals"
      title="Where I'm headed"
      description="A clear sense of direction keeps the learning focused. Here's what I'm working toward, near and far."
    >
      <ol className="grid gap-4 md:grid-cols-3">
        {goals.map((g, i) => (
          <Reveal as="li" key={g.id} delay={i * 70}>
            <div className="relative flex h-full flex-col rounded-xl border border-border bg-card p-6">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
                {HORIZON_LABEL[g.horizon]}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {g.description}
              </p>
              <div className="mt-5 h-px w-full bg-border" aria-hidden="true" />
              <span className="mt-3 font-mono text-[11px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")} / {String(goals.length).padStart(2, "0")}
              </span>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
