import { Icon } from "@iconify/react/dist/iconify.js";

/**
 * Бесконечная бегущая строка через CSS (дубль дорожки + translateX -50%).
 * Раньше был GSAP horizontalLoop — ломался при смене локали/шрифта (неверные ширины, «двойной» текст).
 */
const Marquee = ({
  items,
  className = "text-fog bg-ink",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
}) => {
  return (
    <div
      className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center marquee-text-responsive font-light uppercase whitespace-nowrap ${className}`}
    >
      <div
        className={`marquee-css-track flex w-max ${reverse ? "marquee-css-track--reverse" : ""}`}
      >
        {[0, 1].map((dup) => (
          <div
            key={dup}
            className="flex shrink-0 items-center"
            aria-hidden={dup === 1 || undefined}
          >
            {items.map((text, index) => (
              <span
                key={`${dup}-${index}`}
                className="flex shrink-0 items-center gap-x-32 px-16"
              >
                {text}
                <Icon icon={icon} className={iconClassName} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
