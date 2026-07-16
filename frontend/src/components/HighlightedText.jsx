import React from "react";

export function HighlightedText({ text, phrases = [] }) {
  if (!text) {
    return <p className="text-slate-400">Paste content to see suspicious phrase highlighting.</p>;
  }

  const escaped = phrases.filter(Boolean).map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!escaped.length) {
    return <p className="whitespace-pre-wrap leading-7 text-slate-300">{text}</p>;
  }

  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <p className="whitespace-pre-wrap leading-7 text-slate-300">
      {parts.map((part, index) =>
        phrases.some((phrase) => phrase.toLowerCase() === part.toLowerCase()) ? (
          <mark key={`${part}-${index}`} className="rounded bg-amber-300/20 px-1 py-0.5 text-amber-100 ring-1 ring-amber-300/30">
            {part}
          </mark>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        )
      )}
    </p>
  );
}
