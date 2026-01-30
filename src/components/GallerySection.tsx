import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";
import { useState } from "react";
import { ImageLightbox } from "./ImageLightbox";
import { useLanguage } from "../i18n/LanguageContext";

export function GallerySection() {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    {
      src: "/img/Pub Porticcio MArs 2025/Sejour.jpeg",
      alt: language === "fr" ? "Salon" : "Living Room",
      category: language === "fr" ? "Séjour" : "Living",
      description: language === "fr" ? "Séjour lumineux avec vue sur la mer et le golfe d'Ajaccio" : "Bright living room with sea view"
    },
    {
      src: "/img/Pub Porticcio MArs 2025/Sejour2.jpeg",
      alt: language === "fr" ? "Salon vue alternative" : "Living Room Alt View",
      category: language === "fr" ? "Séjour" : "Living",
      description: language === "fr" ? "Autre vue du séjour spacieux et confortable" : "Another view of the spacious living room"
    },
    {
      src: "/img/Pub Porticcio MArs 2025/Sejour3.jpeg",
      alt: language === "fr" ? "Espace TV" : "TV Area",
      category: language === "fr" ? "Séjour" : "Living",
      description: language === "fr" ? "Coin TV et détente avec Smart TV" : "TV corner with Smart TV"
    },
    {
      src: "/img/Pub Porticcio MArs 2025/Ch1.jpeg",
      alt: language === "fr" ? "Chambre 1" : "Bedroom 1",
      category: language === "fr" ? "Chambres" : "Bedrooms",
      description: language === "fr" ? "Chambre principale avec literie de qualité" : "Master bedroom with quality bedding"
    },
    {
      src: "/img/chambre2.png",
      alt: language === "fr" ? "Chambre 2" : "Bedroom 2",
      category: language === "fr" ? "Chambres" : "Bedrooms",
      description: language === "fr" ? "Deuxième chambre avec accès direct au jardin" : "Second bedroom with garden access"
    },
    {
      src: "/img/Pub Porticcio MArs 2025/Ch1 Et.jpeg",
      alt: language === "fr" ? "Chambre étage" : "Upstairs Bedroom",
      category: language === "fr" ? "Chambres" : "Bedrooms",
      description: language === "fr" ? "Chambre à l'étage avec accès terrasse" : "Upstairs bedroom with terrace access"
    },
    {
      src: "/img/Pub Porticcio MArs 2025/SdB Etage.jpeg",
      alt: language === "fr" ? "Salle de bain" : "Bathroom",
      category: language === "fr" ? "Salles de bains" : "Bathrooms",
      description: language === "fr" ? "Salle de bain moderne avec douche à l'italienne" : "Modern bathroom with Italian shower"
    },
    {
      src: "/img/jacuzzi.png",
      alt: "Jacuzzi",
      category: language === "fr" ? "Extérieur" : "Outdoor",
      description: language === "fr" ? "Jacuzzi avec vue panoramique sur le golfe d'Ajaccio" : "Jacuzzi with panoramic view"
    },
    {
      src: "/img/Pub Porticcio MArs 2025/Terrasse T3.jpeg",
      alt: language === "fr" ? "Terrasse principale" : "Main Terrace",
      category: language === "fr" ? "Extérieur" : "Outdoor",
      description: language === "fr" ? "Grande terrasse avec vue panoramique sur le golfe" : "Large terrace with panoramic view"
    },
    {
      src: "/img/Pub Porticcio MArs 2025/Terrasse .jpeg",
      alt: language === "fr" ? "Terrasse" : "Terrace",
      category: language === "fr" ? "Extérieur" : "Outdoor",
      description: language === "fr" ? "Espace repas extérieur avec mobilier de jardin" : "Outdoor dining area"
    },
    {
      src: "/img/Pub Porticcio MArs 2025/Jardin.JPG",
      alt: language === "fr" ? "Jardin" : "Garden",
      category: language === "fr" ? "Extérieur" : "Outdoor",
      description: language === "fr" ? "Jardin méditerranéen verdoyant" : "Mediterranean garden"
    },
    {
      src: "/img/Pub Porticcio MArs 2025/Coucher de soleil.jpeg",
      alt: language === "fr" ? "Coucher de soleil" : "Sunset",
      category: language === "fr" ? "Vues" : "Views",
      description: language === "fr" ? "Magnifique coucher de soleil sur le golfe d'Ajaccio" : "Beautiful sunset over the Gulf of Ajaccio"
    },
    {
      src: "/img/Pub Porticcio MArs 2025/Vue facade maison.jpeg",
      alt: language === "fr" ? "Façade" : "Facade",
      category: language === "fr" ? "Extérieur" : "Outdoor",
      description: language === "fr" ? "Vue de la façade de la maison" : "House facade view"
    },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollAnimationWrapper>
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 
              className="text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-tighter uppercase"
              style={{ fontWeight: 900 }}
            >
              {t("galleryTitle")}
            </h2>
            <p className="text-lg opacity-60 max-w-md">
              {t("gallerySubtitle")}
            </p>
          </div>
        </ScrollAnimationWrapper>

        {/* Masonry-like Gallery Grid */}
        <ScrollAnimationWrapper delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-16">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                  index === 0 || index === 7 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => openLightbox(index)}
              >
                <div className={`${index === 0 || index === 7 ? 'aspect-square' : 'aspect-[4/3]'}`}>
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-[#FF6B35]/20 backdrop-blur-sm border border-[#FF6B35]/30 px-2 py-0.5 rounded-full text-[10px] text-[#FF6B35] uppercase tracking-wider mb-2" style={{ fontWeight: 700 }}>
                      {image.category}
                    </span>
                    <p className="text-white text-sm" style={{ fontWeight: 700 }}>{image.alt}</p>
                    <p className="text-white/60 text-xs mt-1">
                      {language === "fr" ? "Cliquez pour agrandir" : "Click to enlarge"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimationWrapper>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={galleryImages}
        currentIndex={currentImageIndex}
        onNavigate={setCurrentImageIndex}
      />
    </section>
  );
}
