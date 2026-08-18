import { experience } from "../data/experience";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionHeading eyebrow="Experience" title="Commercial backend work" />
        <div className="space-y-12">
          {experience.map((role) => (
            <FadeIn key={`${role.company}-${role.period}`}>
              <article className="grid gap-6 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-12">
                <p className="text-sm text-faint">{role.period}</p>
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-ink">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-sm text-mute">{role.company}</p>
                  <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-mute">
                    {role.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-faint" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
