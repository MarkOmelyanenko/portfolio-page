import { useState } from "react";
import { archiveProjects } from "../data/archive";
import ExternalLink from "./ExternalLink";

const PANEL_ID = "archive-panel";

export default function Archive() {
  const [open, setOpen] = useState(false);
  const count = archiveProjects.length;

  return (
    <section id="archive" className="border-t border-line py-16 md:py-20">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={PANEL_ID}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-6 py-2 text-left"
        >
          <span>
            <span className="block text-lg font-medium tracking-tight text-ink md:text-xl">
              Other projects / experiments
            </span>
            <span className="mt-1 block text-sm text-mute">
              {count} earlier projects, coursework and explorations
            </span>
          </span>
          <svg
            className={`h-5 w-5 shrink-0 text-faint transition-transform ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="m6 9 6 6 6-6"
            />
          </svg>
        </button>

        <div
          id={PANEL_ID}
          className={`archive-reveal ${open ? "is-open" : ""}`}
          inert={!open}
        >
          <div className="archive-reveal-inner">
            <ul className="mt-8 divide-y divide-line border-y border-line">
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
          </div>
        </div>
      </div>
    </section>
  );
}
