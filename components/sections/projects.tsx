import { FolderGit2, ExternalLink } from "lucide-react"
import { GithubIcon } from "@/components/brand-icons"
import { content } from "@/lib/content"
import { Section } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { EmptyState } from "@/components/empty-state"

export function Projects() {
  const { projects, projectCategories } = content

  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Projects"
      title="Projects coming soon"
      description="I haven't shipped projects yet — and I'd rather show real work than filler. This section is wired to display live demos, source code, features, and lessons learned the moment my first builds are ready."
    >
      {projects.length === 0 ? (
        <div>
          <div className="mb-6 flex flex-wrap gap-2" aria-hidden="true">
            {projectCategories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
          <EmptyState
            icon={FolderGit2}
            title="First projects in the pipeline"
            description="Each project will include its technologies, repository, live demo, key features, and the challenges I solved along the way."
          />
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal as="article" key={p.id} delay={i * 60}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/50">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.technologies.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-border bg-background px-2 py-0.5 text-xs"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-3">
                  {p.repoUrl ? (
                    <a href={p.repoUrl} className="inline-flex items-center gap-1.5 text-sm text-brand">
                      <GithubIcon className="size-4" /> Code
                    </a>
                  ) : null}
                  {p.liveUrl ? (
                    <a href={p.liveUrl} className="inline-flex items-center gap-1.5 text-sm text-brand">
                      <ExternalLink className="size-4" /> Live
                    </a>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}
