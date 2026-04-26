import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteContent } from "../context/LocaleContext";

gsap.registerPlugin(ScrollTrigger);

function PartnerLogo({ p }) {
  const [src, setSrc] = useState(p.src);
  return (
    <div className="flex h-20 min-w-[160px] items-center justify-center px-4 sm:h-24 sm:min-w-[200px]">
      <img
        src={src}
        alt={p.name}
        className="max-h-12 w-auto object-contain opacity-90 sm:max-h-16"
        loading="lazy"
        onError={() => p.fallback && setSrc(p.fallback)}
      />
    </div>
  );
}

const PartnersSection = () => {
  const { partners, partnersSection } = useSiteContent();
  const blockRef = useRef(null);
  const track = [...partners, ...partners];

  useGSAP(() => {
    gsap.from(blockRef.current, {
      y: 36,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: blockRef.current, start: "top 88%" },
    });
  });

  return (
    <section
      id="network"
      ref={blockRef}
      className="border-y border-line bg-steel/30 py-16 lg:py-20"
    >
      <div className="section-shell text-center">
        <p className="section-eyebrow font-display text-gold-dim">
          {partnersSection.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.12em] text-fog sm:text-5xl md:text-6xl">
          {partnersSection.titleLine1}
          <br />
          {partnersSection.titleLine2}
        </h2>
      </div>

      <div className="partners-marquee mt-14 overflow-hidden">
        <div className="partners-marquee-track flex w-max items-center gap-10 pr-10 animate-[partners-scroll_32s_linear_infinite]">
          {track.map((p, i) => (
            <PartnerLogo key={`${p.name}-${i}`} p={p} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes partners-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .partners-marquee:hover .partners-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="section-shell mt-12 flex justify-center">
        <a href="#contact" className="btn-dealer-primary min-w-[12rem]">
          {partnersSection.cta}
        </a>
      </div>
    </section>
  );
};

export default PartnersSection;
