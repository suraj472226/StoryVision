# backend/app/utils/sd_pipeline.py

from diffusers import StableDiffusionPipeline
import torch, base64
from io import BytesIO

# Load once at import
device = "cuda" if torch.cuda.is_available() else "cpu"
pipeline = StableDiffusionPipeline.from_pretrained(
    "CompVis/stable-diffusion-v1-4",
    torch_dtype=torch.float16 if device=="cuda" else torch.float32
).to(device)

def generate_image_base64(prompt: str) -> str:
    # simple truncation to 400 chars
    truncated = prompt[:400]
    result = pipeline(
        prompt=truncated,
        num_inference_steps=25,
        guidance_scale=7.5,
        height=512,
        width=512
    )
    img = result.images[0]
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue()).decode("utf-8")
