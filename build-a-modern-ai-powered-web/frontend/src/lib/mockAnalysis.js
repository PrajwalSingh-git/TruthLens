const suspiciousLexicon = [
  "shocking truth",
  "you won't believe",
  "secret revealed",
  "media is hiding",
  "media hiding this",
  "doctors hate this",
  "they don't want you to know",
  "refusing to admit",
  "exposes their agenda",
  "wake up"
];

export function localAnalyze(text) {
  const source = text.trim() || "This post contains limited information and should be verified with primary sources.";
  const lower = source.toLowerCase();
  const found = suspiciousLexicon.filter((phrase) => lower.includes(phrase));
  const exclamations = (source.match(/!/g) || []).length;
  const capsWords = (source.match(/\b[A-Z]{4,}\b/g) || []).length;
  const sensational = found.length * 15 + exclamations * 7 + capsWords * 5;
  const uncertainty = /\b(allegedly|rumor|unconfirmed|sources say|anonymous)\b/i.test(source) ? 12 : 0;
  const evidenceSignals = /\b(study|report|data|court filing|official|published|linked|evidence)\b/i.test(source) ? 14 : 0;
  const politicalSignals = /\b(left|right|liberal|conservative|government|election|party|agenda|elite)\b/i.test(source) ? 22 : 8;
  const emotion = Math.min(96, 28 + sensational + uncertainty);
  const clickbait = Math.min(98, 18 + found.length * 14 + exclamations * 8 + (/\b(shocking|secret|revealed|believe)\b/i.test(source) ? 18 : 0));
  const propaganda = Math.min(95, 24 + found.length * 13 + politicalSignals + (/\b(hiding|agenda|enemy|traitor|crisis)\b/i.test(source) ? 16 : 0));
  const credibility = Math.max(8, Math.min(92, 76 - Math.round((clickbait + propaganda + emotion) / 5) + evidenceSignals));
  const confidence = Math.min(94, 64 + found.length * 5 + Math.min(18, Math.floor(source.length / 120)));
  const extractedClaims = source
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.split(/\s+/).length >= 5)
    .slice(0, 4);
  const shareRisk = Math.min(98, Math.round((clickbait + propaganda + emotion + (100 - credibility)) / 4));

  return {
    credibility_score: credibility,
    clickbait_score: clickbait,
    propaganda_score: propaganda,
    bias_score: Math.min(94, politicalSignals + found.length * 9 + 22),
    emotion_score: emotion,
    confidence,
    bias_label: politicalSignals > 18 ? "Ideologically loaded" : "Low visible bias",
    suspicious_phrases: found.length ? found : ["verify source", "check evidence"],
    extracted_claims: extractedClaims.length ? extractedClaims : ["No concrete claim extracted; verify the source before sharing."],
    share_risk_score: shareRisk,
    explanation:
      "This content shows signals associated with manipulative framing, including emotionally charged wording, urgency cues, or claims that require stronger evidence before being trusted.",
    verification_tips: [
      "Look for primary sources, named experts, and original documents.",
      "Compare the claim with multiple reputable outlets before sharing.",
      "Separate factual claims from emotional framing and opinion language."
    ],
    radar: [
      { subject: "Fear", score: Math.min(95, emotion) },
      { subject: "Urgency", score: Math.min(95, clickbait - 3) },
      { subject: "Us vs Them", score: Math.min(95, propaganda - 8) },
      { subject: "Evidence Gap", score: Math.max(20, 88 - credibility) },
      { subject: "Authority Attack", score: Math.min(95, found.length * 18 + 24) },
      { subject: "Repetition", score: Math.min(90, Math.floor(source.length / 22)) }
    ],
    emotion_timeline: [
      { segment: "Opening", anger: emotion - 14, fear: emotion, trust: credibility },
      { segment: "Middle", anger: Math.min(95, emotion - 5), fear: Math.min(95, emotion - 8), trust: credibility + 4 },
      { segment: "Close", anger: Math.min(95, emotion + 2), fear: Math.min(95, emotion - 2), trust: credibility - 8 }
    ]
  };
}
