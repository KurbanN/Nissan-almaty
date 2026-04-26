import { useRef, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteContent } from "../context/LocaleContext";
import { assetUrl } from "../utils/assetUrl";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { about: aboutContent } = useSiteContent();
  const shellRef = useRef(null);
  const panelRef = useRef(null);
  const cardsRef = useRef([]);
  const [imgSrc, setImgSrc] = useState(aboutContent.imageSrc);

  useGSAP(() => {
    gsap.from(shellRef.current, {
      y: 22,
      opacity: 0,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: { trigger: shellRef.current, start: "top 84%" },
    });
    gsap.from(panelRef.current, {
      y: 26,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: panelRef.current, start: "top 88%" },
    });
    if (aboutContent.stats.length) {
      gsap.from(cardsRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current[0], start: "top 90%" },
      });
    }
  });

  return (
    <section
      id="about"
      className="min-h-screen rounded-b-[2.5rem] bg-graphite pb-20 sm:pb-28"
    >
      <SectionHeader
        eyebrow={aboutContent.eyebrow}
        title={aboutContent.title}
        text={aboutContent.sectionLines}
      />

      <div
        ref={shellRef}
        className="section-shell"
      >
        <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
          <picture>
            <source
              type="image/avif"
              srcSet={`${assetUrl("cars/optimized/salon-480.avif")} 480w, ${assetUrl(
                "cars/optimized/salon-768.avif"
              )} 768w, ${assetUrl("cars/optimized/salon-1024.avif")} 1024w, ${assetUrl(
                "cars/optimized/salon-1440.avif"
              )} 1440w`}
              sizes="(min-width: 1280px) 1120px, 100vw"
            />
            <source
              type="image/webp"
              srcSet={`${assetUrl("cars/optimized/salon-480.webp")} 480w, ${assetUrl(
                "cars/optimized/salon-768.webp"
              )} 768w, ${assetUrl("cars/optimized/salon-1024.webp")} 1024w, ${assetUrl(
                "cars/optimized/salon-1440.webp"
              )} 1440w`}
              sizes="(min-width: 1280px) 1120px, 100vw"
            />
            <img
              src={imgSrc}
              alt={aboutContent.imageAlt}
              className="h-auto max-h-[70vh] w-full object-contain sm:h-[440px] sm:max-h-none sm:object-cover lg:h-[560px]"
              loading="lazy"
              decoding="async"
              onError={() => setImgSrc(aboutContent.imageFallback)}
            />
          </picture>
        </div>

        <div
          ref={panelRef}
          className="mx-auto mt-4 w-full rounded-2xl border border-line bg-graphite/82 p-4 backdrop-blur-md sm:mt-5 sm:p-6 lg:max-w-[48rem] lg:p-7"
        >
          <p className="max-w-[72ch] text-[15px] font-light leading-relaxed text-fog/92 sm:text-lg">
            {aboutContent.lead}
          </p>
          {aboutContent.body ? (
            <p className="mt-4 max-w-[72ch] text-base font-light leading-relaxed text-fog/80 sm:text-lg">
              {aboutContent.body}
            </p>
          ) : null}

          {aboutContent.stats.length ? (
            <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4">
              {aboutContent.stats.map((stat, index) => (
                <article
                  key={stat.label}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="rounded-xl border border-line bg-ink/60 px-4 py-4 backdrop-blur-sm sm:px-5 sm:py-5"
                >
                  <p className="font-display text-3xl uppercase tracking-[0.1em] text-fog sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-fog/60 sm:text-[11px]">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default About;
