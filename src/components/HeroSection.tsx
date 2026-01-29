import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Users, Bed } from "lucide-react";

interface HeroSectionProps {
  onBookingClick: () => void;
}

const heroImages = [
  {
    src: "/img/Pub Porticcio MArs 2025/Coucher de soleil.jpeg",
    alt: "Vue panoramique sur le golfe d'Ajaccio au coucher du soleil"
  },
  {
    src: "/img/Pub Porticcio MArs 2025/Terrasse T3.jpeg",
    alt: "Terrasse principale de la villa"
  },
  {
    src: "/img/Pub Porticcio MArs 2025/Sejour.jpeg",
    alt: "Séjour lumineux avec vue mer"
  },
  {
    src: "/img/Pub Porticcio MArs 2025/Vue facade maison.jpeg",
    alt: "Façade de la maison"
  }
];

export function HeroSection({ onBookingClick }: HeroSectionProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20">
      {/* Massive Typography Header with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto mb-12 md:mb-16"
      >
        <h1 
          className="text-[clamp(3rem,12vw,10rem)] leading-[0.9] tracking-tighter uppercase"
          style={{ fontWeight: 900 }}
        >
          MAISON
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FF8E53]">
            PORTICCIO
          </span>
        </h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 md:mt-8 text-[clamp(1rem,2.5vw,1.5rem)] tracking-wide uppercase"
          style={{ fontWeight: 500 }}
        >
          Vue mer • Golfe d'Ajaccio • Corse du Sud
        </motion.p>
      </motion.div>

      {/* Split Layout: Image Carousel + CTA */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Carousel Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden group"
        >
          {/* Images */}
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{
                opacity: index === currentImage ? 1 : 0,
                scale: index === currentImage ? 1 : 1.1,
              }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImage 
                    ? "bg-white w-8" 
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Side */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col justify-center space-y-6 md:space-y-8"
        >
          <div className="space-y-4">
            <p 
              className="text-[clamp(1.25rem,3vw,2.5rem)] leading-tight"
              style={{ fontWeight: 800 }}
            >
              Une expérience unique avec vue imprenable
            </p>
            <p className="text-lg opacity-70 leading-relaxed">
              Découvrez notre maison d'exception à Porticcio, alliant confort moderne et panorama époustouflant sur le golfe d'Ajaccio. À seulement 5 minutes de la plage.
            </p>
          </div>
          
          {/* Button */}
          <button 
            onClick={onBookingClick}
            className="group relative bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] hover:from-[#FF8E53] hover:to-[#FFB03B] text-white px-8 py-4 md:px-10 md:py-5 rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,107,53,0.5)] text-[15px]"
          >
            <span 
              className="text-base md:text-lg uppercase tracking-wider block"
              style={{ fontWeight: 800 }}
            >
              Réserver maintenant
            </span>
          </button>

          {/* Details Grid */}
          <div className="grid grid-cols-3 gap-4 pt-6 md:pt-8 border-t border-white/10">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-[#FF6B35]" />
                <p className="text-3xl md:text-4xl" style={{ fontWeight: 900 }}>5</p>
              </div>
              <p className="text-sm uppercase opacity-60">Personnes</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-1">
                <Bed className="w-5 h-5 text-[#FF6B35]" />
                <p className="text-3xl md:text-4xl" style={{ fontWeight: 900 }}>2</p>
              </div>
              <p className="text-sm uppercase opacity-60">Chambres</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-5 h-5 text-[#FF6B35]" />
                <p className="text-3xl md:text-4xl" style={{ fontWeight: 900 }}>5</p>
              </div>
              <p className="text-sm uppercase opacity-60">Min plage</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
