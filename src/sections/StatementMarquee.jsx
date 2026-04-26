import Marquee from "../components/Marquee";
import { useSiteContent } from "../context/LocaleContext";

const StatementMarquee = () => {
  const { statementWords } = useSiteContent();

  return (
    <section
      aria-hidden
      className="border-y border-line bg-steel/40 py-2"
    >
      <Marquee
        items={statementWords}
        className="bg-transparent text-fog/90"
        iconClassName="text-gold/70"
      />
    </section>
  );
};

export default StatementMarquee;
