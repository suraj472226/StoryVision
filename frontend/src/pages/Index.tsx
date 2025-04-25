
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import KeywordInput from '@/components/KeywordInput';
import StoryDisplay from '@/components/StoryDisplay';
import { Sparkles, BookOpen, GalleryThumbnails } from 'lucide-react';
import { generateStory, generateImage } from '@/services/apiService';
import { toast } from 'sonner'; // Fixed: Import toast directly from sonner
import { v4 as uuidv4 } from 'uuid';

interface StorySection {
  id: string;
  text: string;
  imageUrl?: string;
  isImageLoading: boolean;
}

const Index = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [storySections, setStorySections] = useState<StorySection[]>([]);

  const handleGenerateStory = async () => {
    if (keywords.length === 0) {
      toast.error("Please add at least one keyword to generate a story");
      return;
    }

    try {
      setIsGeneratingStory(true);
      setStorySections([]);

      // Generate story from keywords
      const storyResponse = await generateStory({ keywords });
      
      // Create story sections without images initially
      const newSections = storyResponse.paragraphs.map(paragraph => ({
        id: uuidv4(),
        text: paragraph,
        isImageLoading: true
      }));
      
      setStorySections(newSections);
      setIsGeneratingStory(false);
      
      // Generate images for each paragraph
      for (let i = 0; i < newSections.length; i++) {
        try {
          const imageResponse = await generateImage({ 
            prompt: extractImagePrompt(newSections[i].text, keywords) 
          });
          
          // Update the specific section with the image URL
          setStorySections(current => 
            current.map((section, index) => 
              index === i 
                ? { ...section, imageUrl: imageResponse.imageUrl, isImageLoading: false }
                : section
            )
          );
        } catch (error) {
          console.error(`Failed to generate image for paragraph ${i+1}:`, error);
          
          // Mark the image as failed but continue with others
          setStorySections(current => 
            current.map((section, index) => 
              index === i ? { ...section, isImageLoading: false } : section
            )
          );
          
          toast.error(`Failed to generate image for paragraph ${i+1}. Please try again.`);
        }
      }
      
    } catch (error) {
      console.error("Error generating story:", error);
      setIsGeneratingStory(false);
      toast.error("Failed to generate story. Please try again.");
    }
  };

  // Helper function to extract a good image prompt from paragraph text
  const extractImagePrompt = (text: string, keywords: string[]): string => {
    // In a real implementation, this would use NLP or the Gemini API
    // to extract the most relevant visual elements from the text
    // For now, we'll combine the paragraph with the keywords
    return `${text.substring(0, 100)}... ${keywords.join(', ')}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-story-purple">
          StoryDream Canvas
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto text-muted-foreground mb-10">
          Transform your ideas into captivating stories with beautiful AI-generated illustrations
        </p>
        
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
                  <Sparkles className="mr-2 text-story-amber" size={24} />
                  Enter Your Story Keywords
                </h2>
                <KeywordInput 
                  keywords={keywords}
                  setKeywords={setKeywords}
                />
              </div>
              
              <Button 
                onClick={handleGenerateStory} 
                disabled={isGeneratingStory || keywords.length === 0}
                className="w-full py-6 text-lg bg-story-amber hover:bg-story-amber/90 text-black"
              >
                <BookOpen className="mr-2" size={20} />
                {isGeneratingStory ? 'Creating Your Story...' : 'Generate My Story'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Story Display Section */}
      <section className="px-4 pb-20 max-w-4xl mx-auto">
        {(isGeneratingStory || storySections.length > 0) && (
          <>
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <GalleryThumbnails className="mr-2 text-story-purple" size={28} />
              Your Story
            </h2>
            
            <StoryDisplay 
              storySections={storySections}
              isLoading={isGeneratingStory}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default Index;
