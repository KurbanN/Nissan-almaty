import { useRef } from "react";
import { AnimatedTextLines } from "./AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionHeader = ({ eyebrow, title, text }) => {
  const blockRef = useRef(null);
  const headerRef = useRef(null);
  const titleParts = title.includes(" ") ? title.split(" ") : [title];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: blockRef.current,
        start: "top 86%",
        toggleActions: "play none none reverse",
      },
    });
    tl.from(blockRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.85,
      ease: "power3.out",
    });
    tl.from(
      headerRef.current,
      { opacity: 0, y: 28, duration: 0.75, ease: "power3.out" },
      "-=0.55"
    );
  });

  return (
    <div ref={blockRef}>
      <div className="overflow-hidden">
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-8 pt-20 sm:gap-10 sm:pt-24"
        >
          <p className="section-eyebrow section-shell font-display">{eyebrow}</p>
          <div className="section-shell">
            <h2 className="banner-text-responsive gap-1 font-display uppercase leading-none tracking-[0.02em] text-fog sm:gap-0 sm:block flex flex-col">
              {titleParts.map((part, index) => (
                <span key={index} className="inline-block sm:inline">
                  {part}{" "}
                </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
      <div className="section-shell relative text-fog">
        <div className="absolute inset-x-0 border-t border-line" />
        <div className="py-10 text-end sm:py-14">
          <AnimatedTextLines
            text={text}
            className="value-text-responsive font-display uppercase tracking-[0.12em] text-fog opacity-90"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
