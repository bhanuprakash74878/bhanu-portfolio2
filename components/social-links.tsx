import { content, SOCIAL_META, type SocialKey } from "@/lib/content"
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  YoutubeIcon,
  XIcon,
} from "@/components/brand-icons"
import { cn } from "@/lib/utils"

const ICONS: Record<SocialKey, React.ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  twitter: XIcon,
  youtube: YoutubeIcon,
}

interface SocialLinksProps {
  className?: string
  size?: "sm" | "md"
}

export function SocialLinks({ className, size = "md" }: SocialLinksProps) {
  const entries = (Object.keys(content.social) as SocialKey[]).filter(
    (key) => content.social[key]?.trim().length > 0,
  )

  if (entries.length === 0) {
    return (
      <p className="font-mono text-xs text-muted-foreground">
        Social links will appear here once added.
      </p>
    )
  }

  const dims = size === "sm" ? "size-9" : "size-10"

  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {entries.map((key) => {
        const Icon = ICONS[key]
        return (
          <li key={key}>
            <a
              href={content.social[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL_META[key].label}
              className={cn(
                "group inline-flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-brand/60 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                dims,
              )}
            >
              <Icon className="size-[18px] transition-transform group-hover:-translate-y-0.5" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
