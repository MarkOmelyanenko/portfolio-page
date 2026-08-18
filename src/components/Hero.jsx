import { site } from "../data/site";
import ExternalLink from "./ExternalLink";
import FadeIn from "./FadeIn";
import { GitHubIcon, LinkedInIcon } from "./SocialIcons";
import LocationPin from "./LocationPin";

function scrollToWork() {
  document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-[78vh] items-center pt-24 pb-20"
    >
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <FadeIn>
          <p className="text-sm text-mute">{site.name}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            Software Engineer building backend systems with Java &amp; Spring Boot.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
            Commercial backend experience, open-source Java contributions, and
            production-oriented full-stack systems using Kafka, PostgreSQL, Redis
            and cloud infrastructure.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={scrollToWork}
              className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-page transition-opacity hover:opacity-90"
            >
              View my work
            </button>
            <ExternalLink
              href={site.cvHref}
              download={site.cvFilename}
              className="rounded-md border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-mute"
            >
              Download CV
            </ExternalLink>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-mute">
            <ExternalLink href={site.github} className="inline-flex items-center gap-1.5 hover:text-ink">
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </ExternalLink>
            <ExternalLink href={site.linkedin} className="inline-flex items-center gap-1.5 hover:text-ink">
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </ExternalLink>
          </div>
          <p className="mt-8 flex items-center gap-1.5 text-sm leading-none text-faint">
            <LocationPin />
            {site.location} · {site.relocation}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
