import json
import os
import re
from typing import Any

from openai import AsyncOpenAI

from app.schemas import AnalyzeResponse
from app.services.prompts import SYSTEM_PROMPT, USER_PROMPT_TEMPLATE

SUSPICIOUS_LEXICON = [
    "shocking truth",
    "you won't believe",
    "secret revealed",
    "media is hiding",
    "media hiding this",
    "doctors hate this",
    "they don't want you to know",
    "refusing to admit",
    "exposes their agenda",
    "wake up",
    "cover up",
    "mainstream media",
]


def clamp(value: int, low: int = 0, high: int = 100) -> int:
    return max(low, min(high, int(value)))


def fallback_analysis(text: str) -> AnalyzeResponse:
    lower = text.lower()
    found = [phrase for phrase in SUSPICIOUS_LEXICON if phrase in lower]
    exclamations = text.count("!")
    caps_words = len(re.findall(r"\b[A-Z]{4,}\b", text))
    sensational = len(found) * 15 + exclamations * 7 + caps_words * 5
    uncertainty = 12 if re.search(r"\b(allegedly|rumor|unconfirmed|sources say|anonymous)\b", text, re.I) else 0
    evidence = 14 if re.search(r"\b(study|report|data|court filing|official|published|linked|evidence)\b", text, re.I) else 0
    political = 22 if re.search(r"\b(left|right|liberal|conservative|government|election|party|agenda|elite)\b", text, re.I) else 8

    emotion = clamp(28 + sensational + uncertainty, high=96)
    clickbait = clamp(18 + len(found) * 14 + exclamations * 8 + (18 if re.search(r"\b(shocking|secret|revealed|believe)\b", text, re.I) else 0), high=98)
    propaganda = clamp(24 + len(found) * 13 + political + (16 if re.search(r"\b(hiding|agenda|enemy|traitor|crisis)\b", text, re.I) else 0), high=95)
    credibility = clamp(76 - round((clickbait + propaganda + emotion) / 5) + evidence, low=8, high=92)
    confidence = clamp(64 + len(found) * 5 + min(18, len(text) // 120), high=94)
    bias_score = clamp(political + len(found) * 9 + 22, high=94)

    suspicious = found or ["verify source", "check evidence"]
    extracted_claims = [
        sentence.strip()
        for sentence in re.split(r"(?<=[.!?])\s+", text)
        if len(sentence.split()) >= 5
    ][:4]
    share_risk_score = clamp(round((clickbait + propaganda + emotion + (100 - credibility)) / 4), high=98)

    return AnalyzeResponse(
        credibility_score=credibility,
        clickbait_score=clickbait,
        propaganda_score=propaganda,
        bias_score=bias_score,
        emotion_score=emotion,
        confidence=confidence,
        bias_label="Ideologically loaded" if political > 18 else "Low visible bias",
        suspicious_phrases=suspicious,
        extracted_claims=extracted_claims or ["No concrete claim extracted; verify the source before sharing."],
        share_risk_score=share_risk_score,
        explanation=(
            "This content shows signals associated with manipulative framing, including emotionally charged wording, "
            "urgency cues, or claims that require stronger evidence before being trusted."
        ),
        verification_tips=[
            "Look for primary sources, named experts, and original documents.",
            "Compare the claim with multiple reputable outlets before sharing.",
            "Separate factual claims from emotional framing and opinion language.",
        ],
        radar=[
            {"subject": "Fear", "score": emotion},
            {"subject": "Urgency", "score": clamp(clickbait - 3, high=95)},
            {"subject": "Us vs Them", "score": clamp(propaganda - 8, high=95)},
            {"subject": "Evidence Gap", "score": clamp(88 - credibility, low=20)},
            {"subject": "Authority Attack", "score": clamp(len(found) * 18 + 24, high=95)},
            {"subject": "Repetition", "score": clamp(len(text) // 22, high=90)},
        ],
        emotion_timeline=[
            {"segment": "Opening", "anger": clamp(emotion - 14), "fear": emotion, "trust": credibility},
            {"segment": "Middle", "anger": clamp(emotion - 5, high=95), "fear": clamp(emotion - 8, high=95), "trust": clamp(credibility + 4)},
            {"segment": "Close", "anger": clamp(emotion + 2, high=95), "fear": clamp(emotion - 2, high=95), "trust": clamp(credibility - 8)},
        ],
    )


async def openai_analysis(text: str) -> AnalyzeResponse | None:
    if not os.getenv("OPENAI_API_KEY"):
        return None

    client = AsyncOpenAI()
    model = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")
    response = await client.chat.completions.create(
        model=model,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": USER_PROMPT_TEMPLATE.format(text=text[:30000])},
        ],
        temperature=0.2,
    )
    content = response.choices[0].message.content or "{}"
    data: dict[str, Any] = json.loads(content)
    return AnalyzeResponse.model_validate(data)


async def analyze_text(text: str) -> AnalyzeResponse:
    try:
        ai_response = await openai_analysis(text)
        if ai_response:
            return ai_response
    except Exception:
        pass

    return fallback_analysis(text)
