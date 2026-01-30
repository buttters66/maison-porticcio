import { Wifi, Car, Waves, UtensilsCrossed, Wind, Home, Snowflake, Tv, Shirt, Sparkles } from "lucide-react";
import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";
import { useLanguage } from "../i18n/LanguageContext";

export function BentoFeatures() {
  const { t, language } = useLanguage();

  const features = [
    { icon: Wifi, label: t("wifi"), description: t("wifiDesc"), color: "#FF6B35", gradient: "from-[#FF6B35] to-[#FF8E53]" },
    { icon: Snowflake, label: t("aircon"), description: t("airconDesc"), color: "#4A9FFF", gradient: "from-[#4A9FFF] to-[#6BB6FF]" },
    { icon: Sparkles, label: t("jacuzzi"), description: t("jacuzziDesc"), color: "#9B59B6", gradient: "from-[#9B59B6] to-[#BB79D6]" },
    { icon: Car, label: t("parking"), description: language === "fr" ? "Gratuit" : "Free", color: "#FFB03B", gradient: "from-[#FFB03B] to-[#FFC86B]" },
    { icon: Waves, label: t("beach"), description: t("beachDesc"), color: "#50C878", gradient: "from-[#50C878] to-[#70E898]" },
    { icon: UtensilsCrossed, label: t("kitchen"), description: t("kitchenDesc"), color: "#E74C3C", gradient: "from-[#E74C3C] to-[#FF6B6B]" },
    { icon: Tv, label: t("tv"), description: t("tvDesc"), color: "#3498DB", gradient: "from-[#3498DB] to-[#54B8FB]" },
    { icon: Wind, label: t("terrace"), description: t("terraceDesc"), color: "#1ABC9C", gradient: "from-[#1ABC9C] to-[#3DDCBC]" },
    { icon: Home, label: t("rooms"), description: t("roomsDesc"), color: "#F39C12", gradient: "from-[#F39C12] to-[#FFB732]" },
    { icon: Shirt, label: t("washing"), description: t("washingDesc"), color: "#F1C40F", gradient: "from-[#F1C40F] to-[#FFE066]" },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollAnimationWrapper>
          <h2 
            className="text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-tighter uppercase mb-8 md:mb-12"
            style={{ fontWeight: 900 }}
          >
            {t("featuresTitle")}
          </h2>
        </ScrollAnimationWrapper>

        {/* Hero Image avec overlay gradient */}
        <ScrollAnimationWrapper delay={0.1}>
          <div className="relative w-full h-[280px] md:h-[550px] rounded-2xl md:rounded-3xl overflow-hidden mb-6 md:mb-8 group border-2 border-white/10">
            <img
              src="/img/Pub Porticcio MArs 2025/Terrasse T3.jpeg"
              alt="Terrasse de la Maison Porticcio"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay plus intense */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            
            {/* Grille tech overlay subtile */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)'
              }}
            ></div>

            {/* Content overlay avec stats */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-12">
              <div className="max-w-2xl">
                <div className="inline-block bg-[#FF6B35]/20 backdrop-blur-sm border border-[#FF6B35]/30 px-2.5 py-1 md:px-4 md:py-1.5 rounded-full mb-2 md:mb-4">
                  <p className="text-[#FF6B35] text-[9px] md:text-xs uppercase tracking-wider" style={{ fontWeight: 800 }}>
                    {language === "fr" ? "Vue mer exceptionnelle" : "Exceptional sea view"}
                  </p>
                </div>
                
                <h3 className="text-2xl md:text-6xl uppercase tracking-tight mb-2 md:mb-4" style={{ fontWeight: 900 }}>
                  {language === "fr" ? "Maison vue mer" : "Sea view house"}
                </h3>
                
                <p className="text-sm md:text-2xl opacity-90 mb-3 md:mb-6">Porticcio, Corse du Sud</p>
                
                {/* Mini stats */}
                <div className="grid grid-cols-4 gap-1.5 md:flex md:flex-wrap md:gap-4">
                  {[
                    { value: "T3", label: "Type" },
                    { value: "2", label: language === "fr" ? "Chambres" : "Rooms" },
                    { value: "5", label: language === "fr" ? "Pers." : "Guests" },
                    { value: "5min", label: language === "fr" ? "Plage" : "Beach" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg md:rounded-xl px-1.5 py-1.5 md:px-4 md:py-2.5">
                      <p className="text-sm md:text-2xl text-[#FF6B35] leading-tight" style={{ fontWeight: 900 }}>{stat.value}</p>
                      <p className="text-[8px] md:text-xs text-white/60 uppercase tracking-wider leading-tight" style={{ fontWeight: 700 }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Features Grid - 2 colonnes mobile, 5 desktop */}
        <ScrollAnimationWrapper delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-white/30 transition-all duration-500 overflow-hidden"
              >
                {/* Animated gradient background on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                
                {/* Glow effect */}
                <div 
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${feature.color}, transparent)` }}
                ></div>

                <div className="relative flex flex-col items-start h-full">
                  {/* Icon container avec animation */}
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ 
                      backgroundColor: `${feature.color}20`,
                      boxShadow: `0 0 0 0px ${feature.color}20`
                    }}
                  >
                    <feature.icon 
                      className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 group-hover:scale-110" 
                      style={{ color: feature.color }}
                      strokeWidth={2.5}
                    />
                  </div>

                  {/* Text content */}
                  <div className="flex-1">
                    <p className="text-sm md:text-base mb-0.5 md:mb-1 group-hover:text-white transition-colors leading-tight" style={{ fontWeight: 800 }}>
                      {feature.label}
                    </p>
                    <p className="text-[10px] md:text-xs text-white/50 group-hover:text-white/70 transition-colors leading-tight" style={{ fontWeight: 600 }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
