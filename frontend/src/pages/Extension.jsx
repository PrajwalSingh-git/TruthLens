import React from "react";
import { BellRing, Check, Chrome, ShieldAlert, ShieldCheck, Wand2 } from "lucide-react";

export function Extension() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid items-center gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyanfire">Browser Extension Concept</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white">Real-time credibility warnings wherever news appears.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            A future TruthLens extension could scan article pages and social feeds, then surface risk badges before users repost misinformation.
          </p>
          <div className="mt-8 grid gap-3">
            {["Inline credibility badge", "Suspicious phrase overlay", "One-click verification checklist"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-slate-200">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-300/12 text-teal-200">
                  <Check className="h-4 w-4" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-lg p-5 shadow-glow">
          <div className="rounded-lg border border-white/10 bg-slate-950">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div className="flex items-center gap-2">
                <Chrome className="h-5 w-5 text-cyanfire" />
                <span className="font-bold text-white">TruthLens Guard</span>
              </div>
              <BellRing className="h-5 w-5 text-slate-400" />
            </div>
            <div className="grid gap-4 p-4 md:grid-cols-[1fr_300px]">
              <article className="rounded-lg bg-white/[0.03] p-5">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">Article preview</p>
                <h2 className="text-2xl font-bold text-white">Secret revealed: media hiding shocking crisis from families</h2>
                <p className="mt-4 leading-7 text-slate-300">
                  The article includes emotionally charged phrases like <mark className="rounded bg-amber-300/20 px-1 text-amber-100">secret revealed</mark> and <mark className="rounded bg-amber-300/20 px-1 text-amber-100">media hiding</mark>, which may create distrust before evidence is presented.
                </p>
              </article>
              <aside className="rounded-lg border border-rose-300/25 bg-rose-300/10 p-4">
                <div className="mb-4 flex items-center gap-3">
                  <ShieldAlert className="h-8 w-8 text-rose-200" />
                  <div>
                    <p className="font-bold text-white">High risk</p>
                    <p className="text-sm text-rose-100">Credibility 31/100</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-slate-300">
                  <p>Clickbait score: 89</p>
                  <p>Propaganda probability: 77</p>
                  <p>Emotional manipulation: 92</p>
                </div>
                <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 py-3 font-bold text-slate-950">
                  <Wand2 className="h-4 w-4" />
                  Open Full Analysis
                </button>
              </aside>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-8 grid gap-5 md:grid-cols-3">
        {[
          ["Social media overlay", ShieldCheck],
          ["Article URL auto-scan", Chrome],
          ["Share warning prompt", BellRing]
        ].map(([title, Icon]) => (
          <article key={title} className="glass rounded-lg p-5">
            <Icon className="mb-4 h-7 w-7 text-cyanfire" />
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">A future expansion path that turns the hackathon prototype into a platform.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
