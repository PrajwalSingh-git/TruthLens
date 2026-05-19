import React from "react";
import { ShieldQuestion } from "lucide-react";

export function ResponsibleAI() {
  return (
    <section className="glass rounded-lg p-5">
      <div className="flex gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal-300/10 text-teal-200">
          <ShieldQuestion className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-white">Responsible AI Note</h2>
          <p className="mt-2 leading-7 text-slate-300">
            TruthLens AI estimates risk signals; it does not declare absolute truth. Use the scores as a starting point for verification with primary sources, reputable reporting, and domain experts.
          </p>
        </div>
      </div>
    </section>
  );
}
