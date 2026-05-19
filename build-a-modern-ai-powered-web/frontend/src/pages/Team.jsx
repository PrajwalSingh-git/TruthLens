import React from "react";
import { Users } from "lucide-react";
import { team } from "../data/demoData";

export function Team() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-lg bg-cyan-300/10 text-cyanfire">
          <Users className="h-6 w-6" />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyanfire">Team / About Us</p>
          <h1 className="font-display text-4xl font-bold text-white">A focused 24-hour build team.</h1>
        </div>
      </div>
      <section className="grid gap-5 md:grid-cols-2">
        {team.map((member) => (
          <article key={member.name} className="glass rounded-lg p-6">
            <h2 className="text-xl font-bold text-white">{member.name}</h2>
            <p className="mt-3 leading-7 text-slate-400">{member.role}</p>
          </article>
        ))}
      </section>
      <section className="mt-8 glass rounded-lg p-6">
        <h2 className="font-display text-2xl font-bold text-white">Hackathon Pitch</h2>
        <p className="mt-3 leading-8 text-slate-300">
          TruthLens AI is built for judges to understand instantly: misinformation is a public trust threat, and AI can help users inspect manipulation patterns before misinformation spreads.
        </p>
      </section>
    </main>
  );
}
