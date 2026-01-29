import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    const exitTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3300);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Grille tech background */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, white 50px, white 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, white 50px, white 51px)'
            }}
          ></div>

          {/* Gradient orbs animés */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10"
            style={{ background: "radial-gradient(circle, rgba(255,107,53,0.4), transparent)" }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10"
            style={{ background: "radial-gradient(circle, rgba(74,159,255,0.3), transparent)" }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.1, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative z-10 flex flex-col items-center px-4">
            {/* Texte principal avec animation */}
            <motion.div
              className="overflow-hidden mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h1
                className="text-[clamp(2.5rem,12vw,8rem)] leading-[0.85] tracking-tighter uppercase text-center"
                style={{ fontWeight: 900 }}
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.3,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
              >
                Maison
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FF8E53]">
                  Porticcio
                </span>
              </motion.h1>
            </motion.div>

            {/* Sous-titre */}
            <motion.p
              className="text-sm md:text-lg text-white/60 uppercase tracking-[0.3em] mb-12 text-center"
              style={{ fontWeight: 700 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Corse du Sud · Vue mer
            </motion.p>

            {/* Barre de progression */}
            <motion.div
              className="w-64 md:w-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] rounded-full"
                  style={{ width: `${progress}%` }}
                  initial={{ width: "0%" }}
                />
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#FF6B35]/60 rounded-full blur-md"
                  style={{ width: `${progress}%`, opacity: 0.3 }}
                  initial={{ width: "0%" }}
                />
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-white/40 uppercase tracking-wider" style={{ fontWeight: 700 }}>
                  Chargement
                </span>
                <motion.span
                  className="text-sm text-white/90 tabular-nums"
                  style={{ fontWeight: 900 }}
                  key={progress}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                >
                  {progress}%
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
