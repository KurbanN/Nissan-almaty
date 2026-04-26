import { useLocale } from "../context/LocaleContext";

const OPTIONS = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "kk", label: "KK" },
];

const LanguageSwitcher = ({ className = "" }) => {
  const { locale, setLocale, content } = useLocale();

  return (
    <div
      className={`font-display flex items-center gap-0.5 rounded-full border border-line-strong bg-ink/70 px-1 py-1 text-[10px] uppercase tracking-[0.2em] text-fog backdrop-blur-sm sm:gap-1 sm:px-1.5 ${className}`}
      role="group"
      aria-label={content.ui.languageSwitcherAria}
    >
      {OPTIONS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded-full px-2 py-1.5 transition sm:px-2.5 ${
            locale === code
              ? "bg-gold/25 text-fog"
              : "text-muted hover:text-fog/90"
          }`}
          aria-pressed={locale === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
