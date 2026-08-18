import { featuredProjects } from "../data/featuredProjects";
import FadeIn from "./FadeIn";
import ProjectCaseStudy from "./ProjectCaseStudy";
import SectionHeading from "./SectionHeading";

export default function SelectedWork() {
  return (
    <section id="work" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title="Production-oriented systems"
          description="Three projects that show backend architecture, reliability and software that has been used outside a classroom."
        />
        <div className="space-y-24 md:space-y-32">
          {featuredProjects.map((project) => (
            <FadeIn key={project.id}>
              <ProjectCaseStudy
                project={project}
                reverse={project.layout === "image-left"}
              />
            </FadeIn>
          ))}
        </div>
        <p className="mt-16 text-sm">
          <a href="#archive" className="text-mute transition-colors hover:text-ink">
            Other projects / experiments →
          </a>
        </p>
      </div>
    </section>
  );
}
