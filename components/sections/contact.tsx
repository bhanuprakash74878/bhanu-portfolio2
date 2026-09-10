import { Mail, Phone, MapPin } from "lucide-react"
import { content } from "@/lib/content"
import { Section } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { SocialLinks } from "@/components/social-links"

export function Contact() {
  const { profile } = content

  const items = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: undefined,
    },
  ]

  return (
    <Section
      id="contact"
      index="12"
      eyebrow="Contact"
      title="Let's connect"
      description="The best way to reach me is directly. Feel free to email or call — I'm open to internships, learning opportunities, and good conversations about technology."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal as="article" key={item.label} delay={i * 60}>
            <div className="group h-full rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand/50">
              <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-brand transition-colors group-hover:bg-brand/15">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-1 block break-words text-base font-medium transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 text-base font-medium">{item.value}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8" delay={80}>
        <div className="flex flex-col items-start gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium">Find me online</p>
          <SocialLinks />
        </div>
      </Reveal>
    </Section>
  )
}
