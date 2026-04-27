/**
 * Nissan Almaty — локализованный контент автосалона.
 */

import { assetUrl } from "../utils/assetUrl";
import { messages, SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./messages";

export { messages, SUPPORTED_LOCALES, DEFAULT_LOCALE };

const WHATSAPP_PHONE = "77010063403";

/** Кликабельный номер для tel: (без пробелов). */
const PHONE_TEL = `tel:+${WHATSAPP_PHONE}`;

export const brand = {
  name: "NISSAN ALMATY",
  legalName: 'ТОО "Exclusive Auto Almaty"',
};

export const socials = [
  { name: "Instagram", href: "https://www.instagram.com" },
  { name: "YouTube", href: "https://www.youtube.com" },
  { name: "WhatsApp", href: "https://api.whatsapp.com/send?phone=77010063403" },
];

const contactFixed = {
  phone: "+7 (701) 006-34-03",
  email: "sales@nissan-almaty.kz",
};

const partnersData = [
  { name: "Partner Bank", src: assetUrl("bioen/assets/img/partners/alma-plus.svg") },
  { name: "Finance Partner", src: assetUrl("bioen/assets/img/partners/bcc-bank.svg") },
  {
    name: "Insurance Partner",
    src: assetUrl("bioen/assets/img/partners/ktzh.png"),
    fallback:
      "https://images.unsplash.com/photo-1549921296-3ecf9a0c6f1d?auto=format&fit=crop&w=400&q=60",
  },
  {
    name: "Leasing Partner",
    src: assetUrl("bioen/assets/img/partners/magnum-bank.png"),
    fallback:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=60",
  },
  {
    name: "Nissan Service",
    src: assetUrl("bioen/assets/img/partners/hyatt-logo.png"),
    fallback:
      "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=400&q=60",
  },
  {
    name: "Trade-In Partner",
    src: assetUrl("bioen/assets/img/partners/partner-pic.png"),
    fallback:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=400&q=60",
  },
  {
    name: "Regional Delivery",
    src: assetUrl("bioen/assets/img/partners/partner-extra.png"),
    fallback:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=400&q=60",
  },
];

const galleryBase = [
  {
    id: "patrol-1",
    src: assetUrl("cars/optimized/patrol-1024.webp"),
  },
  {
    id: "qashqai-1",
    src: assetUrl("cars/optimized/qashqai-1024.webp"),
  },
  {
    id: "xtrail-1",
    src: assetUrl("cars/optimized/xtrail-1024.webp"),
  },
];

const SERVICE_HREF = "#contact";

function buildWhatsappHref(text) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(text)}`;
}

/**
 * @param {string} locale — 'en' | 'ru' | 'kk'
 */
export function getSiteContent(locale) {
  const L = messages[locale] ?? messages[DEFAULT_LOCALE];

  const galleryItems = galleryBase.map((item, i) => ({
    ...item,
    caption: L.galleryCaptions[i] ?? L.galleryCaptions[0],
  }));

  const services = L.services.map((s) => ({
    ...s,
    href: SERVICE_HREF,
  }));

  return {
    meta: L.meta,
    nav: L.nav,
    ui: L.ui,
    brand: {
      ...brand,
      ...L.brand,
    },
    hero: {
      videoSrc: assetUrl("bioen/LANDING.mp4"),
      catalogHref: "#contact",
      posterSrc: assetUrl("bioen/assets/img/legacy-precision-engineering.png"),
      portraitFallback:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80",
      ...L.hero,
    },
    statementWords: L.statementWords,
    about: {
      ...L.about,
      imageSrc: assetUrl("cars/salon.png"),
      imageFallback:
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
    },
    servicesSection: L.servicesSection,
    servicesHighlights: L.servicesHighlights,
    services,
    milestonesSection: L.milestonesSection,
    milestones: L.milestones,
    partnersSection: L.partnersSection,
    partners: partnersData,
    gallerySection: L.gallerySection,
    galleryItems,
    quote: L.quote,
    contact: {
      ...contactFixed,
      address: L.contact.address,
      whatsappHref: buildWhatsappHref(L.contact.whatsappText),
      phoneTel: PHONE_TEL,
      hours: L.contact.hours ?? "",
    },
    footer: {
      ...L.footer,
      creditHref: "#contact",
      creditName: "NISSAN ALMATY",
    },
  };
}
