import { useTheme } from "../context/ThemeContext";
import { useSiteContent } from "../context/LocaleContext";

const switchTrack = (isLight) =>
  `relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-line-strong transition-colors ${
    isLight ? "bg-gold/25" : "bg-black/45"
  }`;

const switchThumb = (isLight) =>
  `absolute left-0.5 top-0.5 h-5 w-5 rounded-full shadow transition-transform duration-300 ${
    isLight ? "translate-x-5 bg-white" : "translate-x-0 bg-zinc-200"
  }`;

/**
 * @param {{ variant?: "floating" | "menu" }}=} props
 */
const ThemeToggle = ({ variant = "floating" }) => {
  const { ui } = useSiteContent();
  const { toggleTheme, isLight } = useTheme();

  const thumb = (
    <span className={switchTrack(isLight)}>
      <span className={switchThumb(isLight)} />
    </span>
  );

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className="flex w-full max-w-md items-center justify-between gap-4 rounded-xl border border-line bg-graphite/40 px-4 py-3.5 text-left transition hover:border-gold/35 hover:bg-graphite/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        aria-pressed={isLight}
        aria-label={isLight ? ui.themeAriaLight : ui.themeAriaDark}
        title={isLight ? ui.themeTitleDark : ui.themeTitleLight}
      >
        <span className="font-display text-xs uppercase tracking-[0.22em] text-fog">
          {isLight ? ui.themeLight : ui.themeDark}
        </span>
        {thumb}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="font-display fixed bottom-6 right-6 z-[60] hidden items-center gap-3 rounded-full border border-line-strong bg-graphite/90 px-4 py-2.5 text-[10px] uppercase tracking-[0.28em] text-fog shadow-lg backdrop-blur-md transition hover:border-gold/40 hover:bg-graphite sm:bottom-8 sm:right-8 lg:flex"
      aria-pressed={isLight}
      aria-label={isLight ? ui.themeAriaLight : ui.themeAriaDark}
      title={isLight ? ui.themeTitleDark : ui.themeTitleLight}
    >
      {thumb}
      <span className="hidden text-muted sm:inline">
        {isLight ? ui.themeLight : ui.themeDark}
      </span>
    </button>
  );
};

export default ThemeToggle;
