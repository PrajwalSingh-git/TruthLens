import React from "react";
import { ExternalLink, FileText } from "lucide-react";

export function UrlPreview({ url, extractedText }) {
  if (!url && !extractedText) return null;

  return (
    <article className="glass rounded-lg p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-300/10 text-cyanfire">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold text-white">URL Extraction Preview</h2>
            <p className="text-sm text-slate-400">Article text captured before scoring</p>
          </div>
        </div>
        {url ? (
          <a href={url} target="_blank" rel="noreferrer" className="text-cyan-200 transition hover:text-cyan-100" title="Open source URL">
            <ExternalLink className="h-5 w-5" />
          </a>
        ) : null}
      </div>
      <p className="break-all text-sm text-cyan-100">{url}</p>
      <p className="mt-3 line-clamp-5 leading-7 text-slate-300">{extractedText || "Run URL analysis to show extracted article text here."}</p>
    </article>
  );
}
