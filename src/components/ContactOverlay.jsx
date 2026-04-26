import { useEffect, useState } from "react";
import { useSiteContent } from "../context/LocaleContext";

const cityOptions = ["Алматы", "Астана", "Шымкент"];
const brandOptions = ["Nissan"];
const modelOptions = ["Patrol", "Sentra", "Qashqai", "X-Trail"];
const dealerOptions = ["Nissan Almaty"];

const ContactOverlay = () => {
  const { ui } = useSiteContent();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleEsc = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("open-contact-overlay", handleOpen);
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("open-contact-overlay", handleOpen);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/72 px-4 py-6 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[1.5rem] border border-line bg-graphite/92 p-5 shadow-2xl sm:rounded-[2rem] sm:p-9"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label={ui.close}
          onClick={() => setIsOpen(false)}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-line text-fog transition hover:border-fog/70"
        >
          ×
        </button>

        <h3 className="pr-10 text-center font-display text-3xl uppercase tracking-[0.06em] text-fog sm:text-5xl sm:tracking-[0.08em]">
          {ui.contactUs}
        </h3>

        <form className="mt-7 space-y-3.5" onSubmit={(e) => e.preventDefault()}>
          <label className="block">
            <span className="sr-only">Город</span>
            <select className="w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-fog outline-none transition focus:border-gold/70">
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Бренд</span>
            <select className="w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-fog outline-none transition focus:border-gold/70">
              {brandOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Модель</span>
            <select className="w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-fog outline-none transition focus:border-gold/70">
              {modelOptions.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Дилерский центр</span>
            <select className="w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-fog outline-none transition focus:border-gold/70">
              {dealerOptions.map((dealer) => (
                <option key={dealer} value={dealer}>
                  {dealer}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Ваше имя</span>
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-fog placeholder:text-muted outline-none transition focus:border-gold/70"
            />
          </label>

          <label className="block">
            <span className="sr-only">Телефон</span>
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              className="w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-fog placeholder:text-muted outline-none transition focus:border-gold/70"
            />
          </label>

          <button type="submit" className="btn-dealer-primary mt-3 w-full text-white">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactOverlay;
