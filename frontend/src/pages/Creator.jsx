import React from "react";
import {
  User,
  Code2,
  Brain,
  Server,
  Rocket,
  ShieldCheck,
} from "lucide-react";

export function Team() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="mb-12 flex items-center gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-lg bg-cyan-300/10 text-cyanfire">
          <User className="h-6 w-6" />
        </span>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyanfire">
            About the Developer
          </p>

          <h1 className="font-display text-4xl font-bold text-white">
            Designed & Developed by Prajwal Singh
          </h1>

          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-400">
            TruthLens AI is an AI-powered misinformation detection platform
            created to help users evaluate the credibility of online content
            through transparent and explainable AI analysis.
          </p>
        </div>
      </div>

      {/* Developer Card */}
      <section className="glass rounded-xl p-8">
        <h2 className="text-3xl font-bold text-white">
          Prajwal Singh
        </h2>

        <p className="mt-2 text-cyanfire font-medium">
          Full Stack Developer • AI Enthusiast
        </p>

        <p className="mt-6 leading-8 text-slate-300">
          I am a Computer Science undergraduate passionate about software
          engineering, artificial intelligence, and full-stack development.
          TruthLens AI was independently designed and developed as a project
          focused on combating misinformation through explainable AI. Rather
          than simply predicting whether content is trustworthy, the platform
          helps users understand why a piece of information may be misleading.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">
              Responsibilities
            </h3>

            <ul className="space-y-4 text-slate-300">

              <li className="flex items-start gap-3">
                <Code2 className="mt-1 text-cyanfire" size={20} />
                <span>
                  Designed the complete frontend using React, Vite and
                  Tailwind CSS with a modern cybersecurity-inspired UI.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Server className="mt-1 text-cyanfire" size={20} />
                <span>
                  Built backend APIs using FastAPI and integrated AI-powered
                  content analysis.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Brain className="mt-1 text-cyanfire" size={20} />
                <span>
                  Implemented credibility scoring, propaganda detection,
                  explainable AI responses and fallback analysis.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Rocket className="mt-1 text-cyanfire" size={20} />
                <span>
                  Managed deployment, project architecture, version control
                  and overall application workflow.
                </span>
              </li>

            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">
              Technologies Used
            </h3>

            <div className="flex flex-wrap gap-3">

              {[
                "React",
                "Vite",
                "Tailwind CSS",
                "FastAPI",
                "Python",
                "JavaScript",
                "OpenAI",
                "Git",
                "GitHub",
                "REST APIs"
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
                >
                  {tech}
                </span>
              ))}

            </div>
          </div>

        </div>
      </section>

      {/* Vision */}
      <section className="mt-10 glass rounded-xl p-8">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-cyanfire" />
          <h2 className="text-2xl font-bold text-white">
            Project Vision
          </h2>
        </div>

        <p className="mt-5 leading-8 text-slate-300">
          Misinformation spreads faster than verified information in today's
          digital ecosystem. TruthLens AI aims to empower users by combining
          artificial intelligence with transparent explanations that highlight
          credibility indicators, manipulation techniques, and biased language.
          Instead of replacing human judgment, the platform encourages critical
          thinking by providing insights that help users make informed decisions
          before believing or sharing online content.
        </p>
      </section>
    </main>
  );
}