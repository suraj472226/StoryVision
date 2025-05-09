// frontend/src/services/apiService.ts

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

interface StoryResponse {
    generated_text: string;
    paragraphs: string[];
    status: string;
}

interface ImageResponse {
    image: string;
}

export const generateStory = async (keywords: string[], maxLength = 500): Promise<StoryResponse> => {
    try {
        const response = await fetch(`${API_BASE}/story/generate-story`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                keywords,
                max_length: maxLength
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Failed to generate story");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const generateImage = async (prompt: string): Promise<ImageResponse> => {
    try {
        const response = await fetch(`${API_BASE}/story/generate-image`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Failed to generate image");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};