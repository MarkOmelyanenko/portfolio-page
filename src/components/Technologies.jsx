import { secondaryTechnologies, technologyGroups } from "../data/technologies";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

export default function Technologies() {
  return (
    <section id="technologies" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Technologies"
          title="Tools I use in production-shaped work"
        />
        <FadeIn>
          <dl className="grid gap-10 sm:grid-cols-2">
            {technologyGroups.map((group) => (
              <div key={group.title}>
                <dt className="text-sm font-medium text-ink">{group.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-mute">
                  {group.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-12 text-sm leading-relaxed text-faint">
            Also: {secondaryTechnologies.join(" · ")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
