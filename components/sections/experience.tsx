import { Briefcase, Rocket, Target, GraduationCap } from "lucide-react"
import { content } from "@/lib/content"
import { Section } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { EmptyState } from "@/components/empty-state"

export function Experience() {
  const { experience, internshipJourney } = content

  const journeySteps = [
    {
      icon: GraduationCap,
      title: "Year one — foundations",
      copy: "Begin B.Tech with internship access from the first year, building fundamentals alongside real practice.",
    },
    {
      icon: Rocket,
      title: "Ongoing internships",
      copy: "Take on internship opportunities offered by the university to gain hands-on, practical experience.",
    },
    {
      icon: Target,
      title: "By graduation",
      copy: "Aim to graduate with 2+ years of accumulated practical experience. This is a goal, not current experience.",
    },
  ]

  return (
    <Section
      id="experience"
      index="04"
      eyebrow="Experience"
      title="Building practical experience from day one"
      description="I'm currently a fresher with no completed roles yet. Rather than invent experience, here's the deliberate, internship-first path I'm following — and a timeline ready for real entries."
    >
      {experience.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No professional experience to list yet"
          description="Internships, freelance work, research, and contributions will populate this timeline as they happen."
        />
      ) : (
        <ol className="relative space-y-6 border-l border-border pl-6">
          {experience.map((e) => (
            <li key={e.id} className="relative">
              <span className="absolute -left-[29px] top-1 size-3 rounded-full border-2 border-brand bg-background" />
              <h3 className="text-base font-semibold">{e.title}</h3>
              {e.organization ? (
                <p className="text-sm text-brand">{e.organization}</p>
              ) : null}
              {e.description ? (
                <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>
              ) : null}
            </li>
          ))}
        </ol>
      )}

      {/* Internship journey */}
      <Reveal className="mt-14">
        <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-border" aria-hidden="true" />
          Internship journey — the plan
        </div>
        <ol className="grid gap-4 md:grid-cols-3">
          {journeySteps.map((step, i) => (
            <li
              key={step.title}
              className="relative overflow-hidden rounded-xl border border-border bg-card p-5"
            >
              <span className="absolute right-4 top-4 font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-brand">
                <step.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-sm font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.copy}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 font-mono text-[11px] text-muted-foreground">
          Note: these are planned steps and goals — not internships already completed.
        </p>
      </Reveal>
    </Section>
  )
}
