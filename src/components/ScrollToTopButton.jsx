import { Icon } from "@iconify/react/dist/iconify.js";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { useSiteContent } from "../context/LocaleContext";

const SCROLL_DURATION_SEC = 1.35;

/**
 * Появляется после прокрутки первой секции (#home) — возврат к верху / герою.
 * Скролл через Lenis (нативный smooth не работает с ReactLenis).
 */
const ScrollToTopButton = () => {
  const lenis = useLenis();
  const { ui } = useSiteContent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("home");
      const threshold = hero ? hero.offsetHeight * 0.35 : window.innerHeight * 0.4;
      setVisible(window.scrollY > threshold);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        lenis?.scrollTo(0, {
          duration: SCROLL_DURATION_SEC,
        });
      }}
      className="font-display fixed bottom-32 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-graphite/90 text-fog shadow-lg backdrop-blur-md transition hover:border-gold/40 hover:bg-gold/10 sm:bottom-36 sm:right-8"
      aria-label={ui.scrollToTopAria}
    >
      <Icon icon="mdi:chevron-up" className="h-7 w-7" aria-hidden />
    </button>
  );
};

export default ScrollToTopButton;
