import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useSiteContent } from "../context/LocaleContext";
import { assetUrl } from "../utils/assetUrl";
import qashqaiLanding from "../../cars/Qashqai/qashqai.png";
import xtrailLanding from "../../cars/x-trail/x-trail.png";

const heroSlides = [
  {
    key: "patrol",
    src: assetUrl("cars/hf_20260423_083635_a181ade0-2d4c-4425-8b66-8c6b8cb9ea68.png"),
    mobileKey: "mob-1",
    model: "PATROL",
  },
  {
    key: null,
    src: qashqaiLanding,
    mobileKey: null,
    model: "QASHQAI",
    mobileObjectPositionClass: "object-[68%_42%] lg:object-center",
  },
  {
    key: null,
    src: xtrailLanding,
    mobileKey: null,
    model: "X-TRAIL",
    mobileObjectPositionClass: "object-[70%_42%] lg:object-center",
  },
];

const responsiveSet = (key, ext) =>
  [480, 768, 1024, 1440]
    .map((w) => `${assetUrl(`cars/optimized/${key}-${w}.${ext}`)} ${w}w`)
    .join(", ");

const Hero = () => {
  const { brand, hero: heroContent, ui } = useSiteContent();
  const rootRef = useRef(null);
  const eyebrowRef = useRef(null);
  const badgeRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const activeSlide = heroSlides[activePhotoIndex];

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.65 }, 0);
    tl.from(badgeRef.current, { y: 16, opacity: 0, duration: 0.55 }, 0.08);
    tl.from(line1Ref.current, { y: 48, opacity: 0, duration: 0.85 }, 0.12);
    tl.from(line2Ref.current, { y: 48, opacity: 0, duration: 0.85 }, 0.2);
    tl.from(descRef.current, { y: 24, opacity: 0, duration: 0.75 }, 0.35);
    tl.from(
      ctaRef.current?.children || [],
      { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 },
      0.45
    );
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActivePhotoIndex((previous) => (previous + 1) % heroSlides.length);
    }, 7000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <picture
            key={slide.src}
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
              index === activePhotoIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.mobileKey ? (
              <>
                <source
                  media="(max-width: 1023px)"
                  type="image/avif"
                  srcSet={responsiveSet(slide.mobileKey, "avif")}
                  sizes="100vw"
                />
                <source
                  media="(max-width: 1023px)"
                  type="image/webp"
                  srcSet={responsiveSet(slide.mobileKey, "webp")}
                  sizes="100vw"
                />
              </>
            ) : null}
            {slide.key ? <source type="image/avif" srcSet={responsiveSet(slide.key, "avif")} sizes="100vw" /> : null}
            {slide.key ? <source type="image/webp" srcSet={responsiveSet(slide.key, "webp")} sizes="100vw" /> : null}
            <img
              src={slide.src}
              alt={heroContent.titleLine1}
              className={`h-full w-full object-cover ${
                slide.mobileObjectPositionClass ?? "object-center"
              }`}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding={index === 0 ? "sync" : "async"}
            />
          </picture>
        ))}
      </div>

      <div className="section-gutter relative z-10 grid min-h-screen flex-1 grid-cols-1 items-end gap-10 pb-14 pt-24 max-lg:pb-12 lg:pb-28 lg:pt-36">
        <div className="max-w-4xl">
          {heroContent.eyebrow ? (
            <p
              ref={eyebrowRef}
              className="hidden max-w-2xl text-[11px] font-medium uppercase leading-relaxed tracking-[0.26em] text-white/78 sm:text-xs lg:block"
            >
              {heroContent.eyebrow}
            </p>
          ) : null}

          <div
            ref={badgeRef}
            className="mt-5 inline-flex items-center gap-2 border border-white/35 bg-black/20 px-3 py-1.5"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            <span className="font-display text-[10px] uppercase tracking-[0.24em] text-white">
              {heroContent.badge}
            </span>
          </div>

          <h1 className="mt-3 font-display uppercase leading-[0.9] tracking-[0.01em] text-white banner-text-responsive max-lg:!text-[clamp(1.35rem,5.4vw,2.15rem)] max-lg:leading-[0.95] lg:mt-7 lg:!text-[clamp(1rem,2.3vw,1.8rem)]">
            <span ref={line1Ref} className="block lg:text-[3em]">
              NISSAN
            </span>
            <span
              ref={line2Ref}
              className="mt-2 block max-lg:text-[200%] max-lg:leading-[0.92] lg:mt-2 lg:text-[5em] lg:leading-[0.88]"
            >
              {activeSlide.model}
            </span>
          </h1>

          {heroContent.description ? (
            <p
              ref={descRef}
              className="mt-7 max-w-xl text-base leading-relaxed text-white/92 sm:text-lg"
            >
              {heroContent.description}
            </p>
          ) : null}

          {brand.subline ? (
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/80">
              {brand.subline}
            </p>
          ) : null}

          <div
            ref={ctaRef}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <a href={heroContent.catalogHref} className="btn-dealer-primary text-white">
              {ui.catalog}
            </a>
            <a href="#models" className="link-dealer-secondary text-white/90 hover:text-white">
              {ui.viewServices}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
