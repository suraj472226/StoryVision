# backend/routes/story.py

from fastapi import APIRouter, HTTPException
from models.story_model import StoryRequest, CombinedStoryResponse, ImageRequest
from utils.gemini_client import generate_story
import logging, traceback
from io import BytesIO
import base64
from diffusers import StableDiffusionPipeline
import torch
import spacy

nlp = spacy.load("en_core_web_sm")
router = APIRouter()

# Stable Diffusion setup
device = "cuda" if torch.cuda.is_available() else "cpu"
stable_diffusion = StableDiffusionPipeline.from_pretrained(
    "CompVis/stable-diffusion-v1-4",
    # use_auth_token=False,
     revision="fp16",  # <== This ensures it's using the correct model weights
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32
).to(device)

def image_to_base64(image) -> str:
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode("utf-8")

@router.post("/generate-with-images", response_model=CombinedStoryResponse)
async def generate_story_with_images(request: StoryRequest):
    try:
        # Generate story text only
        story_prompt = f"Generate a {request.max_length} word story about: {', '.join(request.keywords)}"
        generated_text = generate_story(story_prompt)
        paragraphs = [p.strip() for p in generated_text.split('\n') if p.strip()]
        
        # Return story immediately with empty images
        return CombinedStoryResponse(
            generated_text=generated_text,
            paragraphs=paragraphs,
            status="success"
        )
    except Exception as e:
        logging.error(f"Story generation failed: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")


def extract_visual_prompt(text: str) -> str:
    doc = nlp(text)
    nouns = [token.text for token in doc if token.pos_ in ("NOUN", "PROPN")]
    adjectives = [token.text for token in doc if token.pos_ == "ADJ"]
    visual_elements = adjectives[:5] + nouns[:10]  # prioritize up to 15 meaningful tokens

    core_prompt = " ".join(visual_elements)
    style_prompt = "photo-realistic, hyperrealistic, highly detailed, cinematic lighting, 8k resolution, natural colors"

    full_prompt = f"{core_prompt}, {style_prompt}"
    tokens = full_prompt.split()
    if len(tokens) > 77:
        full_prompt = " ".join(tokens[:77])
    return full_prompt.strip()


@router.post("/generate-image", response_model=dict)
async def generate_single_image(request: ImageRequest):
    try:
        # Simple prompt truncation
        # image_prompt = request.prompt[:400]
        
        
        # Generate visually focused prompt from paragraph
        visual_prompt = extract_visual_prompt(request.prompt)
        logging.info(f"Generated visual prompt (≤77 tokens): {visual_prompt}")

        result = stable_diffusion(
            prompt=visual_prompt,
            num_inference_steps=25,
            guidance_scale=7.5,
            height=512,
            width=512
        )
        return {"image": image_to_base64(result.images[0])}
    except Exception as img_err:
        logging.error(f"Image generation failed: {str(img_err)}")
        raise HTTPException(status_code=500, detail="Image generation failed")