import { motion } from "motion/react";
import { Globe } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1">
        <button
          onClick={() => setLanguage("fr")}
          className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
            language === "fr"
              ? "bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          FR
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
            language === "en"
              ? "bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          EN
        </button>
        <Globe className="w-4 h-4 text-white/40 mx-1" />
      </div>
    </motion.div>
  );
}
