import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "../components/Marquee";
import { socials } from "../content/siteContent";
import { useSiteContent } from "../context/LocaleContext";

gsap.registerPlugin(ScrollTrigger);

const SiteFooter = () => {
  const { brand, contact, footer, ui } = useSiteContent();
  const linksRef = useRef(null);
  const resRef = useRef(null);

  useGSAP(() => {
    if (!linksRef.current) return;
    gsap.from(gsap.utils.toArray(linksRef.current.children), {
      y: 28,
      opacity: 0,
      duration: 0.75,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: { trigger: linksRef.current, start: "top 92%" },
    });
  });

  useGSAP(() => {
    if (!resRef.current) return;
    gsap.from(gsap.utils.toArray(resRef.current.querySelectorAll("[data-contact-animate]")), {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: { trigger: resRef.current, start: "top 95%" },
    });
  });

  const marqueeItems = [
    footer.closingLine,
    footer.closingLine,
    footer.closingLine,
    footer.closingLine,
  ];

  return (
    <footer
      id="contact"
      className="flex min-h-[50vh] flex-col justify-between bg-ink pb-10 pt-16"
    >
      <div className="section-shell grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="section-eyebrow font-display text-gold-dim">
            {ui.contactHeading}
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.14em] text-fog sm:text-5xl">
            {brand.name}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
            {contact.hours ? (
              <>
                <span className="text-fog/90">{ui.hoursLabel}: </span>
                {contact.hours}
                <br />
              </>
            ) : null}
            {contact.address}
            <br />
            {ui.phoneLabel}:{" "}
            <a className="text-fog/90 underline-offset-4 hover:underline" href={contact.phoneTel}>
              {contact.phone}
            </a>
            <br />
            {ui.emailLabel}:{" "}
            <a
              className="text-fog/90 underline-offset-4 hover:underline"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
          </p>
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-block font-display text-xs uppercase tracking-[0.28em] text-gold transition hover:text-fog"
          >
            {ui.whatsappCta}
          </a>

          <nav
            ref={linksRef}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
            aria-label="Social links"
          >
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="font-display text-xs uppercase tracking-[0.28em] text-muted transition hover:text-fog"
              >
                {s.name}
              </a>
            ))}
          </nav>
        </div>

        <div ref={resRef} className="border-t border-line pt-10 lg:border-t-0 lg:pt-25">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-xs uppercase tracking-[0.35em] text-muted">
                {ui.resourcesHeading}
              </h3>
              <ul className="mt-4 space-y-3">
                {footer.resources.map((r) => (
                  <li key={r.label}>
                    <a
                      data-contact-animate
                      href={r.href}
                      className="text-sm text-muted transition hover:text-fog"
                    >
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xs uppercase tracking-[0.35em] text-muted">
                {ui.legalHeading}
              </h3>
              <ul className="mt-4 space-y-3">
                {footer.legal.map((r) => (
                  <li key={r.label}>
                    <a
                      data-contact-animate
                      href={r.href}
                      className="text-sm text-muted transition hover:text-fog"
                    >
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-line">
        <Marquee
          items={marqueeItems}
          className="h-16 bg-transparent text-fog/80 md:h-20"
          iconClassName="text-gold/60"
        />
      </div>

      <div className="section-gutter pt-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted/70">
          {footer.note} {new Date().getFullYear()}
        </p>
        <p className="mt-3 text-xs text-muted/80">
          {footer.creditLabel}{" "}
          <a
            href={footer.creditHref}
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-fog/80 transition hover:text-gold"
          >
            {footer.creditName}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
