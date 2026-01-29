import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { BentoFeatures } from "./components/BentoFeatures";
import { MarqueeSection } from "./components/MarqueeSection";
import { GallerySection } from "./components/GallerySection";
import { LocationSection } from "./components/LocationSection";
import { FloatingCTA } from "./components/FloatingCTA";
import { ContactModal } from "./components/ContactModal";
import { BookingModal } from "./components/BookingModal";
import { GradientBackground } from "./components/GradientBackground";
import { IntroLoader } from "./components/IntroLoader";
import { Footer } from "./components/Footer";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  if (showLoader) {
    return (
      <IntroLoader onComplete={() => setShowLoader(false)} />
    );
  }

  return (
    <div
      className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden"
      style={{ fontFamily: "'Inter Tight', sans-serif" }}
    >
      <GradientBackground />

      <div className="relative z-10">
        <HeroSection
          onBookingClick={() => setIsBookingOpen(true)}
        />
        <MarqueeSection />
        <BentoFeatures />
        <GallerySection />
        <LocationSection />
        <Footer />
      </div>

      <FloatingCTA
        onContactClick={() => setIsContactOpen(true)}
        onBookingClick={() => setIsBookingOpen(true)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
