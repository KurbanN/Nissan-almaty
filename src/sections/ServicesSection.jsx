import { useRef } from "react";
import SectionHeader from "../components/SectionHeader";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteContent } from "../context/LocaleContext";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const { services, servicesHighlights, servicesSection } = useSiteContent();
  const cardRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" });

  useGSAP(() => {
    cardRefs.current.forEach((el) => {
      if (!el) return;
      gsap.from(el, {
        y: 100,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }, []);

  return (
    <section
      id="services"
      className="min-h-screen rounded-t-[2.5rem] bg-graphite pb-8 sm:pb-12"
    >
      <SectionHeader
        eyebrow={servicesSection.eyebrow}
        title={servicesSection.title}
        text={servicesSection.headerText}
      />

      <div className="section-shell mb-16 grid gap-6 sm:grid-cols-12">
        <article className="rounded-2xl border border-line bg-ink/80 p-8 sm:col-span-8">
          <p className="section-eyebrow font-display text-gold-dim">
            {servicesSection.systemLabel}
          </p>
          <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.14em] text-fog">
            {servicesHighlights[0].title}
          </h3>
          <p className="mt-4 text-base font-light leading-relaxed text-muted">
            {servicesHighlights[0].short}
          </p>
        </article>
        <article className="rounded-2xl border border-gold/30 bg-gold/10 p-8 sm:col-span-4">
          <h3 className="font-display text-2xl uppercase tracking-[0.12em] text-fog">
            {servicesHighlights[1].title}
          </h3>
          <p className="mt-4 text-sm font-light leading-relaxed text-fog/80">
            {servicesHighlights[1].short}
          </p>
        </article>
        <article className="rounded-2xl border border-line bg-steel/50 p-8 sm:col-span-4">
          <h3 className="font-display text-xl uppercase tracking-[0.12em] text-fog">
            {servicesHighlights[2].title}
          </h3>
          <p className="mt-3 text-sm font-light leading-relaxed text-muted">
            {servicesHighlights[2].short}
          </p>
        </article>
        <article className="flex flex-col justify-between gap-6 rounded-2xl border border-line bg-ink/60 p-8 sm:col-span-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-2xl uppercase tracking-[0.12em] text-fog">
              {servicesHighlights[3].title}
            </h3>
            <p className="mt-3 text-sm font-light text-muted">
              {servicesHighlights[3].short}
            </p>
          </div>
          <span className="font-display text-4xl text-gold/40" aria-hidden>
            ⚡
          </span>
        </article>
      </div>

      {services.map((service, index) => (
        <article
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          key={service.id}
          className="border-t border-line bg-ink py-12 text-fog section-gutter"
          style={
            isDesktop
              ? {
                  position: "sticky",
                  top: `calc(8vh + ${index * 3.5}rem)`,
                  marginBottom: `${(services.length - index - 1) * 3.5}rem`,
                }
              : { top: 0 }
          }
        >
          <div className="section-shell flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div className="flex max-w-xl items-baseline gap-6">
              <span className="font-display text-5xl text-fog/15 sm:text-6xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl uppercase tracking-[0.14em] text-fog sm:text-3xl">
                {service.title}
              </h3>
            </div>
            <div className="max-w-2xl space-y-4">
              {service.description.split("\n\n").map((para, i) => (
                <p
                  key={`${service.id}-p-${i}`}
                  className="text-base font-light leading-relaxed text-muted whitespace-pre-line"
                >
                  {para.trim()}
                </p>
              ))}
              <a
                href={service.href}
                target="_blank"
                rel="noreferrer noopener"
                className="link-dealer-secondary mt-2 inline-block text-xs tracking-[0.24em] text-gold hover:text-fog"
              >
                {service.cta} →
              </a>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ServicesSection;
