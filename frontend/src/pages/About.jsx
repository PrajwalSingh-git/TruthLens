import React from "react";
import { Brain, CheckCircle2, Eye, Shield } from "lucide-react";

export function About() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyanfire">About Project</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-white">AI for social good, built like a cybersecurity product.</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
        TruthLens AI helps people slow down before sharing viral claims. It combines prompt-engineered AI analysis with transparent risk indicators, phrase-level highlighting, and verification guidance.
      </p>
      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {[
          [Shield, "Cybersecurity awareness", "Treats misinformation as an information security threat that targets public trust."],
          [Brain, "Responsible AI", "Returns structured explanations and verification tips instead of acting as an unquestionable truth authority."],
          [Eye, "Digital literacy", "Shows readers the emotional and rhetorical techniques that make posts persuasive."],
          [CheckCircle2, "Failsafe practicality", "Works with OpenAI when available and uses a fallback analyzer when offline."]
        ].map(([Icon, title, body]) => (
          <article key={title} className="glass rounded-lg p-6">
            <Icon className="mb-5 h-8 w-8 text-cyanfire" />
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <p className="mt-3 leading-7 text-slate-400">{body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
