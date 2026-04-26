import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getSiteContent } from "../content/siteContent";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "../content/messages";

const STORAGE_KEY = "bioen-locale";

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s && SUPPORTED_LOCALES.includes(s)) return s;
    } catch {
      /* ignore */
    }
    return DEFAULT_LOCALE;
  });

  const content = useMemo(() => getSiteContent(locale), [locale]);

  useEffect(() => {
    const lang = locale === "kk" ? "kk" : locale === "ru" ? "ru" : "en";
    document.documentElement.lang = lang;
    document.title = content.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", content.meta.description);
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale, content.meta]);

  const setLocale = (next) => {
    if (SUPPORTED_LOCALES.includes(next)) setLocaleState(next);
  };

  const value = useMemo(
    () => ({ locale, setLocale, content }),
    [locale, content]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

// Fast refresh: hooks coupled to provider in this module
// eslint-disable-next-line react-refresh/only-export-components -- useLocale must live next to context
export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSiteContent() {
  return useLocale().content;
}
