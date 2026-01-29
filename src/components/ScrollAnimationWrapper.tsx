import { motion } from "motion/react";
import { ReactNode } from "react";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ScrollAnimationWrapper({ 
  children, 
  delay = 0,
  className = "" 
}: ScrollAnimationWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
