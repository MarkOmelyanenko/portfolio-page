import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "../data/site";
import ExternalLink from "./ExternalLink";
import ThemeToggle from "./ThemeToggle";
import { GitHubIcon, LinkedInIcon } from "./SocialIcons";

const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "open-source", label: "Open Source" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
];

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", ...NAV_ITEMS.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (isMenuOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isMenuOpen && dialog.open) {
      dialog.close();
    }

    return undefined;
  }, [isMenuOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || "closedBy" in HTMLDialogElement.prototype) return undefined;

    const onClick = (event) => {
      if (event.target !== dialog) return;
      dialog.close();
    };

    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const goTo = useCallback((sectionId) => {
    setIsMenuOpen(false);
    scrollToSection(sectionId);
  }, []);

  const linkClass = (id) =>
    `rounded-md px-2 py-1.5 text-sm transition-colors ${
      activeSection === id
        ? "text-ink"
        : "text-mute hover:text-ink"
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          isScrolled || isMenuOpen
            ? "border-b border-line/80 bg-page/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8"
          aria-label="Primary"
        >
          <button
            type="button"
            className="text-left text-sm font-medium tracking-tight text-ink"
            onClick={() => goTo("home")}
          >
            {site.name}
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(item.id)}
                className={linkClass(item.id)}
              >
                {item.label}
              </button>
            ))}
            <ExternalLink
              href={site.github}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-mute transition-colors hover:text-ink"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </ExternalLink>
            <ExternalLink
              href={site.linkedin}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-mute transition-colors hover:text-ink"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </ExternalLink>
            <ThemeToggle />
            <ExternalLink
              href={site.cvHref}
              download={site.cvFilename}
              className="ml-1 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-page transition-opacity hover:opacity-90"
            >
              CV
            </ExternalLink>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="rounded-md p-2 text-ink"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <dialog
        ref={dialogRef}
        id="mobile-nav-menu"
        className="mobile-nav-dialog md:hidden"
        closedBy="any"
        aria-labelledby="mobile-nav-title"
        onClose={() => setIsMenuOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setIsMenuOpen(false);
        }}
      >
        <div className="flex h-full w-full max-w-sm flex-col border-l border-line bg-page px-6 py-8">
          <h2 id="mobile-nav-title" className="sr-only">
            Site navigation
          </h2>
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md p-2 text-mute hover:text-ink"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(item.id)}
                className={`rounded-md px-3 py-3 text-left text-lg ${
                  activeSection === item.id ? "text-ink" : "text-mute"
                }`}
              >
                {item.label}
              </button>
            ))}
            <ExternalLink
              href={site.github}
              className="inline-flex items-center gap-2.5 rounded-md px-3 py-3 text-lg text-mute"
            >
              <GitHubIcon className="h-5 w-5" />
              GitHub
            </ExternalLink>
            <ExternalLink
              href={site.linkedin}
              className="inline-flex items-center gap-2.5 rounded-md px-3 py-3 text-lg text-mute"
            >
              <LinkedInIcon className="h-5 w-5" />
              LinkedIn
            </ExternalLink>
            <ExternalLink
              href={site.cvHref}
              download={site.cvFilename}
              className="mt-4 inline-flex items-center justify-center gap-2.5 rounded-md bg-accent px-3 py-3 text-base font-medium text-page"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14 3v5h5M8.5 14h3m-3 3h7"
                />
              </svg>
              Download CV
            </ExternalLink>
          </div>
        </div>
      </dialog>
    </>
  );
}
