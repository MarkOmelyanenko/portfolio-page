function Box({ title, hint, accent = false }) {
  return (
    <div
      className={`min-w-0 rounded-md border px-2 py-1.5 text-center ${
        accent ? "border-accent" : "border-line"
      }`}
    >
      <p className="text-[11px] font-medium leading-tight text-ink">{title}</p>
      {hint ? (
        <p className="mt-0.5 text-[10px] leading-snug text-faint">{hint}</p>
      ) : null}
    </div>
  );
}

function Stem() {
  return <div className="mx-auto h-2 w-px bg-line" aria-hidden="true" />;
}

export default function ArchitectureDiagram({ architecture }) {
  const { groups, caption, note } = architecture;

  return (
    <figure className="flex h-full min-h-0 flex-col justify-center gap-1 overflow-x-hidden p-2.5 sm:gap-1.5 sm:p-3">
      {groups.map((group, index) => (
        <div key={group.label} className="min-w-0">
          {index > 0 ? <Stem /> : null}
          <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-faint">
            {group.label}
          </p>
          <div
            className={`grid gap-1.5 ${
              group.items.length === 1
                ? "grid-cols-1"
                : group.items.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-3"
            }`}
          >
            {group.items.map((item) => (
              <Box
                key={item.title}
                title={item.title}
                hint={item.hint}
                accent={group.accent}
              />
            ))}
          </div>
        </div>
      ))}
      {note ? (
        <p className="pt-1 text-center text-[10px] leading-snug text-faint">
          {note}
        </p>
      ) : null}
      {caption ? (
        <figcaption className="text-center text-[10px] leading-snug text-faint">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
