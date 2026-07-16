import React from "react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export function ChartsPanel({ result }) {
  const credibility = result?.credibility_score ?? 64;
  const pie = [
    { name: "Credible", value: credibility },
    { name: "Risk", value: 100 - credibility }
  ];
  const radar = result?.radar ?? [];
  const emotion = result?.emotion_timeline ?? [];

  return (
    <section className="grid gap-5 lg:grid-cols-3">
      <div className="glass rounded-lg p-5">
        <h3 className="mb-4 font-display text-lg font-bold text-white">Credibility Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pie} dataKey="value" innerRadius={62} outerRadius={92} paddingAngle={4}>
                <Cell fill="#22d3ee" />
                <Cell fill="#fb7185" />
              </Pie>
              <Tooltip contentStyle={{ background: "#08111f", border: "1px solid rgba(148,163,184,.25)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass rounded-lg p-5">
        <h3 className="mb-4 font-display text-lg font-bold text-white">Propaganda Characteristics</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <RadarChart data={radar}>
              <PolarGrid stroke="rgba(148,163,184,.25)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#cbd5e1", fontSize: 11 }} />
              <Radar dataKey="score" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.28} />
              <Tooltip contentStyle={{ background: "#08111f", border: "1px solid rgba(148,163,184,.25)" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass rounded-lg p-5">
        <h3 className="mb-4 font-display text-lg font-bold text-white">Sentiment / Emotion</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <AreaChart data={emotion}>
              <XAxis dataKey="segment" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#08111f", border: "1px solid rgba(148,163,184,.25)" }} />
              <Area type="monotone" dataKey="fear" stroke="#fb7185" fill="#fb7185" fillOpacity={0.18} />
              <Area type="monotone" dataKey="anger" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.14} />
              <Area type="monotone" dataKey="trust" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.16} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
