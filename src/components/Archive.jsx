import { archiveProjects } from "../data/archive";
import ExternalLink from "./ExternalLink";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

export default function Archive() {
  return (
    <section id="archive" className="border-t border-line py-20 md:py-24">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Archive"
          title="Other projects / experiments"
          description="Earlier coursework, utilities and explorations. Kept here so the homepage can stay focused on engineering work."
        />
        <FadeIn>
          <ul className="divide-y divide-line border-y border-line">
            {archiveProjects.map((project) => (
              <li
                key={project.title}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <div className="min-w-0">
                  <p className="text-sm text-ink">{project.title}</p>
                  <p className="mt-1 text-xs text-faint">
                    {project.category} · {project.stack}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-4 text-sm">
                  {project.github ? (
                    <ExternalLink href={project.github} variant="text">
                      {project.githubLabel ?? "Source"}
                    </ExternalLink>
                  ) : null}
                  {project.extraGithub ? (
                    <ExternalLink href={project.extraGithub} variant="text">
                      {project.extraGithubLabel}
                    </ExternalLink>
                  ) : null}
                  {project.demo ? (
                    <ExternalLink href={project.demo} variant="text">
                      Demo
                    </ExternalLink>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
