import ReactLenis from "lenis/react";
import ContactOverlay from "./components/ContactOverlay";
import ThemeToggle from "./components/ThemeToggle";
import ScrollToTopButton from "./components/ScrollToTopButton";
import DealerStickyBar from "./components/DealerStickyBar";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import CarSlider from "./sections/CarSlider";
import FeatureCardsStrip from "./sections/FeatureCardsStrip";
import StatementMarquee from "./sections/StatementMarquee";
import About from "./sections/About";
import ServicesSection from "./sections/ServicesSection";
import PartnersSection from "./sections/PartnersSection";
import Gallery from "./sections/Gallery";
import SiteFooter from "./sections/SiteFooter";

const App = () => {
  return (
    <ReactLenis root className="relative min-h-screen w-full overflow-x-hidden bg-ink">
      <ThemeToggle />
      <ContactOverlay />
      <DealerStickyBar />
      <ScrollToTopButton />
      <Navbar />
      <main className="pb-28 sm:pb-28 md:pb-28">
        <Hero />
        <CarSlider />
        <FeatureCardsStrip />
        <StatementMarquee />
        <About />
        <ServicesSection />
        <PartnersSection />
        <Gallery />
        <SiteFooter />
      </main>
    </ReactLenis>
  );
};

export default App;
