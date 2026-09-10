import { MapPin, Mail, Phone, GraduationCap, Cpu, BadgeCheck } from "lucide-react"
import { content } from "@/lib/content"
import { Section } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { ProfilePhoto } from "@/components/profile-photo"

export function About() {
  const { about, profile, profileCard } = content

  const cardRows = [
    { label: "Name", value: profile.name, icon: BadgeCheck },
    { label: "Role", value: profileCard.role, icon: Cpu },
    { label: "Education", value: profileCard.education, icon: GraduationCap },
    { label: "Specialization", value: profileCard.specialization, icon: Cpu },
    { label: "Current Level", value: profileCard.level, icon: BadgeCheck },
    { label: "Location", value: profile.location, icon: MapPin },
    { label: "Email", value: profile.email, icon: Mail, href: `mailto:${profile.email}` },
    { label: "Phone", value: profile.phone, icon: Phone, href: `tel:${profile.phone}` },
  ]

  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title="Curious by default, engineer in progress"
    >
      <div className="grid items-start gap-10 lg:grid-cols-[300px_1fr] lg:gap-14">
        <Reveal className="lg:sticky lg:top-24">
          <ProfilePhoto />
          <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {profile.location}
          </p>
        </Reveal>

        <div>
          <Reveal delay={80}>
            <div className="space-y-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-7 flex items-start gap-3 rounded-xl border border-brand/30 bg-brand/5 p-4">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-brand/15 text-brand">
                <Cpu className="size-4" />
              </span>
              <p className="text-sm font-medium leading-relaxed text-foreground">
                {about.highlight}
              </p>
            </div>
          </Reveal>

          <Reveal delay={140} className="mt-10">
            <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-px w-6 bg-border" aria-hidden="true" />
              Personal profile
            </div>
            <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {cardRows.map((row) => (
                <div key={row.label} className="flex items-start gap-3 bg-card p-4">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-brand">
                    <row.icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {row.label}
                    </dt>
                    <dd className="mt-0.5 truncate text-sm font-medium">
                      {row.href ? (
                        <a
                          href={row.href}
                          className="transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                        >
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
