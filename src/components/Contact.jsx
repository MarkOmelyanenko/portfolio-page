import { site, socialLinks } from "../data/site";
import ExternalLink from "./ExternalLink";
import FadeIn from "./FadeIn";
import { socialIcon } from "./SocialIcons";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <FadeIn>
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Let’s talk
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-mute">
            I’m currently open to Software Engineering opportunities.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ExternalLink
              href={`mailto:${site.email}`}
              className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-page transition-opacity hover:opacity-90"
            >
              Email me
            </ExternalLink>
            {socialLinks
              .filter((link) => link.name !== "Email")
              .map((link) => (
                <ExternalLink
                  key={link.name}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-mute"
                >
                  {socialIcon(link.name, "h-4 w-4")}
                  {link.name}
                </ExternalLink>
              ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
