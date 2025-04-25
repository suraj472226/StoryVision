import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import KeywordInput from '@/components/KeywordInput';
import StoryDisplay from '@/components/StoryDisplay';
import { Sparkles, BookOpen, GalleryThumbnails } from 'lucide-react';
import { generateStory, generateImage } from '@/services/apiService';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import LoadingSpinner from '@/components/LoadingSpinner';

interface StorySection {
  id: string;
  text: string;
  imageUrl?: string;
  isImageLoading: boolean;
}

const CreateStoryPage = () => {
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

      // First generate story text only
      const { paragraphs } = await generateStory(keywords);
      
      // Create initial story sections with loading states
      const newSections = paragraphs.map((paragraph: string) => ({
        id: uuidv4(),
        text: paragraph,
        imageUrl: undefined,
        isImageLoading: true
      }));
      
      setStorySections(newSections);
      
      // Generate images for each paragraph asynchronously
      newSections.forEach(async (section, index) => {
        try {
          const { image } = await generateImage(paragraphs[index]);
          setStorySections(prev => 
            prev.map(s => 
              s.id === section.id 
                ? { ...s, imageUrl: `data:image/png;base64,${image}`, isImageLoading: false } 
                : s
            )
          );
        } catch (error) {
          console.error("Image generation failed for paragraph", index);
          setStorySections(prev => 
            prev.map(s => 
              s.id === section.id 
                ? { ...s, imageUrl: undefined, isImageLoading: false } 
                : s
            )
          );
        }
      });

    } catch (error) {
      console.error("Error generating story:", error);
      toast.error("Failed to generate story. Please try again.");
    } finally {
      setIsGeneratingStory(false);
    }
  };

  const handleCopyStory = () => {
    const fullStory = storySections.map(s => s.text).join('\n\n');
    navigator.clipboard.writeText(fullStory);
    toast.success("Story copied to clipboard!");
  };

  const handleDownloadStory = () => {
    const fullStory = storySections.map(s => s.text).join('\n\n');
    const blob = new Blob([fullStory], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-generated-story.txt';
    a.click();
  };

  return (
    <div className="min-h-screen">
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-story-purple">
            Create Your Story
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Enter a few keywords below and let AI create a beautiful story.
          </p>
        </div>
      </section>

      <section className="py-8 px-4">
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
      
      <section className="px-4 pb-20 max-w-4xl mx-auto">
        {(isGeneratingStory || storySections.length > 0) && (
          <>
            <div className="flex justify-between mb-4">
              <Button 
                onClick={handleCopyStory} 
                disabled={storySections.length === 0}
                className="bg-story-purple text-white"
              >
                Copy Story
              </Button>
              <Button 
                onClick={handleDownloadStory} 
                disabled={storySections.length === 0}
                className="bg-story-purple text-white"
              >
                Download Story
              </Button>
            </div>
        
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

export default CreateStoryPage;