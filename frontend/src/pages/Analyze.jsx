import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BrainCircuit,
  Download,
  ExternalLink,
  Gauge,
  Loader2,
  Megaphone,
  MousePointerClick,
  Scale,
  Search,
  Share2,
  Sparkles,
  UserCircle
} from "lucide-react";
import { ChartsPanel } from "../components/ChartsPanel";
import { HighlightedText } from "../components/HighlightedText";
import { LiveFeed } from "../components/LiveFeed";
import { LoadingSequence } from "../components/LoadingSequence";
import { MetricCard } from "../components/MetricCard";
import { PhraseInsights } from "../components/PhraseInsights";
import { ResponsibleAI } from "../components/ResponsibleAI";
import { UrlPreview } from "../components/UrlPreview";
import { sampleText } from "../data/demoData";
import { analyzeContent } from "../lib/api";
import { createHistoryItem, exportReport, loadHistory, saveHistory } from "../lib/history";
import { localAnalyze } from "../lib/mockAnalysis";
import { buildFactCheckLinks } from "../lib/phraseInsights";

const initialResult = localAnalyze(sampleText);

export function Analyze() {
  const [mode, setMode] = useState("text");
  const [text, setText] = useState(sampleText);
  const [url, setUrl] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [result, setResult] = useState(initialResult);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const analyzedText = result.extracted_text || text;
  const factLinks = useMemo(() => buildFactCheckLinks(analyzedText), [analyzedText]);

  function persistHistory(nextResult, analysisText, analysisUrl, analysisMode) {
    const item = createHistoryItem({
      text: analysisText,
      url: analysisUrl,
      mode: analysisMode,
      result: nextResult
    });
    const nextHistory = [item, ...history].slice(0, 8);
    setHistory(nextHistory);
    saveHistory(nextHistory);
  }

  async function runAnalysis() {
    setLoading(true);
    const analysisUrl = mode === "url" ? url : "";
    const next = await analyzeContent({ text, url: analysisUrl });
    setResult(next);
    setSourceUrl(analysisUrl);
    if (next.extracted_text) {
      setText(next.extracted_text);
    }
    persistHistory(next, next.extracted_text || text, analysisUrl, mode);
    setLoading(false);
  }

  function restoreHistory(item) {
    setMode(item.mode);
    setText(item.text);
    setUrl(item.url || "");
    setSourceUrl(item.url || "");
    setResult(item.result);
  }

  function clearHistory() {
    setHistory([]);
    saveHistory([]);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyanfire">Analysis Dashboard</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white">Analyze Content Credibility</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Paste a headline, article, social post, or URL. TruthLens AI scores credibility and explains the manipulation signals it detects.
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setProfileOpen((value) => !value)}
            className="inline-flex items-center gap-3 rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-4 py-3 font-bold text-cyan-100 shadow-glow transition hover:bg-cyan-300/15"
            aria-label="Open profile actions"
          >
            <UserCircle className="h-6 w-6" />
            <span className="hidden sm:inline">Profile</span>
          </button>
          {profileOpen ? (
            <div className="absolute right-0 z-40 mt-3 w-[min(92vw,380px)] rounded-lg border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h2 className="font-display text-lg font-bold text-white">Profile Actions</h2>
                  <p className="text-sm text-slate-400">Reports and saved analyses</p>
                </div>
                <UserCircle className="h-6 w-6 text-cyanfire" />
              </div>
              <button
                onClick={() => exportReport({ text: analyzedText, url: sourceUrl, mode, result })}
                className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                <Download className="h-4 w-4" />
                Export Current Report
              </button>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Analysis History</h3>
                <button onClick={clearHistory} className="text-xs font-semibold text-slate-400 transition hover:text-white">
                  Clear
                </button>
              </div>
              <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                {history.length === 0 ? (
                  <p className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-400">Run an analysis to save your first report.</p>
                ) : (
                  history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        restoreHistory(item);
                        setProfileOpen(false);
                      }}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] p-3 text-left transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                          {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span className="rounded bg-teal-300/10 px-2 py-1 text-xs font-bold text-teal-100">{item.credibility}</span>
                      </div>
                      <p className="line-clamp-2 text-sm leading-6 text-slate-300">{item.preview}</p>
                    </button>
                  ))
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <section className="space-y-6">
          <section className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
            <div className="glass rounded-lg p-5">
              <div className="mb-5 inline-flex rounded-lg border border-white/10 bg-white/5 p-1">
                {[
                  ["text", "Text / Post"],
                  ["url", "URL Analyzer"]
                ].map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setMode(id)}
                    className={`rounded-md px-4 py-2 text-sm font-bold transition ${
                      mode === id ? "bg-cyan-300 text-slate-950" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {mode === "url" ? (
                <input
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://example.com/news/article"
                  className="mb-4 w-full rounded-lg border border-white/10 bg-slate-950/70 px-4 py-4 text-slate-100 outline-none ring-cyan-300/30 transition placeholder:text-slate-500 focus:ring-4"
                />
              ) : null}

              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                rows={12}
                placeholder="Paste a headline, full article, tweet, or social media post..."
                className="w-full resize-none rounded-lg border border-white/10 bg-slate-950/70 p-4 leading-7 text-slate-100 outline-none ring-cyan-300/30 transition placeholder:text-slate-500 focus:ring-4"
              />
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={runAnalysis}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 font-bold text-slate-950 shadow-glow transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                  {loading ? "Scanning Signals" : "Analyze Content"}
                </button>
                <button
                  onClick={() => {
                    setMode("text");
                    setSourceUrl("");
                    setUrl("");
                    setText(sampleText);
                    setResult(initialResult);
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-100 transition hover:bg-white/10"
                >
                  Load Demo
                </button>
                {result?.fallback ? <span className="text-sm text-amber-200">Using offline demo analyzer</span> : null}
              </div>
              <LoadingSequence active={loading} />
            </div>

            <motion.div className="glass rounded-lg p-5" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">AI Confidence Meter</h2>
                  <p className="text-sm text-slate-300">Prediction reliability for this analysis</p>
                </div>
                <BrainCircuit className="h-7 w-7 text-cyanfire" />
              </div>
              <div className="relative mx-auto mb-6 grid h-48 w-48 place-items-center">
                <div className="meter-arc h-full w-full rounded-full shadow-glow" style={{ "--value": `${(result.confidence || 0) * 2.8}deg` }} />
                <div className="absolute inset-5 grid place-items-center rounded-full bg-night">
                  <div className="text-center">
                    <p className="text-5xl font-extrabold text-white">{result.confidence}</p>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">confidence</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="mb-2 text-sm font-bold text-slate-100">Bias Spectrum</p>
                <div className="relative h-3 rounded-full bg-gradient-to-r from-sky-400 via-slate-300 to-rose-400">
                  <motion.span className="absolute top-1/2 h-6 w-2 -translate-y-1/2 rounded-full bg-white shadow-glow" initial={{ left: "50%" }} animate={{ left: `${result.bias_score}%` }} />
                </div>
                <div className="mt-3 flex justify-between text-xs text-slate-400">
                  <span>Left framing</span>
                  <span>{result.bias_label}</span>
                  <span>Right framing</span>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            <MetricCard label="Credibility Score" value={result.credibility_score} icon={Gauge} hint="Higher means stronger reliability signals" tone="teal" />
            <MetricCard label="Clickbait Score" value={result.clickbait_score} icon={MousePointerClick} hint="Sensational headline and curiosity-gap risk" tone="amber" />
            <MetricCard label="Propaganda Probability" value={result.propaganda_score} icon={Megaphone} hint="Manipulative persuasion pattern probability" tone="rose" />
            <MetricCard label="Emotional Manipulation" value={result.emotion_score} icon={AlertTriangle} hint="Fear, outrage, urgency, and anxiety cues" tone="violet" />
            <MetricCard label="Political Bias Meter" value={result.bias_score} icon={Scale} hint="Estimated ideological framing intensity" tone="cyan" />
          </section>

          <UrlPreview url={sourceUrl} extractedText={result.extracted_text} />

          <section className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
            <article className="glass rounded-lg p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">Shareability Risk</h2>
                  <p className="text-sm text-slate-300">How risky this is to repost without verification</p>
                </div>
                <Share2 className="h-6 w-6 text-cyanfire" />
              </div>
              <div className="relative h-4 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-teal-300 via-amber-300 to-rose-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${result.share_risk_score || 0}%` }}
                />
              </div>
              <p className="mt-4 text-5xl font-extrabold text-white">{result.share_risk_score || 0}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Pause, verify the primary claim, and check context before sharing content with a high risk score.</p>
            </article>
            <article className="glass rounded-lg p-5">
              <h2 className="mb-4 font-display text-2xl font-bold text-white">Extracted Claims</h2>
              <div className="space-y-3">
                {(result.extracted_claims || []).map((claim, index) => (
                  <div key={`${claim}-${index}`} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Claim {index + 1}</p>
                    <p className="leading-7 text-slate-200">{claim}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
            <article className="glass rounded-lg p-5">
              <h2 className="mb-3 font-display text-2xl font-bold text-white">AI Explanation Engine</h2>
              <p className="leading-7 text-slate-200">{result.explanation}</p>
              <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-cyanfire">Verification Guidance</h3>
              <ul className="mt-3 space-y-2 text-slate-200">
                {(result.verification_tips || []).map((tip) => (
                  <li key={tip} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                    {tip}
                  </li>
                ))}
              </ul>
            </article>
            <article className="glass rounded-lg p-5">
              <h2 className="mb-3 font-display text-2xl font-bold text-white">Suspicious Phrase Highlighting</h2>
              <HighlightedText text={analyzedText} phrases={result.suspicious_phrases} />
            </article>
          </section>

          <PhraseInsights phrases={result.suspicious_phrases} />

          <section className="glass rounded-lg p-5">
            <div className="mb-4 flex items-center gap-3">
              <Search className="h-5 w-5 text-cyanfire" />
              <h2 className="font-display text-xl font-bold text-white">Fast Fact-Check Links</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {factLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
                >
                  {label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </section>

          <ChartsPanel result={result} />
          <ResponsibleAI />
          <LiveFeed />
      </section>
    </main>
  );
}
