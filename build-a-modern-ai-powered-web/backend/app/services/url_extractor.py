import re

import httpx
from bs4 import BeautifulSoup
from readability import Document


async def extract_article_text(url: str) -> str:
    async with httpx.AsyncClient(timeout=12, follow_redirects=True) as client:
        response = await client.get(
            url,
            headers={
                "User-Agent": "TruthLensAI/1.0 (+https://truthlens.ai; hackathon demo)"
            },
        )
        response.raise_for_status()

    document = Document(response.text)
    title = document.short_title()
    html = document.summary()
    soup = BeautifulSoup(html, "html.parser")
    text = soup.get_text(" ", strip=True)
    text = re.sub(r"\s+", " ", text).strip()

    if title and title not in text[:250]:
        text = f"{title}. {text}"

    return text[:30000]
