import React from "react";
import { Activity, ShieldAlert, ShieldCheck } from "lucide-react";
import { liveHeadlines } from "../data/demoData";

export function LiveFeed() {
  return (
    <section className="glass rounded-lg p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-white">Live News Feed Demo</h3>
          <p className="text-sm text-slate-400">Mock trending headlines with AI credibility badges</p>
        </div>
        <Activity className="h-5 w-5 text-cyanfire" />
      </div>
      <div className="space-y-3">
        {liveHeadlines.map((item) => {
          const risky = item.credibility < 50;
          return (
            <div key={item.title} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-100">{item.title}</p>
                <p className="text-sm text-slate-400">{item.badge}</p>
              </div>
              <span
                className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold ${
                  risky ? "bg-rose-400/10 text-rose-200" : "bg-teal-400/10 text-teal-200"
                }`}
              >
                {risky ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                {item.credibility}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
