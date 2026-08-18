import { openSource } from "../data/openSource";
import ExternalLink from "./ExternalLink";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

export default function OpenSource() {
  return (
    <section id="open-source" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Open source"
          title="JabRef"
          description="Accepted fixes in a widely used Java bibliography manager — concurrency and cross-platform test reliability."
        />
        <FadeIn>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="text-sm text-mute">{openSource.role}</p>
            <p className="text-sm text-faint">
              {openSource.mergedPrCount} merged pull requests ·{" "}
              {openSource.stack.join(" · ")}
            </p>
          </div>
          <ul className="mt-10 space-y-8">
            {openSource.contributions.map((item) => (
              <li key={item.title} className="max-w-3xl">
                <h3 className="text-lg font-medium tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {item.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  {item.extraHref ? (
                    <ExternalLink href={item.extraHref} variant="text">
                      {item.extraHrefLabel}
                    </ExternalLink>
                  ) : null}
                  <ExternalLink href={item.href} variant="text">
                    {item.hrefLabel}
                  </ExternalLink>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-faint">
            Also identified an architecture-test regression on{" "}
            <ExternalLink
              href={openSource.note.href}
              className="underline decoration-mute underline-offset-4 hover:text-ink hover:decoration-ink"
            >
              {openSource.note.hrefLabel}
            </ExternalLink>{" "}
            using a clean upstream checkout — not counted in the merged PR total.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
