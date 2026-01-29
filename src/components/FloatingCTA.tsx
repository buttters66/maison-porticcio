import { Calendar, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

interface FloatingCTAProps {
  onContactClick: () => void;
  onBookingClick: () => void;
}

export function FloatingCTA({ onContactClick, onBookingClick }: FloatingCTAProps) {
  return (
    <motion.div 
      className="fixed bottom-6 md:bottom-8 left-0 right-0 z-50 flex justify-center px-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="bg-black/60 backdrop-blur-xl rounded-full p-1.5 md:p-2 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-2 md:gap-3">
          {/* Contact Button */}
          <button 
            onClick={onContactClick}
            className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-full bg-white/5 hover:bg-white/15 transition-all duration-300 group border border-white/10"
          >
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-[#FF6B35] transition-colors" />
            <span className="text-white text-xs md:text-sm" style={{ fontWeight: 600 }}>Contact</span>
          </button>

          {/* Book Now Button - Primary */}
          <button 
            onClick={onBookingClick}
            className="flex items-center gap-2 md:gap-3 px-5 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] hover:from-[#FF8E53] hover:to-[#FFB03B] transition-all duration-300 transform hover:scale-105 shadow-[0_0_24px_rgba(255,107,53,0.4)]"
          >
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className="text-white text-sm md:text-base" style={{ fontWeight: 700 }}>Réserver</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
