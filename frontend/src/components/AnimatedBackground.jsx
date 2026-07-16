import React from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="cyber-grid absolute inset-0 opacity-80" />
      <motion.div
        className="absolute left-[12%] top-[16%] h-28 w-28 rounded-full border border-cyan-300/30"
        animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.55, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-[18%] top-[30%] h-40 w-40 rounded-full border border-teal-300/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[12%] left-[42%] h-px w-72 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
        animate={{ x: [-80, 160, -80], opacity: [0.2, 0.75, 0.2] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <div className="scanline" />
    </div>
  );
}
