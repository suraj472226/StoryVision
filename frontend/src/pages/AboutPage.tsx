
import React from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles, BookOpen, Image, Code, PenTool, Smile } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* About Header */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-story-purple">
            About StoryDream Canvas
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Learn more about how our platform works and the technology behind it.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-playfair">Our Mission</h2>
          <p className="text-lg">
            StoryDream Canvas was created to empower everyone to become a storyteller. 
            By combining the power of AI text generation with AI image creation, we've built 
            a platform that enables users to create beautiful, illustrated stories in seconds 
            rather than months, democratizing the creative process for all.
          </p>
        </div>
        
        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-playfair text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="bg-story-purple/10 inline-flex items-center justify-center w-14 h-14 rounded-full mb-4">
                <PenTool className="h-7 w-7 text-story-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Input Keywords</h3>
              <p className="text-muted-foreground">
                Enter a few keywords that inspire the theme and elements for your story.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="bg-story-purple/10 inline-flex items-center justify-center w-14 h-14 rounded-full mb-4">
                <BookOpen className="h-7 w-7 text-story-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. AI Story Generation</h3>
              <p className="text-muted-foreground">
                Our AI creates a complete story with multiple paragraphs based on your keywords.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="bg-story-purple/10 inline-flex items-center justify-center w-14 h-14 rounded-full mb-4">
                <Image className="h-7 w-7 text-story-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. AI Image Creation</h3>
              <p className="text-muted-foreground">
                For each paragraph, an AI-generated illustration is created to bring the story to life.
              </p>
            </Card>
          </div>
        </div>
        
        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-playfair text-center">Our Technology</h2>
          
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Sparkles className="mr-2 text-story-amber" size={20} />
                  AI Text Generation
                </h3>
                <p className="text-muted-foreground mb-4">
                  We use the Gemini API to generate creative, coherent, and engaging stories
                  based on user keywords. This state-of-the-art large language model can craft
                  narratives across various genres and styles.
                </p>
                
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Image className="mr-2 text-story-amber" size={20} />
                  AI Image Generation
                </h3>
                <p className="text-muted-foreground">
                  Our application leverages Stable Diffusion, a powerful image generation model,
                  to create custom illustrations for each paragraph of your story, ensuring
                  visual consistency and relevance to the narrative.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Code className="mr-2 text-story-amber" size={20} />
                  Technical Infrastructure
                </h3>
                <p className="text-muted-foreground mb-2">
                  The front-end is built with React and TailwindCSS for a responsive, modern user interface.
                </p>
                <p className="text-muted-foreground mb-2">
                  Our back-end utilizes Python FastAPI for efficient and reliable API endpoints.
                </p>
                <p className="text-muted-foreground">
                  Advanced natural language processing extracts effective image prompts from story text.
                </p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Team Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-playfair text-center">Our Team</h2>
          <p className="text-center text-lg mb-8">
            StoryDream Canvas was created by a team of developers, designers, and storytelling enthusiasts
            who believe in the power of AI to enhance human creativity, not replace it.
          </p>
          
          <div className="flex justify-center">
            <Smile className="h-20 w-20 text-story-amber" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
