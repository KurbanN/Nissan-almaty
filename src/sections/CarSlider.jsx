import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useSiteContent } from "../context/LocaleContext";
import { assetUrl } from "../utils/assetUrl";
import qashqaiLanding from "../../cars/Qashqai/qashqai.png";
import xtrailLanding from "../../cars/x-trail/x-trail.png";

const cars = [
  {
    id: "patrol",
    name: "Nissan Patrol",
    year: "2026",
    strapline: "MSRP",
    offerValue: "29 990 000",
    offerSuffix: "₸",
    offerFootnote: "Стартовая цена",
    description: "Флагманский SUV с мощным V8 и премиальным уровнем комфорта.",
    image: assetUrl("cars/hf_20260423_083635_a181ade0-2d4c-4425-8b66-8c6b8cb9ea68.png"),
    optimizedKey: "patrol",
    imagePosition: "center 56%",
    thumbImagePosition: "center 56%",
  },
  {
    id: "sentra",
    name: "Nissan Sentra",
    year: "2026",
    strapline: "MSRP",
    offerValue: "12 490 000",
    offerSuffix: "₸",
    offerFootnote: "Новая модель в наличии",
    description: "Стильный городской седан с современным интерьером и уверенной динамикой.",
    image: assetUrl("cars/sentra-1.png"),
    optimizedKey: "sentra-main",
    imagePosition: "center 70%",
    thumbImagePosition: "35% 70%",
  },
  {
    id: "qashqai",
    name: "Nissan Qashqai",
    year: "2026",
    strapline: "APR",
    offerValue: "4.9%",
    offerSuffix: "",
    offerFootnote: "Финансирование до 60 месяцев",
    description: "Городской кроссовер с экономичным расходом и современным оснащением.",
    image: qashqaiLanding,
    optimizedKey: null,
    imagePosition: "center 70%",
    thumbImagePosition: "67% 70%",
  },
  {
    id: "xtrail",
    name: "Nissan X-Trail",
    year: "2026",
    strapline: "Cash Back",
    offerValue: "1 500 000",
    offerSuffix: "₸",
    offerFootnote: "Выгода по trade-in",
    description: "Практичный SUV для семьи и путешествий, с полным пакетом поддержки.",
    image: xtrailLanding,
    optimizedKey: null,
    imagePosition: "center 90%",
    thumbImagePosition: "32% 90%",
  },
];

const responsiveSet = (key, ext) =>
  [480, 768, 1024, 1440]
    .map((w) => `${assetUrl(`cars/optimized/${key}-${w}.${ext}`)} ${w}w`)
    .join(", ");

