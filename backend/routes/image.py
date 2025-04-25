# backend/app/routes/image.py

from fastapi import APIRouter, HTTPException
from models.story_model import ImageRequest, ImageResponse
from utils.sd_pipeline import generate_image_base64
import traceback, logging

router = APIRouter()

@router.post("/generate-image", response_model=ImageResponse)
async def generate_image_endpoint(request: ImageRequest):
    try:
        img_b64 = generate_image_base64(request.paragraph)
        return ImageResponse(image=img_b64)
    except Exception as e:
        logging.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))
