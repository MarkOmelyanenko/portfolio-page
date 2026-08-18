export default function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <header className="mb-12 max-w-2xl md:mb-16">
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-faint">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-mute md:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
