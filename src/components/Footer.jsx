import { site, socialLinks } from "../data/site";
import ExternalLink from "./ExternalLink";
import { socialIcon } from "./SocialIcons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-5 text-sm text-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>{site.name}</p>
        <div className="flex flex-wrap gap-5">
          {socialLinks.map((link) => (
            <ExternalLink
              key={link.name}
              href={link.href}
              className="inline-flex items-center gap-1.5 hover:text-ink"
            >
              {socialIcon(link.name, "h-4 w-4")}
              {link.name}
            </ExternalLink>
          ))}
        </div>
        <p>© {year}</p>
      </div>
    </footer>
  );
}
