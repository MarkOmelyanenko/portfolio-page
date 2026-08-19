import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import ArchitectureDiagram from "./ArchitectureDiagram";
import ImageGallery from "./ImageGallery";

function VisualTabs({ options, activeId, onChange }) {
  if (options.length < 2) return null;

  return (
    <div
      role="group"
      aria-label="Project visual"
      className="flex flex-wrap gap-1 border-b border-line px-2 py-1"
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

function ViewportVideo({ option, reduceMotion }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const pausedByObserverRef = useRef(false);
  const userPausedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return undefined;

    const tryPlay = () => {
      if (reduceMotion || userPausedRef.current) return;
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
    };

    const pauseFromObserver = () => {
      if (video.paused) return;
      pausedByObserverRef.current = true;
      video.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          tryPlay();
        } else {
          pauseFromObserver();
        }
      },
      { threshold: [0, 0.35, 0.5, 1] },
    );

    observer.observe(container);

    const onPause = () => {
      if (pausedByObserverRef.current) {
        pausedByObserverRef.current = false;
        return;
      }
      userPausedRef.current = true;
    };

    const onPlay = () => {
      userPausedRef.current = false;
    };

    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);

    return () => {
      observer.disconnect();
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", onPlay);
      video.pause();
    };
  }, [reduceMotion]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <video
        ref={videoRef}
        src={option.src}
        muted
        playsInline
        loop
        controls
        preload="metadata"
        className="h-full w-full bg-page object-contain"
        aria-label={option.label}
      />
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
      <ViewportVideo
        key={option.src}
        option={option}
        reduceMotion={reduceMotion}
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
  const [galleryView, setGalleryView] = useState(() => {
    if (visual.display !== "gallery") return "screenshots";
    const extras = options.filter((option) => option.type !== "image");
    return extras.some((option) => option.id === visual.defaultOption)
      ? visual.defaultOption
      : "screenshots";
  });

  if (options.length === 0) return null;

  if (visual.display === "gallery") {
    const galleryImages = options
      .filter((option) => option.type === "image")
      .map((option) => ({
        id: option.id,
        src: option.src,
        alt: option.alt,
        label: option.label,
      }));
    const extraOptions = options.filter((option) => option.type !== "image");
    const defaultIndex = Math.max(
      0,
      galleryImages.findIndex((image) => image.id === visual.defaultOption),
    );

    if (extraOptions.length === 0) {
      return (
        <ImageGallery images={galleryImages} defaultIndex={defaultIndex} />
      );
    }

    const viewTabs = [
      { id: "screenshots", label: "Product" },
      ...extraOptions.map((option) => ({
        id: option.id,
        label: option.label,
      })),
    ];
    const activeExtra =
      extraOptions.find((option) => option.id === galleryView) ?? extraOptions[0];

    return (
      <div className="overflow-hidden rounded-md border border-line bg-surface">
        <VisualTabs
          options={viewTabs}
          activeId={galleryView}
          onChange={setGalleryView}
        />
        {galleryView === "screenshots" ? (
          <ImageGallery
            images={galleryImages}
            defaultIndex={defaultIndex}
            embedded
          />
        ) : (
          <div className="@container aspect-[16/10] min-h-0 overflow-x-hidden overflow-y-auto">
            <VisualBody option={activeExtra} reduceMotion={reduceMotion} />
          </div>
        )}
      </div>
    );
  }

  const active = options.find((option) => option.id === activeId) ?? options[0];

  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface">
      <VisualTabs options={options} activeId={active.id} onChange={setActiveId} />
      <div
        className={
          active.type === "architecture"
            ? "@container aspect-[16/10] min-h-0 overflow-x-hidden overflow-y-auto"
            : "aspect-[16/10] min-h-0 overflow-hidden"
        }
      >
        <VisualBody option={active} reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}
