import React from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

export function MetricCard({ label, value, icon: Icon, hint, tone = "cyan" }) {
  const colors = {
    cyan: "from-cyan-300 to-sky-500",
    teal: "from-teal-300 to-emerald-500",
    amber: "from-amber-300 to-orange-500",
    rose: "from-rose-300 to-red-500",
    violet: "from-violet-300 to-fuchsia-500"
  };

  return (
    <motion.article
      className="glass rounded-lg p-5"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 text-cyan-100">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">{label}</h3>
            <p className="text-xs text-slate-400">{hint}</p>
          </div>
        </div>
        <span title={hint} className="text-slate-500">
          <Info className="h-4 w-4" />
        </span>
      </div>
      <div className="flex items-end justify-between">
        <div className="relative h-24 w-24">
          <div
            className="meter-arc h-full w-full rounded-full"
            style={{ "--value": `${Math.max(0, Math.min(100, value)) * 2.8}deg` }}
          />
          <div className="absolute inset-3 grid place-items-center rounded-full bg-night">
            <span className="text-2xl font-bold text-white">{value}</span>
          </div>
        </div>
        <div className="w-1/2">
          <div className="mb-2 h-2 overflow-hidden rounded-full bg-slate-800">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${colors[tone]}`}
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </div>
          <p className="text-right text-xs uppercase tracking-[0.18em] text-slate-500">Signal strength</p>
        </div>
      </div>
    </motion.article>
  );
}
