import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";
import { useState } from "react";
import { ImageLightbox } from "./ImageLightbox";

const galleryImages = [
  {
    src: "/img/Pub Porticcio MArs 2025/Sejour.jpeg",
    alt: "Salon",
    category: "Séjour",
    description: "Séjour lumineux avec vue sur la mer et le golfe d'Ajaccio"
  },
  {
    src: "/img/Pub Porticcio MArs 2025/Sejour2.jpeg",
    alt: "Salon vue alternative",
    category: "Séjour",
    description: "Autre vue du séjour spacieux et confortable"
  },
  {
    src: "/img/Pub Porticcio MArs 2025/Sejour3.jpeg",
    alt: "Espace TV",
    category: "Séjour",
    description: "Coin TV et détente avec Smart TV"
  },
  {
    src: "/img/Pub Porticcio MArs 2025/Ch1.jpeg",
    alt: "Chambre 1",
    category: "Chambres",
    description: "Chambre principale avec literie de qualité"
  },
  {
    src: "/img/chambre2.png",
    alt: "Chambre 2",
    category: "Chambres",
    description: "Deuxième chambre avec accès direct au jardin"
  },
  {
    src: "/img/Pub Porticcio MArs 2025/Ch1 Et.jpeg",
    alt: "Chambre étage",
    category: "Chambres",
    description: "Chambre à l'étage avec accès terrasse"
  },
  {
    src: "/img/Pub Porticcio MArs 2025/SdB Etage.jpeg",
    alt: "Salle de bain",
    category: "Salles de bains",
    description: "Salle de bain moderne avec douche à l'italienne"
  },
  {
    src: "/img/jacuzzi.png",
    alt: "Jacuzzi",
    category: "Extérieur",
    description: "Jacuzzi avec vue panoramique sur le golfe d'Ajaccio"
  },
  {
    src: "/img/Pub Porticcio MArs 2025/Terrasse T3.jpeg",
    alt: "Terrasse principale",
    category: "Extérieur",
    description: "Grande terrasse avec vue panoramique sur le golfe"
  },
  {
    src: "/img/Pub Porticcio MArs 2025/Terrasse .jpeg",
    alt: "Terrasse",
    category: "Extérieur",
    description: "Espace repas extérieur avec mobilier de jardin"
  },
  {
    src: "/img/Pub Porticcio MArs 2025/Jardin.JPG",
    alt: "Jardin",
    category: "Extérieur",
    description: "Jardin méditerranéen verdoyant"
  },
  {
    src: "/img/Pub Porticcio MArs 2025/Coucher de soleil.jpeg",
    alt: "Coucher de soleil",
    category: "Vues",
    description: "Magnifique coucher de soleil sur le golfe d'Ajaccio"
  },
  {
    src: "/img/Pub Porticcio MArs 2025/Vue facade maison.jpeg",
    alt: "Façade",
    category: "Extérieur",
    description: "Vue de la façade de la maison"
  },
];

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
              Galerie
            </h2>
            <p className="text-lg opacity-60 max-w-md">
              Découvrez chaque espace de cette maison avec vue imprenable
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
                    <p className="text-white/60 text-xs mt-1">Cliquez pour agrandir</p>
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
