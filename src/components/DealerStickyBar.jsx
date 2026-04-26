import { Icon } from "@iconify/react/dist/iconify.js";
import { useSiteContent } from "../context/LocaleContext";

/**
 * Нижняя панель как у дилерских сайтов: звонок, WhatsApp, каталог.
 */
const DealerStickyBar = () => {
  const { contact, hero, ui } = useSiteContent();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[58] flex items-stretch justify-center gap-0.5 border-t border-line bg-ink/95 px-1 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-md sm:gap-3 sm:px-4 md:justify-center md:py-2"
      aria-label={ui.stickyBarAria}
    >
      <a
        href={contact.phoneTel}
        className="flex min-w-0 max-w-[33%] flex-1 flex-col items-center justify-center gap-1 rounded-lg py-2 text-center font-display text-[10px] uppercase tracking-[0.1em] text-fog transition hover:bg-gold/10 sm:max-w-none sm:flex-none sm:min-w-[7rem] sm:px-5 sm:text-[11px] sm:tracking-[0.14em]"
      >
        <Icon icon="mdi:phone-outline" className="h-5 w-5 text-gold sm:h-5 sm:w-5" aria-hidden />
        <span className="leading-tight">{ui.stickyCallShort}</span>
      </a>
      <a
        href={contact.whatsappHref}
        target="_blank"
        rel="noreferrer noopener"
        className="flex min-w-0 max-w-[33%] flex-1 flex-col items-center justify-center gap-1 rounded-lg py-2 text-center font-display text-[10px] uppercase tracking-[0.1em] text-fog transition hover:bg-gold/10 sm:max-w-none sm:flex-none sm:min-w-[7rem] sm:px-5 sm:text-[11px] sm:tracking-[0.14em]"
      >
        <Icon icon="mdi:whatsapp" className="h-5 w-5 text-gold" aria-hidden />
        <span className="leading-tight">{ui.stickyWhatsAppShort}</span>
      </a>
      <a
        href={hero.catalogHref}
        target="_blank"
        rel="noreferrer noopener"
        className="flex min-w-0 max-w-[34%] flex-1 flex-col items-center justify-center gap-1 rounded-lg py-2 text-center font-display text-[10px] uppercase tracking-[0.1em] text-fog transition hover:bg-gold/10 sm:max-w-none sm:flex-none sm:min-w-[7rem] sm:px-5 sm:text-[11px] sm:tracking-[0.14em]"
      >
        <Icon icon="mdi:car-outline" className="h-5 w-5 text-gold" aria-hidden />
        <span className="leading-tight">{ui.stickyCatalogShort}</span>
      </a>
    </nav>
  );
};

export default DealerStickyBar;
