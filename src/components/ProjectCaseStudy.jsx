import ExternalLink from "./ExternalLink";
import VisualSwitch from "./VisualSwitch";

export default function ProjectCaseStudy({ project, reverse = false }) {
  const visual = project.visual?.options?.length ? project.visual : null;

  return (
    <article
      className={
        visual
          ? "grid items-start gap-10 lg:grid-cols-2 lg:gap-14"
          : "max-w-3xl"
      }
    >
      <div className={visual && reverse ? "lg:order-2" : undefined}>
        <p className="font-mono text-xs text-faint">{project.number}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {project.title}
        </h3>
        {project.badge ? (
          <p className="mt-3 inline-block rounded-md border border-line px-2.5 py-1 text-xs text-accent">
            {project.badge}
          </p>
        ) : null}
        <p className="mt-4 text-base leading-relaxed text-mute">
          {project.positioning}
        </p>
        <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-mute">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-faint" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-faint">
          {project.technologies.join(" · ")}
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {project.github ? (
            <ExternalLink href={project.github} variant="text">
              View source
            </ExternalLink>
          ) : null}
          {project.demo ? (
            <ExternalLink href={project.demo} variant="text">
              Live demo
            </ExternalLink>
          ) : null}
        </div>
      </div>
      {visual ? (
        <div className={reverse ? "lg:order-1" : undefined}>
          <VisualSwitch visual={visual} />
        </div>
      ) : null}
    </article>
  );
}
