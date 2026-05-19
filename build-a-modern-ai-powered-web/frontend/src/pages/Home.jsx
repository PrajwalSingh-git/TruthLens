import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Crosshair, Gauge, Globe2, LockKeyhole, Zap } from "lucide-react";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { LiveFeed } from "../components/LiveFeed";
import { features } from "../data/demoData";
import { navigate } from "../lib/navigation";

const stats = [
  ["8", "Signals scored"],
  ["< 3s", "Demo analysis"],
  ["24h", "Hackathon ready"],
  ["100%", "JSON API"]
];

export function Home() {
  return (
    <main>
      <section className="relative min-h-[calc(100vh-76px)] overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedBackground />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-100">
              <LockKeyhole className="h-4 w-4" />
              AI misinformation defense system
            </div>
            <h1 className="font-display text-5xl font-bold leading-tight text-white text-balance sm:text-6xl lg:text-7xl">
              TruthLens AI
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-300">
              A futuristic fake news and propaganda detector that scores credibility, reveals manipulation patterns, and helps people verify before they share.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => navigate("/analyze")} className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 font-bold text-slate-950 shadow-glow transition hover:bg-cyan-200">
                Analyze News
                <ArrowRight className="h-5 w-5" />
              </button>
              <button onClick={() => navigate("/extension")} className="rounded-lg border border-white/12 bg-white/5 px-5 py-3 font-bold text-white transition hover:bg-white/10">
                View Extension Mockup
              </button>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map(([value, label]) => (
                <div key={label} className="glass rounded-lg p-4">
                  <p className="text-2xl font-extrabold text-white">{value}</p>
                  <p className="text-sm text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="glass relative rounded-lg p-5 shadow-glow"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-slate-400">Threat Analysis</p>
                <h2 className="font-display text-2xl font-bold text-white">Suspicion Matrix</h2>
              </div>
              <Zap className="h-6 w-6 text-cyanfire" />
            </div>
            {[
              ["Credibility", 42, "bg-cyan-300"],
              ["Clickbait", 87, "bg-amber-300"],
              ["Propaganda", 74, "bg-rose-300"],
              ["Emotional Load", 91, "bg-teal-300"]
            ].map(([label, value, color]) => (
              <div key={label} className="mb-5">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-semibold text-slate-200">{label}</span>
                  <span className="text-slate-400">{value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    className={`h-full ${color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1.2, delay: 0.25 }}
                  />
                </div>
              </div>
            ))}
            <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50">
              “This article uses emotionally charged language, sensational wording, and unsupported claims designed to provoke fear and urgency.”
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-white">Startup-Grade Detection Stack</h2>
            <p className="mt-2 text-slate-400">Built for a convincing hackathon demo and a real social-good product story.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature, index) => {
            const icons = [BrainCircuit, Crosshair, Globe2, Gauge, LockKeyhole, Zap];
            const Icon = icons[index];
            return (
              <article key={feature} className="glass rounded-lg p-5">
                <Icon className="mb-5 h-7 w-7 text-cyanfire" />
                <h3 className="text-lg font-bold text-white">{feature}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Scores, explains, and visualizes misinformation risk in a format judges can understand quickly.
                </p>
              </article>
            );
          })}
        </div>
        <div className="mt-6">
          <LiveFeed />
        </div>
      </section>
    </main>
  );
}
