import { education } from "../data/education";
import { site } from "../data/site";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionHeading eyebrow="About" title="Background" />
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)]">
          <FadeIn>
            <div className="max-w-2xl space-y-5 text-base leading-relaxed text-mute">
              <p>
                I’m a Computer Science graduate from Poznan University of
                Technology with an Erasmus year at UMONS in Belgium. I primarily
                work with Java and Spring Boot and enjoy backend problems
                involving distributed systems, reliability and data flow.
              </p>
              <p>
                I’m particularly interested in systems that move beyond basic
                CRUD — asynchronous processing, caching, observability,
                real-time communication and reliable integration between
                services.
              </p>
              <p className="text-sm text-faint">
                {site.location} · {site.relocation}
              </p>
              <p className="text-sm text-faint">
                English and Polish — professional working proficiency. Ukrainian
                — native. Russian — fluent.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <ul className="space-y-8">
              {education.map((item) => (
                <li key={item.school}>
                  <h3 className="text-base font-medium text-ink">{item.school}</h3>
                  <p className="mt-1 text-sm text-mute">{item.detail}</p>
                  <p className="mt-1 text-sm text-faint">{item.period}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
