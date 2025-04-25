
# StoryDream Backend

This is a placeholder for the future Python FastAPI backend.

## Planned Endpoints
- `/generate-story`: Accepts keywords, returns full story from Gemini
- `/generate-image`: Accepts paragraph, returns image (base64 or filepath)
- Utility logic to extract prompts from the story (e.g., noun phrase extraction)
- Endpoint `/gallery` (optional): Return list of previously saved/generated stories
- All routes should have logging and error handling

## Tech Stack
- Python FastAPI
- Gemini API
- Stable Diffusion
