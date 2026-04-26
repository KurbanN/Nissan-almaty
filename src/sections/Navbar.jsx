import { useEffect, useRef, useState } from "react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeToggle from "../components/ThemeToggle";
import { socials } from "../content/siteContent";
import { useSiteContent } from "../context/LocaleContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const Navbar = () => {
  const { nav, brand, contact, ui } = useSiteContent();
  const navLinks = nav.links;
  const desktopNavIds = new Set(["models", "about", "services", "gallery", "contact"]);
  const desktopNavLinks = navLinks.filter((link) => desktopNavIds.has(link.id));
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.12"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);
      setIsScrolled(currentScrollY > 24);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current?.reverse();
      iconTl.current?.reverse();
    } else {
      tl.current?.play();
      iconTl.current?.play();
    }
    setIsOpen(!isOpen);
  };

  const burgerVisible = showBurger || isOpen;
  const openContactOverlay = () => {
    window.dispatchEvent(new Event("open-contact-overlay"));
  };

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-[75] hidden w-full border-b border-line/70 bg-ink/55 backdrop-blur-md transition-all duration-300 lg:block ${
          isScrolled ? "py-2" : "py-3"
        }`}
      >
        <div className="section-gutter mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6">
          <Link
            to="home"
            smooth
            offset={-8}
            duration={850}
            className="cursor-pointer font-display text-sm uppercase tracking-[0.2em] text-fog transition hover:text-gold"
          >
            {brand.name}
          </Link>

          <div className="flex items-center gap-6">
            {desktopNavLinks.map((link) => (
              <Link
                key={`desktop-${link.id}`}
                className="cursor-pointer text-[11px] uppercase tracking-[0.2em] text-fog/85 transition hover:text-gold"
                activeClass="text-gold"
                to={link.id}
                spy
                smooth
                offset={-72}
                duration={850}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <LanguageSwitcher className="!bg-transparent !text-[9px]" />
            <button
              type="button"
              onClick={openContactOverlay}
              className="btn-dealer-primary cursor-pointer !px-5 !py-2 !text-[10px] !tracking-[0.2em] text-white"
            >
              {ui.contactUs}
            </button>
          </div>
        </div>
      </header>

      <div
        className="fixed right-6 top-5 z-[80] flex h-14 w-14 cursor-pointer flex-col items-center justify-center gap-1 rounded-full border border-line-strong bg-ink transition-all duration-300 md:right-10 md:h-16 md:w-16 lg:hidden"
        onClick={toggleMenu}
        onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label={nav.toggleNavAria}
        style={
          burgerVisible
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block h-0.5 w-7 origin-center rounded-full bg-fog"
        />
        <span
          ref={bottomLineRef}
          className="block h-0.5 w-7 origin-center rounded-full bg-fog"
        />
      </div>
      <nav
        ref={navRef}
        className="fixed inset-0 z-[70] flex min-h-0 w-full max-h-[100dvh] flex-col overflow-y-auto overscroll-y-contain bg-ink px-6 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] pt-20 uppercase text-fog md:left-1/2 md:w-1/2 md:px-10 md:pb-14 md:pt-24 lg:hidden"
      >
        <div className="flex shrink-0 flex-col gap-y-1.5 text-2xl sm:gap-y-2 sm:text-3xl md:text-4xl lg:text-5xl font-display tracking-[0.1em]">
          {navLinks.map((link, index) => (
            <div key={link.id} ref={(el) => (linksRef.current[index] = el)}>
              <Link
                className="cursor-pointer transition-colors duration-300 hover:text-gold"
                to={link.id}
                smooth
                offset={-8}
                duration={900}
                onClick={() => isOpen && toggleMenu()}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
        <div
          ref={contactRef}
          className="mt-8 flex shrink-0 flex-col gap-8 border-t border-line pt-8 font-light sm:mt-10 sm:gap-10 sm:pt-10"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-muted">
              {nav.languageLabel}
            </p>
            <div className="mt-3 max-w-fit normal-case">
              <LanguageSwitcher />
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-muted">
              {nav.themeLabel}
            </p>
            <div className="mt-3 max-w-md normal-case">
              <ThemeToggle variant="menu" />
            </div>
          </div>
          <div className="flex flex-col gap-8 md:flex-row md:flex-wrap md:justify-between md:gap-x-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted">
                {nav.brandLabel}
              </p>
              <p className="mt-2 text-lg tracking-wide text-fog">{brand.name}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted">{ui.phoneLabel}</p>
              <a
                href={contact.phoneTel}
                className="mt-2 block text-lg tracking-wide text-fog transition hover:text-gold"
              >
                {contact.phone}
              </a>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-block font-display text-xs uppercase tracking-[0.24em] text-muted transition hover:text-gold"
              >
                {ui.whatsappCta}
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted">
                {nav.socialLabel}
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-4">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-xs uppercase tracking-[0.24em] text-muted transition hover:text-fog"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
