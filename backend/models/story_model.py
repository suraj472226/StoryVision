from pydantic import BaseModel
from typing import List

class StoryRequest(BaseModel):
    keywords: List[str]
    max_length: int = 500

class ImageRequest(BaseModel):
    prompt: str

class CombinedStoryResponse(BaseModel):
    generated_text: str
    paragraphs: List[str]
    images: List[str] = []
    status: str = "success"