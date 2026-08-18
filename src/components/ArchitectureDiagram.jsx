function Box({ title, hint, accent = false, children, className = "" }) {
  return (
    <div
      className={`min-w-0 rounded-md border px-1.5 py-1 text-center ${
        accent ? "border-accent" : "border-line"
      } ${className}`}
    >
      <p className="text-[11px] font-medium leading-tight text-ink">{title}</p>
      {hint ? (
        <p className="mt-0.5 text-[10px] leading-snug text-faint">{hint}</p>
      ) : null}
      {children}
    </div>
  );
}

function Stem() {
  return <div className="mx-auto h-1.5 w-px bg-line" aria-hidden="true" />;
}

function FanConnector({ branches = 3, converge = false }) {
  const xs = Array.from(
    { length: branches },
    (_, index) => ((index + 0.5) / branches) * 100,
  );
  const mid = 50;
  const paths = converge
    ? xs.map((x) => `M${x} 0 L${mid} 8`)
    : xs.map((x) => `M${mid} 0 L${x} 8`);

  return (
    <svg
      aria-hidden="true"
      className="h-2 w-full shrink-0 text-line"
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
    >
      {paths.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

function LayerConnect({ branches = 3, converge = false }) {
  return (
    <>
      <div className="shrink-0 @min-[20rem]:hidden">
        <Stem />
      </div>
      <div className="hidden shrink-0 @min-[20rem]:block">
        <FanConnector branches={branches} converge={converge} />
      </div>
    </>
  );
}

function ServiceBox({ service }) {
  return (
    <Box title={service.title} hint={service.hint}>
      {service.integration ? (
        <div className="mt-1 border-t border-line pt-1">
          <p className="text-[11px] font-medium leading-tight text-ink">
            ⇄ {service.integration.title}
          </p>
          {service.integration.hint ? (
            <p className="mt-0.5 text-[10px] leading-snug text-faint">
              {service.integration.hint}
            </p>
          ) : null}
        </div>
      ) : null}
    </Box>
  );
}

export default function ArchitectureDiagram({ architecture }) {
  const { portals, gateway, services, kafka, enrichment, caption, summary } =
    architecture;

  return (
    <figure className="@container flex max-h-full min-h-full flex-col justify-safe-center gap-1 overflow-x-hidden overflow-y-auto p-2 @min-[20rem]:p-2.5">
      {summary ? <p className="sr-only">{summary}</p> : null}

      <div className="grid shrink-0 grid-cols-3 gap-1 @min-[20rem]:gap-1.5">
        {portals.map((portal) => (
          <Box key={portal.title} title={portal.title} />
        ))}
      </div>

      <LayerConnect branches={portals.length} converge />

      <div className="shrink-0 @min-[20rem]:mx-auto @min-[20rem]:w-[min(100%,17rem)]">
        <Box title={gateway.title} hint={gateway.hint} />
      </div>

      <LayerConnect branches={services.length} />

      <div className="grid shrink-0 grid-cols-1 gap-1 @min-[20rem]:grid-cols-3 @min-[20rem]:gap-1.5">
        {services.map((service) => (
          <ServiceBox key={service.title} service={service} />
        ))}
      </div>

      <LayerConnect branches={services.length} converge />

      <div className="grid shrink-0 grid-cols-1 items-stretch gap-1 @min-[20rem]:grid-cols-[1.15fr_0.85fr] @min-[20rem]:gap-1.5">
        <Box accent title={kafka.title} hint={kafka.events}>
          {kafka.paymentFlow ? (
            <p className="mt-0.5 text-[10px] leading-snug text-faint">
              {kafka.paymentFlow}
            </p>
          ) : null}
        </Box>
        <Box title={enrichment.title} hint={enrichment.hint} />
      </div>

      {caption ? (
        <figcaption className="shrink-0 text-center text-[10px] leading-snug text-faint">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
