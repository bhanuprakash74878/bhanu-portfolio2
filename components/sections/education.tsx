import { GraduationCap } from "lucide-react"
import { content } from "@/lib/content"
import { Section } from "@/components/section"
import { Reveal } from "@/components/reveal"

export function Education() {
  const { education } = content

  return (
    <Section
      id="education"
      index="05"
      eyebrow="Education"
      title="Where I'm learning"
    >
      <div className="space-y-4">
        {education.map((e, i) => (
          <Reveal as="article" key={e.id} delay={i * 60}>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{e.institution}</h3>
                    <p className="text-sm text-muted-foreground">
                      {[e.degree, e.branch].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
                {e.status === "current" ? (
                  <span className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-brand">
                    Current
                  </span>
                ) : null}
              </div>

              {e.specialization ? (
                <p className="mt-4 text-sm">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Specialization ·{" "}
                  </span>
                  <span className="font-medium">{e.specialization}</span>
                </p>
              ) : null}
              {e.note ? (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.note}</p>
              ) : null}
            </div>
          </Reveal>
        ))}

      </div>
    </Section>
  )
}
