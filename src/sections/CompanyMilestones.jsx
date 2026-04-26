import { useRef } from "react";
import SectionHeader from "../components/SectionHeader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteContent } from "../context/LocaleContext";

gsap.registerPlugin(ScrollTrigger);

const CompanyMilestones = () => {
  const { milestones, milestonesSection } = useSiteContent();
  const itemsRef = useRef([]);
  const listRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    const line = lineRef.current;
    const list = listRef.current;
    if (!line || !list) return;

    gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

    gsap.to(line, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: list,
        start: "top 72%",
        end: "bottom 50%",
        scrub: 0.65,
      },
    });

    gsap.from(itemsRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.85,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: list,
        start: "top 88%",
      },
    });
  });

  return (
    <section id="milestones" className="min-h-screen bg-ink pb-24 sm:pb-32">
      <SectionHeader
        eyebrow={milestonesSection.eyebrow}
        title={milestonesSection.title}
        text={milestonesSection.headerText}
      />

      <div ref={listRef} className="relative mx-auto w-full max-w-6xl section-gutter">
        {/* Timeline rail — width matches dot column for alignment */}
        <div
          className="pointer-events-none absolute bottom-8 left-[10px] top-10 hidden w-px overflow-hidden md:left-[11px] md:block"
          aria-hidden
        >
          <div
            ref={lineRef}
            className="h-full w-full bg-gradient-to-b from-gold/50 via-gold/25 to-transparent"
          />
        </div>

        <ol className="relative space-y-12 md:space-y-16">
          {milestones.map((m, index) => (
            <li
              key={m.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[minmax(11rem,17rem)_minmax(0,1fr)] sm:gap-x-8 md:gap-x-12"
            >
              {/* Label column: reserved width so long markers (e.g. NETWORK) never overlap the card */}
              <div className="flex min-w-0 items-start gap-4">
                <span
                  className="relative z-[1] mt-2 h-2.5 w-2.5 shrink-0 rounded-full border border-gold/75 bg-ink shadow-[0_0_0_5px_rgba(201,162,39,0.12)]"
                  aria-hidden
                />
                <p className="min-w-0 flex-1 font-display text-3xl uppercase leading-[1.1] tracking-[0.12em] text-gold sm:text-4xl md:text-5xl md:leading-[1.05]">
                  {m.year}
                </p>
              </div>

              <div className="min-w-0 border border-line bg-graphite/60 p-6 backdrop-blur-sm sm:p-8">
                <h3 className="font-display text-xl uppercase tracking-[0.14em] text-fog sm:text-2xl md:text-3xl">
                  {m.title}
                </h3>
                <p className="mt-4 text-base font-light leading-relaxed text-muted sm:text-lg">
                  {m.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default CompanyMilestones;
