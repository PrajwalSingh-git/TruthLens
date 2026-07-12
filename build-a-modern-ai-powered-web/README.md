# TruthLens AI

TruthLens AI is a modern AI-powered fake news and propaganda detector. It combines a futuristic cybersecurity product UI with a FastAPI analysis service that can use OpenAI structured JSON responses or a deterministic fallback engine for demos.

## Product Focus

- Detect fake news, propaganda patterns, clickbait, emotional manipulation, and ideological bias.
- Highlight suspicious phrases and explain why they may manipulate readers.
- Support pasted headlines, articles, social posts, and URLs.
- Present results through animated credibility meters, radar charts, sentiment graphs, and a live news feed demo.
- Position the project around AI for social good, cybersecurity awareness, digital literacy, and responsible AI.
- Save local analysis history, export JSON reports, and provide fast fact-check links.

## Folder Structure

```txt
truthlens-ai/
  frontend/
    src/
      components/
      data/
      lib/
      pages/
      App.jsx
      main.jsx
      index.css
    package.json
    vite.config.js
    tailwind.config.js
  backend/
    app/
      main.py
      schemas.py
      services/
        analyzer.py
        prompts.py
        url_extractor.py
    requirements.txt
    render.yaml
  README.md
```

## Frontend

Tech: React, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide React.

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` if the backend is not running at `http://localhost:8000`.

```bash
VITE_API_URL=https://your-render-api.onrender.com npm run build
```

## Backend

Tech: FastAPI, Python, optional OpenAI API.

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Optional environment variables:

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
ALLOWED_ORIGINS=http://localhost:5173,https://your-vercel-app.vercel.app
```

If `OPENAI_API_KEY` is missing, the API uses a deterministic hackathon-safe fallback analyzer.

## API

### `POST /analyze`

Request:

```json
{
  "text": "Secret revealed: doctors hate this shocking truth about vaccines..."
}
```

Response:

```json
{
  "credibility_score": 38,
  "clickbait_score": 88,
  "propaganda_score": 76,
  "bias_score": 62,
  "emotion_score": 91,
  "confidence": 84,
  "bias_label": "Ideologically loaded",
  "suspicious_phrases": ["secret revealed", "doctors hate this", "shocking truth"],
  "explanation": "This content uses sensational phrasing, unsupported authority attacks, and urgency cues that may pressure readers before they verify evidence.",
  "verification_tips": [
    "Check whether named sources and primary documents are linked.",
    "Compare the claim against multiple reputable outlets.",
    "Look for emotionally loaded wording that substitutes for evidence."
  ],
  "radar": [
    { "subject": "Fear", "score": 86 },
    { "subject": "Urgency", "score": 78 }
  ],
  "emotion_timeline": [
    { "segment": "Opening", "anger": 70, "fear": 82, "trust": 22 }
  ]
}
```

### `POST /analyze-url`

Request:

```json
{
  "url": "https://example.com/article"
}
```

The endpoint extracts readable text from a URL, then returns the same analysis schema.

## AI Prompt Engineering

The backend prompt instructs the model to act as a misinformation and propaganda analyst, score credibility, identify clickbait and manipulative patterns, estimate bias, return suspicious phrases, and produce strict JSON only. See `backend/app/services/prompts.py`.

## Deployment

### Vercel Frontend

1. Import the repository in Vercel.
2. Set root directory to `frontend`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add `VITE_API_URL` with the Render backend URL.
6. `frontend/vercel.json` includes SPA rewrites so `/analyze`, `/about`, `/extension`, and `/team` work on refresh.

### Render Backend

1. Create a new Web Service.
2. Set root directory to `backend`.
3. Build command: `pip install -r requirements.txt`.
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
5. Add `OPENAI_API_KEY`, `OPENAI_MODEL`, and `ALLOWED_ORIGINS`.
