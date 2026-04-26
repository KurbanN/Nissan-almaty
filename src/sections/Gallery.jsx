import { useEffect, useRef, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import gsap from "gsap";
import { useSiteContent } from "../context/LocaleContext";

function GalleryImage({ item }) {
  const [src, setSrc] = useState(item.src);
  return (
    <div className="aspect-[16/10] overflow-hidden">
      <img
        src={src}
        alt={item.caption}
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
        loading="lazy"
        onError={() => item.fallback && setSrc(item.fallback)}
      />
    </div>
  );
}

const Gallery = () => {
  const { galleryItems, gallerySection, ui } = useSiteContent();
  const [active, setActive] = useState(null);
  const overlayRef = useRef(null);
  const rowOne = galleryItems.filter((_, idx) => idx % 2 === 0);
  const rowTwo = galleryItems.filter((_, idx) => idx % 2 !== 0);
  const repeatRow = (items, times = 4) => Array.from({ length: times }, () => items).flat();
  const rowOneItems = repeatRow(rowOne);
  const rowTwoItems = repeatRow(rowTwo);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  useEffect(() => {
    if (!overlayRef.current) return;
    if (active) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [active]);

  return (
    <section id="gallery" className="bg-ink pb-16 lg:pb-24">
      <SectionHeader
        eyebrow={gallerySection.eyebrow}
        title={gallerySection.title}
        text={gallerySection.headerText}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="models-gallery-stack">
          <div className="models-gallery-mask">
            <div className="models-gallery-track models-gallery-track--left">
              {rowOneItems.map((item, index) => (
                <button
                  key={`row-1-${item.id}-${index}`}
                  type="button"
                  onClick={() => setActive(item)}
                  className="models-gallery-slide card-dealer group relative bg-steel text-left transition hover:border-fog/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  aria-label={item.caption}
                >
                  <GalleryImage item={item} />
                </button>
              ))}
            </div>
          </div>

          <div className="models-gallery-mask">
            <div className="models-gallery-track models-gallery-track--right">
              {rowTwoItems.map((item, index) => (
              <button
                key={`row-2-${item.id}-${index}`}
                type="button"
                onClick={() => setActive(item)}
                className="models-gallery-slide card-dealer group relative bg-steel text-left transition hover:border-fog/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                aria-label={item.caption}
              >
                <GalleryImage item={item} />
              </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {active && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 px-4 py-10 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-6 top-6 font-display text-xs uppercase tracking-[0.3em] text-muted transition hover:text-fog"
            onClick={() => setActive(null)}
          >
            {ui.close}
          </button>
          <figure
            className="max-h-[85vh] max-w-5xl overflow-hidden border border-line shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <GalleryOverlayImg active={active} />
            <figcaption className="bg-graphite px-4 py-3 text-center text-xs uppercase tracking-[0.3em] text-muted">
              {active.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};

function GalleryOverlayImg({ active }) {
  const [src, setSrc] = useState(active.src);
  return (
    <img
      src={src}
      alt={active.caption}
      className="max-h-[85vh] w-full object-contain"
      onError={() => active.fallback && setSrc(active.fallback)}
    />
  );
}

export default Gallery;
