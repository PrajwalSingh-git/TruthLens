const HISTORY_KEY = "truthlens-history";

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveHistory(items) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 8)));
}

export function createHistoryItem({ text, url, mode, result }) {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    mode,
    url,
    preview: (mode === "url" ? url : text).slice(0, 140),
    credibility: result.credibility_score,
    clickbait: result.clickbait_score,
    propaganda: result.propaganda_score,
    result,
    text
  };
}

export function exportReport({ text, url, mode, result }) {
  const report = {
    product: "TruthLens AI",
    generated_at: new Date().toISOString(),
    input_type: mode,
    source_url: url || null,
    analyzed_text_preview: text.slice(0, 1200),
    scores: {
      credibility: result.credibility_score,
      clickbait: result.clickbait_score,
      propaganda: result.propaganda_score,
      emotional_manipulation: result.emotion_score,
      political_bias: result.bias_score,
      confidence: result.confidence,
      shareability_risk: result.share_risk_score
    },
    extracted_claims: result.extracted_claims || [],
    suspicious_phrases: result.suspicious_phrases,
    explanation: result.explanation,
    verification_tips: result.verification_tips
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = `truthlens-report-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(href);
}
