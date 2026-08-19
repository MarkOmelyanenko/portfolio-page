import { useCallback, useEffect, useRef, useState } from "react";

function ChevronIcon({ direction }) {
  return (
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
        d={direction === "left" ? "M15 19 7 12l8-7" : "M9 5l8 7-8 7"}
      />
    </svg>
  );
}

function GalleryLightbox({ images, index, onClose, onChange }) {
  const dialogRef = useRef(null);
  const lastIndex = images.length - 1;

  const goPrev = useCallback(() => {
    onChange(index === 0 ? lastIndex : index - 1);
  }, [index, lastIndex, onChange]);

  const goNext = useCallback(() => {
    onChange(index === lastIndex ? 0 : index + 1);
  }, [index, lastIndex, onChange]);

  useEffect(() => {
    dialogRef.current?.showModal();
    return () => {
      if (dialogRef.current?.open) dialogRef.current.close();
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    dialog.addEventListener("keydown", onKeyDown);
    return () => dialog.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  const active = images[index];

  return (
    <dialog
      ref={dialogRef}
      className="gallery-lightbox"
      aria-labelledby="gallery-lightbox-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <button
        type="button"
        className="gallery-lightbox-close"
        aria-label="Close gallery"
        onClick={onClose}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="gallery-lightbox-panel">
        {images.length > 1 ? (
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-nav-prev"
            aria-label="Previous image"
            onClick={goPrev}
          >
            <ChevronIcon direction="left" />
          </button>
        ) : null}

        <figure className="gallery-lightbox-figure">
          <img
            key={active.src}
            src={active.src}
            alt={active.alt}
            width={1600}
            height={1000}
            decoding="async"
            className="gallery-lightbox-image"
          />
          <figcaption className="gallery-lightbox-caption">
            <span id="gallery-lightbox-title" className="text-sm text-ink">
              {active.label}
            </span>
            {images.length > 1 ? (
              <span className="text-xs text-faint">
                {index + 1} / {images.length}
              </span>
            ) : null}
          </figcaption>
        </figure>

        {images.length > 1 ? (
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-nav-next"
            aria-label="Next image"
            onClick={goNext}
          >
            <ChevronIcon direction="right" />
          </button>
        ) : null}
      </div>
    </dialog>
  );
}

export default function ImageGallery({ images, defaultIndex = 0, embedded = false }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (images.length === 0) return null;

  const active = images[activeIndex] ?? images[0];
  const lastIndex = images.length - 1;

  const goPrev = () => setActiveIndex((index) => (index === 0 ? lastIndex : index - 1));
  const goNext = () => setActiveIndex((index) => (index === lastIndex ? 0 : index + 1));

  const openLightbox = (index) => setLightboxIndex(index);

  const galleryBody = (
    <>
      <div className="group relative aspect-[16/10] overflow-hidden">
        <button
          type="button"
          className="h-full w-full cursor-zoom-in"
          aria-label={`View ${active.label} full size`}
          onClick={() => openLightbox(activeIndex)}
        >
          <img
            src={active.src}
            alt={active.alt}
            width={1600}
            height={1000}
            loading="lazy"
            decoding="async"
            className="h-full w-full bg-page object-contain object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </button>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-md border border-line/80 bg-page/85 p-1.5 text-mute opacity-0 shadow-sm backdrop-blur-sm transition-opacity hover:text-ink group-hover:opacity-100"
              aria-label="Previous screenshot"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-line/80 bg-page/85 p-1.5 text-mute opacity-0 shadow-sm backdrop-blur-sm transition-opacity hover:text-ink group-hover:opacity-100"
              aria-label="Next screenshot"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
            >
              <ChevronIcon direction="right" />
            </button>
            <p className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-page/85 px-2 py-1 text-[11px] text-mute backdrop-blur-sm">
              {active.label} · Click to expand
            </p>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div
          className="flex gap-1.5 overflow-x-auto border-t border-line p-2"
          role="tablist"
          aria-label="Project screenshots"
        >
          {images.map((image, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={image.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={image.label}
                className={`relative shrink-0 cursor-pointer overflow-hidden rounded border transition-colors ${
                  selected
                    ? "border-ink ring-1 ring-ink"
                    : "border-line hover:border-mute"
                }`}
                onClick={() => {
                  setActiveIndex(index);
                  openLightbox(index);
                }}
              >
                <img
                  src={image.src}
                  alt=""
                  width={320}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-[5.5rem] bg-page object-contain object-top"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </>
  );

  return (
    <>
      {embedded ? (
        galleryBody
      ) : (
        <div className="overflow-hidden rounded-md border border-line bg-surface">
          {galleryBody}
        </div>
      )}

      {lightboxIndex !== null ? (
        <GalleryLightbox
          images={images}
          index={lightboxIndex}
          onClose={() => {
            setActiveIndex(lightboxIndex);
            setLightboxIndex(null);
          }}
          onChange={(index) => {
            setLightboxIndex(index);
            setActiveIndex(index);
          }}
        />
      ) : null}
    </>
  );
}
