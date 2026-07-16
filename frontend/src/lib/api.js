import { localAnalyze } from "./mockAnalysis";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function analyzeContent({ text, url }) {
  const endpoint = url ? "/analyze-url" : "/analyze";
  const payload = url ? { url } : { text };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Analysis failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return {
      ...localAnalyze(text || url || ""),
      fallback: true,
      fallback_reason: error.message
    };
  }
}
