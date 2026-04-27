import { useState } from "react";
import { assetUrl } from "../utils/assetUrl";

const responsiveSet = (key) =>
  [480, 768, 1024, 1440]
    .map((w) => `${assetUrl(`cars/optimized/${key}-${w}.webp`)} ${w}w`)
    .join(", ");

const cards = [
  {
    id: "online",
    title: "Онлайн покупка",
    description:
      "Покупка автомобиля онлайн — быстро, удобно, без визита в дилерский центр.",
    image: assetUrl("cars/optimized/online-1440.webp"),
    optimizedKey: "online",
    href: "#contact",
  },
  {
    id: "about",
    title: "О компании",
    description: "Мы задаем новый ритм автоиндустрии Казахстана.",
    image: assetUrl("cars/optimized/factory-1440.webp"),
    optimizedKey: "factory",
    href: "#about",
  },
  {
    id: "finance",
    title: "Финансовые программы",
    description:
      "Оформление кредита на автомобиль с гибкими сроками и удобными платежами.",
    image: assetUrl("cars/optimized/finance-1440.webp"),
    optimizedKey: "finance",
    href: "#contact",
  },
];

function ArrowIcon({ className }) {
  return (
    <svg
      className={className}
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1 8L8 1M8 1H1.7M8 1V7.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FeatureCardsStrip = () => {
  const [activeId, setActiveId] = useState("finance");

  return (
    <section className="section-gutter w-full bg-ink pb-14 pt-2 lg:pb-20 lg:pt-4" id="services-offers">
      <p className="section-eyebrow font-display text-fog/80">Сервисы и предложения</p>

      <div className="mt-3 w-full min-w-0 border-y border-line bg-graphite/80 py-3 sm:py-4">
        <div className="flex min-w-0 flex-col gap-3 px-3 sm:px-4 md:flex-row md:gap-2 md:px-3 lg:px-4 md:min-h-[min(52vh,440px)] lg:min-h-[420px]">
            {cards.map((card) => {
              const isActive = activeId === card.id;
              return (
                <article
                  key={card.id}
                  className={`group relative min-h-[280px] min-w-0 overflow-hidden rounded-2xl border border-line transition-[flex-grow,flex-basis] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] sm:min-h-[320px] md:basis-0 md:min-h-0 ${
                    isActive ? "md:flex-[2.45_1_0%]" : "md:flex-[0.82_1_0%]"
                  }`}
                  onMouseEnter={() => setActiveId(card.id)}
                  onFocusCapture={() => setActiveId(card.id)}
                >
                  <picture>
                    {card.optimizedKey ? (
                      <source
                        type="image/webp"
                        srcSet={responsiveSet(card.optimizedKey)}
                        sizes="(min-width: 1024px) 33vw, 100vw"
                      />
                    ) : null}
                    <img
                      src={card.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

                  <div className="relative z-10 flex h-full min-h-[280px] flex-col p-4 sm:min-h-[320px] sm:p-6 md:min-h-0">
                    <div className="min-h-0 flex-1" aria-hidden />
                    <div className="shrink-0">
                      <p className="font-display text-xl uppercase tracking-[0.05em] text-white sm:text-3xl sm:tracking-[0.06em]">
                        {card.title}
                      </p>
                      <div
                        className={`mt-2 max-w-lg text-sm leading-relaxed text-white/90 transition-all duration-700 ease-out md:delay-150 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-100 md:max-h-0 md:overflow-hidden md:opacity-0 md:delay-0"
                        }`}
                      >
                        <p>{card.description}</p>
                      </div>
                      <a
                        href={card.href}
                        className="group/cta mt-4 inline-flex w-fit items-center gap-1.5 font-display text-[8px] uppercase tracking-[0.22em] text-white transition hover:text-white/80 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 sm:text-[9px] sm:tracking-[0.24em]"
                      >
                        <span>Подробнее</span>
                        <ArrowIcon className="h-2.5 w-2.5 shrink-0 sm:h-2.5 sm:w-2.5" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCardsStrip;
