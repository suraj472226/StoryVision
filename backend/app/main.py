#backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import story


app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(story.router, prefix="/api/story", tags=["story"])
# app.include_router(story.router, prefix="/api/image", tags=["image"])

@app.get("/")
def read_root():
    return {"message": "Story Generation API"}