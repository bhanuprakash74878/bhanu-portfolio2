import { Award, ExternalLink } from "lucide-react"
import { content } from "@/lib/content"
import { Section } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { EmptyState } from "@/components/empty-state"

export function Certifications() {
  const { certifications } = content

  return (
    <Section
      id="certifications"
      index="06"
      eyebrow="Certifications"
      title="Verified learning, as it's earned"
      description="No certifications yet. As I complete courses and programs, each credential will appear here with its issuer, date, and a link to verify."
    >
      {certifications.length === 0 ? (
        <EmptyState
          icon={Award}
          title="No certifications yet"
          description="Certificates with issuing organization, credential ID, verification link, and associated skills will be listed here."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal as="article" key={c.id} delay={i * 60}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5">
                <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-brand">
                  <Award className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{c.name}</h3>
                {c.issuer ? <p className="text-sm text-muted-foreground">{c.issuer}</p> : null}
                {c.credentialUrl ? (
                  <a
                    href={c.credentialUrl}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand"
                  >
                    <ExternalLink className="size-4" /> Verify
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}
