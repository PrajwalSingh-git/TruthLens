import React from "react";
import { motion } from "framer-motion";
import { Binary, FileSearch, Radar, ShieldQuestion } from "lucide-react";

const steps = [
  ["Language scan", Binary],
  ["Evidence signals", FileSearch],
  ["Propaganda radar", Radar],
  ["Risk scoring", ShieldQuestion]
];

export function LoadingSequence({ active }) {
  if (!active) return null;

  return (
    <div className="mt-4 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
      <div className="grid gap-3 sm:grid-cols-4">
        {steps.map(([label, Icon], index) => (
          <motion.div
            key={label}
            className="flex items-center gap-2 text-sm font-semibold text-cyan-50"
            initial={{ opacity: 0.35 }}
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.3, delay: index * 0.15, repeat: Infinity }}
          >
            <Icon className="h-4 w-4 text-cyanfire" />
            {label}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
