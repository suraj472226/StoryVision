#backend/utils/gemini_client.py

import google.generativeai as genai
import os
from dotenv import load_dotenv
from tenacity import retry, stop_after_attempt, wait_exponential

load_dotenv()

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
def initialize_gemini():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables")
    
    genai.configure(api_key=api_key, transport="rest")
    
    try:
        return genai.GenerativeModel('gemini-1.5-flash')
    except Exception as e:
        print(f"Falling back to pro model: {str(e)}")
        return genai.GenerativeModel('gemini-1.5-pro-latest')

model = initialize_gemini()

def generate_story(prompt: str) -> str:
    if not prompt or len(prompt) > 10000:
        raise ValueError("Prompt must be between 1 and 10,000 characters")
        
    if model is None:
        return "Mock story: Once upon a time..."
    
    try:
        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.9,
                "top_p": 1,
                "max_output_tokens": 2048,
            }
        )
        return response.text
    except Exception as e:
        print(f"Generation error: {str(e)}")
        raise RuntimeError(f"Content generation failed: {str(e)}")