const textLinkClass =
  "inline-flex items-center gap-1 text-ink underline decoration-mute underline-offset-4 transition-colors hover:decoration-ink";

function ArrowIcon() {
  return (
    <svg
      className="h-3 w-3 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M7 17 17 7M8 7h9v9"
      />
    </svg>
  );
}

export default function ExternalLink({
  href,
  children,
  className = "",
  download,
  variant,
}) {
  const isDownload = Boolean(download);
  const sameTab =
    isDownload || href.startsWith("#") || href.startsWith("mailto:");
  const isText = variant === "text";

  return (
    <a
      href={href}
      className={isText ? `${textLinkClass} ${className}` : className}
      {...(isDownload ? { download } : {})}
      {...(!sameTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {isText && !sameTab ? <ArrowIcon /> : null}
    </a>
  );
}
