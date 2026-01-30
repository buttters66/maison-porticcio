import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";
import { MapPin, Plane, UtensilsCrossed, ShoppingBag, Waves } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export function LocationSection() {
  const { t, language } = useLanguage();

  const proximityItems = [
    { icon: Waves, label: t("beachTime"), distance: language === "fr" ? "5 min à pied" : "5 min walk", color: "#4A9FFF" },
    { icon: UtensilsCrossed, label: t("restaurants"), distance: language === "fr" ? "7 min à pied" : "7 min walk", color: "#FF6B35" },
    { icon: ShoppingBag, label: t("shops"), distance: language === "fr" ? "10 min à pied" : "10 min walk", color: "#50C878" },
    { icon: Plane, label: t("airport"), distance: language === "fr" ? "20 min en voiture" : "20 min by car", color: "#9B59B6" },
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollAnimationWrapper>
          <h2 
            className="text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-tighter uppercase mb-8 md:mb-12"
            style={{ fontWeight: 900 }}
          >
            {t("locationTitle")}
          </h2>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Info + Proximity */}
          <ScrollAnimationWrapper delay={0.1}>
            <div className="space-y-6">
              {/* Address Card */}
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-6 md:p-8 border border-white/10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl mb-2" style={{ fontWeight: 800 }}>
                      {language === "fr" ? "Maison à Porticcio" : "House in Porticcio"}
                    </h3>
                    <p className="text-white/60">
                      13 Allée des Hirondelles<br />
                      20166 Porticcio<br />
                      Corse-du-Sud, France
                    </p>
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed">
                  {language === "fr" 
                    ? "Située dans un quartier résidentiel calme de Porticcio, notre maison vous offre un cadre idyllique pour vos vacances en Corse. Profitez de la proximité immédiate des plages et du centre-ville tout en restant au calme."
                    : "Located in a quiet residential area of Porticcio, our house offers you an idyllic setting for your holidays in Corsica. Enjoy the immediate proximity to beaches and the town center while staying in a peaceful environment."}
                </p>
              </div>

              {/* Proximity Grid */}
              <div className="grid grid-cols-2 gap-4">
                {proximityItems.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl p-4 border border-white/10 group hover:border-white/20 transition-all"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <p className="text-sm mb-1" style={{ fontWeight: 700 }}>{item.label}</p>
                    <p className="text-xs text-white/50">{item.distance}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimationWrapper>

          {/* Right: Map */}
          <ScrollAnimationWrapper delay={0.2}>
            <div className="h-full min-h-[400px] rounded-2xl overflow-hidden border border-white/10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d750.8178602350166!2d8.793201493263886!3d41.87389369493266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12da15f8c7a4ac33%3A0x18310d80dda19ed2!2s13%20All.%20des%20Hirondelles%2C%2020166%20Porticcio!5e0!3m2!1sfr!2sfr!4v1709658521776!5m2!1sfr!2sfr"
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title={language === "fr" ? "Localisation de la Maison Porticcio" : "Maison Porticcio Location"}
              ></iframe>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
