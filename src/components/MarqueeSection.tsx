"use client";

import { motion } from "motion/react";

export function MarqueeSection() {
  const items = ["VUE MER", "5 MIN PLAGE", "PORTICCIO", "JACUZZI", "GOLFE D'AJACCIO", "CORSE DU SUD", "2 CHAMBRES", "TERRASSE"];
  
  return (
    <div className="py-8 border-y border-white/10 overflow-hidden bg-[#0a0a0a]">
      <div className="flex">
        <motion.div
          className="flex gap-8 md:gap-12 whitespace-nowrap"
          animate={{
            x: [0, -2400],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Repeat items 6 times for seamless loop */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex gap-8 md:gap-12">
              {items.map((item, i) => (
                <div key={`${index}-${i}`} className="flex items-center gap-8 md:gap-12">
                  <span 
                    className="text-3xl md:text-5xl tracking-wider"
                    style={{ fontWeight: 900 }}
                  >
                    {item}
                  </span>
                  <span className="text-[#FF6B35] text-2xl md:text-4xl">•</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
