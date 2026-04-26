import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteContent } from "../context/LocaleContext";

gsap.registerPlugin(ScrollTrigger);

const QuoteSection = () => {
  const { quote: quoteContent } = useSiteContent();
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      y: 36,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });
  });

  return (
    <section
      id="quote"
      ref={sectionRef}
      className="flex min-h-[55vh] flex-col justify-center bg-graphite py-24 sm:py-28 lg:py-32"
    >
      <blockquote
        ref={textRef}
        className="section-shell mx-auto max-w-4xl text-center font-display font-normal leading-tight tracking-[0.06em] text-fog contact-text-responsive"
      >
        <span className="block text-gold/80">&ldquo;</span>
        <p className="mt-4 text-balance text-xl normal-case tracking-normal sm:text-2xl md:text-3xl lg:text-4xl">
          {quoteContent.text}
        </p>
        <footer className="mt-10 text-sm font-normal uppercase tracking-[0.35em] text-muted">
          {quoteContent.attribution}
        </footer>
      </blockquote>
    </section>
  );
};

export default QuoteSection;
