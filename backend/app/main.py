import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import AnalyzeRequest, AnalyzeResponse, UrlAnalyzeRequest
from app.services.analyzer import analyze_text
from app.services.url_extractor import extract_article_text

load_dotenv()

app = FastAPI(
    title="TruthLens AI API",
    description="AI Fake News and Propaganda Detector API",
    version="1.0.0",
)

origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "truthlens-ai-api"}


@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest) -> AnalyzeResponse:
    return await analyze_text(request.text)


@app.post("/analyze-url", response_model=AnalyzeResponse)
async def analyze_url(request: UrlAnalyzeRequest) -> AnalyzeResponse:
    try:
        extracted = await extract_article_text(str(request.url))
    except Exception as exc:
        raise HTTPException(status_code=422, detail=f"Unable to extract article text: {exc}") from exc

    result = await analyze_text(extracted)
    result.extracted_text = extracted
    return result