const CarSlider = () => {
  const { hero, ui } = useSiteContent();
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);
  const slidesCount = cars.length;

  const goTo = (index) => {
    const normalized = (index + slidesCount) % slidesCount;
    if (normalized === activeIndex) return;
    setActiveIndex(normalized);
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % slidesCount;
      goTo(nextIndex);
    }, 7000);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, slidesCount]);

  useGSAP(
    () => {
      gsap.from(rootRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
      });
    },
    { scope: rootRef }
  );

  const current = cars[activeIndex];
  const prevIndex = (activeIndex - 1 + slidesCount) % slidesCount;
  const nextIndex = (activeIndex + 1) % slidesCount;
  const prevCar = cars[prevIndex];
  const nextCar = cars[nextIndex];
  const catalogHref = hero.catalogHref;

  return (
    <section id="models" ref={rootRef} className="section-gutter section-y w-full bg-ink">
      <div className="w-full">
        <p className="section-eyebrow font-display text-fog/85">{ui.modelsSectionEyebrow}</p>
        <div className="mt-4 hidden gap-2 lg:mt-6 lg:grid lg:grid-cols-[150px_minmax(0,1fr)_150px]">
          <button
            type="button"
            onClick={() => goTo(prevIndex)}
            className="card-dealer group relative hidden text-left transition hover:border-fog/50 lg:block"
          >
            <picture>
              {prevCar.optimizedKey ? (
                <>
                  <source
                    type="image/avif"
                    srcSet={responsiveSet(prevCar.optimizedKey, "avif")}
                    sizes="150px"
                  />
                  <source
                    type="image/webp"
                    srcSet={responsiveSet(prevCar.optimizedKey, "webp")}
                    sizes="150px"
                  />
                </>
              ) : null}
              <img
                src={prevCar.image}
                alt={prevCar.name}
                className="h-[460px] w-full object-cover"
                style={{ objectPosition: prevCar.thumbImagePosition ?? prevCar.imagePosition ?? "center center" }}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
            <div className="absolute left-3 top-3 z-10">
              <p className="text-sm uppercase tracking-[0.1em] text-white">{prevCar.strapline}</p>
              <p className="mt-1 text-base text-white">
                {prevCar.year} {prevCar.name.replace("Nissan ", "")}
              </p>
            </div>
          </button>

          <article key={current.id} className="card-dealer relative bg-graphite animate-[carSlideFade_420ms_ease-out]">
            <div className="c_491B-image-container">
              <picture>
                {current.optimizedKey ? (
                  <>
                    <source
                      type="image/avif"
                      srcSet={responsiveSet(current.optimizedKey, "avif")}
                      sizes="(min-width: 1024px) calc(100vw - 360px), 100vw"
                    />
                    <source
                      type="image/webp"
                      srcSet={responsiveSet(current.optimizedKey, "webp")}
                      sizes="(min-width: 1024px) calc(100vw - 360px), 100vw"
                    />
                  </>
                ) : null}
                <img
                  src={current.image}
                  alt={current.name}
                  className="h-[300px] w-full object-cover will-change-transform sm:h-[360px] lg:h-[460px]"
                  style={{ objectPosition: current.imagePosition ?? "center center" }}
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                />
              </picture>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="c_491B--offer absolute bottom-0 left-0 z-10 p-4 sm:p-9">
              <p className="hidden text-[10px] font-semibold uppercase tracking-[0.1em] text-white sm:block sm:text-xs sm:tracking-[0.16em]">
                {current.strapline}
              </p>
              <h3 className="mt-1.5 font-display text-[18px] uppercase tracking-[0.01em] text-white sm:mt-2 sm:text-[48px] sm:tracking-[0.03em] lg:text-[56px]">
                {current.year} {current.name.replace("Nissan ", "")}
              </h3>
              <div className="mt-1.5 flex flex-wrap items-end gap-1.5 sm:mt-2 sm:gap-2">
                <p className="font-display text-[34px] uppercase leading-none tracking-[0.01em] text-white sm:text-[62px] sm:tracking-[0.02em] lg:text-[72px]">
                  {current.offerValue}
                  {current.offerSuffix && (
                    <span className="ml-1 text-[0.34em] align-[0.08em] sm:ml-2 sm:text-[0.42em] sm:align-[0.18em]">
                      {current.offerSuffix}
                    </span>
                  )}
                </p>
              </div>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.04em] text-white/90 sm:mt-2 sm:text-base sm:tracking-[0.08em]">
                {current.offerFootnote}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-4">
                <a
                  href={catalogHref}
                  className="btn-dealer-primary w-full text-white sm:w-auto"
                >
                  {ui.carSliderContactCta}
                </a>
                <a
                  href={catalogHref}
                  className="link-dealer-secondary hidden text-white/90 hover:text-white sm:block sm:w-auto"
                >
                  {ui.carSliderOfferDetails}
                </a>
              </div>
            </div>
          </article>

          <button
            type="button"
            onClick={() => goTo(nextIndex)}
            className="card-dealer group relative hidden text-left transition hover:border-fog/50 lg:block"
          >
            <picture>
              {nextCar.optimizedKey ? (
                <>
                  <source
                    type="image/avif"
                    srcSet={responsiveSet(nextCar.optimizedKey, "avif")}
                    sizes="150px"
                  />
                  <source
                    type="image/webp"
                    srcSet={responsiveSet(nextCar.optimizedKey, "webp")}
                    sizes="150px"
                  />
                </>
              ) : null}
              <img
                src={nextCar.image}
                alt={nextCar.name}
                className="h-[460px] w-full object-cover"
                style={{ objectPosition: nextCar.thumbImagePosition ?? nextCar.imagePosition ?? "center center" }}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
            <div className="absolute left-3 top-3 z-10">
              <p className="text-sm uppercase tracking-[0.1em] text-white">{nextCar.strapline}</p>
              <p className="mt-1 text-base text-white">
                {nextCar.year} {nextCar.name.replace("Nissan ", "")}
              </p>
            </div>
          </button>
        </div>

        <div className="mt-3 grid gap-2 lg:hidden">
          {cars.map((car, index) => (
            <button
              key={`${car.id}-mobile-tile`}
              type="button"
              onClick={() => goTo(index)}
              className={`relative overflow-hidden rounded-xl border p-3 text-left transition ${
                index === activeIndex
                  ? "border-fog/70"
                  : "border-line hover:border-line-strong"
              }`}
            >
              <picture>
                {car.optimizedKey ? (
                  <>
                    <source
                      type="image/avif"
                      srcSet={responsiveSet(car.optimizedKey, "avif")}
                      sizes="(max-width: 1023px) 100vw, 0px"
                    />
                    <source
                      type="image/webp"
                      srcSet={responsiveSet(car.optimizedKey, "webp")}
                      sizes="(max-width: 1023px) 100vw, 0px"
                    />
                  </>
                ) : null}
                <img
                  src={car.image}
                  alt={car.name}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 w-full object-cover transition-all duration-300 ${
                    index === activeIndex ? "h-full" : "h-[72px]"
                  }`}
                  style={{ objectPosition: car.thumbImagePosition ?? car.imagePosition ?? "center center" }}
                />
              </picture>
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-gradient-to-t from-black/86 via-black/42 to-black/10"
                    : "bg-gradient-to-r from-black/78 via-black/50 to-black/22"
                }`}
              />
              <div className={`relative z-10 min-w-0 ${index === activeIndex ? "pt-[120px]" : ""}`}>
                <p className="text-[9px] uppercase tracking-[0.12em] text-white/70">{car.strapline}</p>
                <p className="mt-0.5 truncate font-display text-2xl uppercase tracking-[0.05em] text-white">
                  {car.year} {car.name.replace("Nissan ", "")}
                </p>
                {index === activeIndex ? (
                  <>
                    <p className="mt-1 font-display text-[44px] uppercase leading-none tracking-[0.01em] text-white">
                      {car.offerValue}
                      {car.offerSuffix && <span className="ml-1 text-[0.34em] align-[0.08em]">{car.offerSuffix}</span>}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.04em] text-white/90">{car.offerFootnote}</p>
                  </>
                ) : null}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          {cars.map((car, index) => (
            <button
              key={`${car.id}-dot`}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Перейти к ${car.name}`}
              className={`h-1.5 w-8 transition ${
                index === activeIndex ? "bg-gold" : "bg-line hover:bg-line-strong"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarSlider;
