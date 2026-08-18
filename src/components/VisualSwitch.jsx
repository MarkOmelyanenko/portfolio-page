import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import ArchitectureDiagram from "./ArchitectureDiagram";

function VisualTabs({ options, activeId, onChange }) {
  if (options.length < 2) return null;

  return (
    <div
      role="group"
      aria-label="Project visual"
      className="flex gap-1 border-b border-line px-2 py-1"
    >
      {options.map((option) => {
        const selected = option.id === activeId;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.id)}
            className={`rounded px-2 py-1 text-[11px] tracking-wide transition-colors ${
              selected
                ? "bg-page text-ink"
                : "text-faint hover:text-mute"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function VisualBody({ option, reduceMotion }) {
  if (option.type === "image") {
    return (
      <img
        src={option.src}
        alt={option.alt}
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top"
      />
    );
  }

  if (option.type === "video") {
    return (
      <video
        key={option.src}
        src={option.src}
        muted
        playsInline
        loop
        controls
        preload="metadata"
        autoPlay={!reduceMotion}
        className="h-full w-full bg-page object-contain"
        aria-label={option.label}
      />
    );
  }

  if (option.type === "architecture") {
    return <ArchitectureDiagram architecture={option.architecture} />;
  }

  return null;
}

export default function VisualSwitch({ visual }) {
  const reduceMotion = useReducedMotion();
  const options = visual.options ?? [];
  const [activeId, setActiveId] = useState(
    visual.defaultOption ?? options[0]?.id,
  );

  if (options.length === 0) return null;

  const active = options.find((option) => option.id === activeId) ?? options[0];

  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface">
      <VisualTabs options={options} activeId={active.id} onChange={setActiveId} />
      <div
        className={`aspect-[16/10] min-h-0 ${
          active.type === "architecture" ? "overflow-auto" : "overflow-hidden"
        }`}
      >
        <VisualBody option={active} reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}
