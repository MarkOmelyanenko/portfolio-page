export const openSource = {
  project: "JabRef",
  role: "Open Source Contributor",
  stack: ["Java", "JavaFX", "JUnit", "Gradle"],
  mergedPrCount: 2,
  contributions: [
    {
      title: "Async search race condition",
      href: "https://github.com/JabRef/jabref/pull/16212",
      hrefLabel: "PR #16212",
      description:
        "Fixed a race condition in asynchronous search handling where outdated results could overwrite the latest query, and added a deterministic regression test covering overlapping searches.",
    },
    {
      title: "Cross-platform keyboard tests",
      href: "https://github.com/JabRef/jabref/pull/16218",
      extraHref: "https://github.com/JabRef/jabref/issues/16208",
      extraHrefLabel: "Issue #16208",
      hrefLabel: "PR #16218",
      description:
        "Resolved macOS-specific keyboard shortcut test failures using platform-aware synthetic key events and re-enabled previously skipped cross-platform tests.",
    },
  ],
  note: {
    description:
      "Identified and reproduced an architecture-test regression in another contributor’s pull request using a clean upstream checkout, helping maintainers isolate and revert the affected integration.",
    href: "https://github.com/JabRef/jabref/pull/16145",
    hrefLabel: "PR #16145",
  },
};
