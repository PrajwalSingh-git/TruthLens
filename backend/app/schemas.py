from pydantic import BaseModel, Field, HttpUrl


class AnalyzeRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=30000)


class UrlAnalyzeRequest(BaseModel):
    url: HttpUrl


class RadarPoint(BaseModel):
    subject: str
    score: int = Field(..., ge=0, le=100)


class EmotionPoint(BaseModel):
    segment: str
    anger: int = Field(..., ge=0, le=100)
    fear: int = Field(..., ge=0, le=100)
    trust: int = Field(..., ge=0, le=100)


class AnalyzeResponse(BaseModel):
    credibility_score: int = Field(..., ge=0, le=100)
    clickbait_score: int = Field(..., ge=0, le=100)
    propaganda_score: int = Field(..., ge=0, le=100)
    bias_score: int = Field(..., ge=0, le=100)
    emotion_score: int = Field(..., ge=0, le=100)
    confidence: int = Field(..., ge=0, le=100)
    bias_label: str
    suspicious_phrases: list[str]
    extracted_claims: list[str] = []
    share_risk_score: int = Field(default=0, ge=0, le=100)
    explanation: str
    verification_tips: list[str]
    radar: list[RadarPoint]
    emotion_timeline: list[EmotionPoint]
    extracted_text: str | None = None
