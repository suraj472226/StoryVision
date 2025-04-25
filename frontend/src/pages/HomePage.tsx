
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, Wand2, Image, Share2 } from 'lucide-react';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-story-purple/5 to-story-amber/5 z-0" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-playfair">
              <span className="text-story-purple">Transform Your Ideas</span>{' '}
              <br className="hidden md:block" />
              Into Visual Stories
            </h1>
            
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-muted-foreground mb-10">
              Enter a few keywords and watch as AI creates a beautiful story with custom illustrations for each scene.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild className="bg-story-amber hover:bg-story-amber/90 text-black text-lg px-8 py-6 h-auto">
                <Link to="/create">
                  <Sparkles className="mr-2" size={20} />
                  Create Your Story
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild className="border-story-purple text-story-purple hover:bg-story-purple/5 text-lg px-8 py-6 h-auto">
                <Link to="/gallery">
                  <BookOpen className="mr-2" size={20} />
                  View Gallery
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Preview Image */}
          <div className="mt-16 relative">
            <div className="rounded-xl overflow-hidden shadow-2xl mx-auto max-w-4xl">
              <img 
                src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d"
                alt="Story example with AI illustrations" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg p-4">
              <Sparkles className="text-story-amber h-8 w-8" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-playfair">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-story-purple/10 inline-flex items-center justify-center w-16 h-16 rounded-full mb-6">
                <Wand2 className="h-8 w-8 text-story-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter Keywords</h3>
              <p className="text-muted-foreground">
                Start with a few keywords like "dragon", "forest", or "princess" to inspire your unique story.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-story-purple/10 inline-flex items-center justify-center w-16 h-16 rounded-full mb-6">
                <BookOpen className="h-8 w-8 text-story-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Creates Story</h3>
              <p className="text-muted-foreground">
                Our AI generates a complete story with multiple paragraphs based on your chosen keywords.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-story-purple/10 inline-flex items-center justify-center w-16 h-16 rounded-full mb-6">
                <Image className="h-8 w-8 text-story-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Illustrations Generated</h3>
              <p className="text-muted-foreground">
                Each story paragraph gets its own AI-generated illustration that brings the narrative to life.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-story-purple/10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">Ready to Create Your Story?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Let your imagination run wild and see your story come to life with beautiful AI-generated illustrations.
          </p>
          <Button size="lg" asChild className="bg-story-amber hover:bg-story-amber/90 text-black text-lg px-8 py-6 h-auto">
            <Link to="/create">
              <Sparkles className="mr-2" size={20} />
              Get Started Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
