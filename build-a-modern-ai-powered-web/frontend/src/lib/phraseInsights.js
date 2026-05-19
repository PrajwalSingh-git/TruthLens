const patterns = [
  {
    match: /shocking|you won't believe|secret|revealed/i,
    type: "Sensational hook",
    reason: "Creates curiosity or surprise before presenting verifiable evidence.",
    verification: "Search for the same claim in outlets that cite primary documents."
  },
  {
    match: /media.*hiding|cover up|they don't want you to know|mainstream media/i,
    type: "Conspiracy framing",
    reason: "Frames disagreement as deliberate suppression, which can discourage independent checking.",
    verification: "Look for the original source and compare coverage across several editorially different publications."
  },
  {
    match: /doctors hate|experts hate|officials refuse|agenda/i,
    type: "Authority attack",
    reason: "Undermines institutions or experts without showing direct evidence for the accusation.",
    verification: "Check whether named experts, institutions, or documents are cited and reachable."
  },
  {
    match: /crisis|fear|urgent|wake up|before it's too late/i,
    type: "Fear urgency",
    reason: "Uses pressure or threat language that can push readers to react before verifying.",
    verification: "Pause before sharing and verify whether the urgency is supported by recent, credible evidence."
  }
];

export function buildPhraseInsights(phrases = []) {
  return phrases.map((phrase) => {
    const pattern = patterns.find((item) => item.match.test(phrase));
    return {
      phrase,
      type: pattern?.type || "Evidence check",
      reason: pattern?.reason || "This phrase deserves verification because it may be a claim, source cue, or framing signal.",
      verification: pattern?.verification || "Check the original source and compare the claim against reputable references."
    };
  });
}

export function buildFactCheckLinks(text = "") {
  const query = encodeURIComponent(text.split(/\s+/).slice(0, 14).join(" "));
  return [
    ["Google News", `https://news.google.com/search?q=${query}`],
    ["Reuters", `https://www.reuters.com/site-search/?query=${query}`],
    ["AP News", `https://apnews.com/search?q=${query}`],
    ["FactCheck.org", `https://www.factcheck.org/search/?fwp_search=${query}`],
    ["Snopes", `https://www.snopes.com/?s=${query}`]
  ];
}
