import React from "react";
import { SearchCheck } from "lucide-react";
import { buildPhraseInsights } from "../lib/phraseInsights";

export function PhraseInsights({ phrases }) {
  const insights = buildPhraseInsights(phrases || []);

  return (
    <section className="glass rounded-lg p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Phrase Intelligence</h2>
          <p className="text-sm text-slate-400">Why each highlighted phrase may be manipulative</p>
        </div>
        <SearchCheck className="h-6 w-6 text-cyanfire" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {insights.map((item) => (
          <article key={item.phrase} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="mb-2 inline-flex rounded bg-amber-300/15 px-2 py-1 text-sm font-bold text-amber-100">{item.phrase}</p>
            <h3 className="font-bold text-white">{item.type}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.reason}</p>
            <p className="mt-3 text-sm leading-6 text-cyan-100">{item.verification}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
