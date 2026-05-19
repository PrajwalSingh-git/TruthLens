import React from "react";
import { Clock3, Trash2 } from "lucide-react";

export function HistoryPanel({ items, onSelect, onClear }) {
  return (
    <aside className="glass rounded-lg p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-white">Analysis History</h2>
          <p className="text-sm text-slate-400">Saved locally in this browser</p>
        </div>
        <button
          onClick={onClear}
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:text-white"
          title="Clear history"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">Run an analysis to save your first report.</p>
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                  <Clock3 className="h-3.5 w-3.5" />
                  {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                <span className="rounded bg-teal-300/10 px-2 py-1 text-xs font-bold text-teal-100">{item.credibility}</span>
              </div>
              <p className="line-clamp-2 text-sm leading-6 text-slate-300">{item.preview}</p>
            </button>
          ))
        )}
      </div>
    </aside>
  );
}
