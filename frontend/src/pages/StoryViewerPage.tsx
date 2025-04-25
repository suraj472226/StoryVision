
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ChevronLeft, Download, Share2, Heart, BookOpen } from 'lucide-react';

// Mock data for story details
const mockStoryDetails = {
  '1': {
    id: '1',
    title: 'The Dragon of Emerald Forest',
    keywords: ['dragon', 'forest', 'princess'],
    date: '2023-05-15',
    sections: [
      {
        id: 'sec1',
        text: "Once upon a time, in a lush emerald forest teeming with ancient trees and magical creatures, there lived a wise old dragon named Zephyr. His scales shimmered with an iridescent blue glow that illuminated the darkness of the night, and his eyes held the wisdom of a thousand years.",
        imageUrl: "https://images.unsplash.com/photo-1518877593221-1f28583780b4"
      },
      {
        id: 'sec2',
        text: "In the heart of this enchanted forest stood a magnificent castle, home to a brave and kind princess named Aurelia. She was known throughout the realm for her courage and compassion, often venturing beyond the castle walls to help those in need.",
        imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
      },
      {
        id: 'sec3',
        text: "One day, as Princess Aurelia was exploring the edges of the forest, she heard a haunting melody echoing through the trees. Following the sound, she discovered Zephyr the dragon, playing a golden harp with his delicate claws. Instead of fear, she felt an immediate connection with the magnificent creature.",
        imageUrl: "https://images.unsplash.com/photo-1574169208507-84376144848b"
      },
      {
        id: 'sec4',
        text: "Together, they formed an unlikely friendship that would soon be tested. Dark clouds began to gather over the kingdom as an ancient evil awoke from its slumber. The princess and her dragon friend would need to combine their courage and wisdom to face what was coming.",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
      },
      {
        id: 'sec5',
        text: "After many adventures and trials, Zephyr and Princess Aurelia triumphed over the darkness. Their friendship had saved the kingdom, and they became legends told in stories for generations to come. The forest flourished once more, more magical and vibrant than ever before.",
        imageUrl: "https://images.unsplash.com/photo-1578353022142-09264fd84689"
      }
    ]
  },
};

const StoryViewerPage = () => {
  const { id } = useParams<{id: string}>();
  const [story, setStory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch from an API
    setTimeout(() => {
      if (id && mockStoryDetails[id as keyof typeof mockStoryDetails]) {
        setStory(mockStoryDetails[id as keyof typeof mockStoryDetails]);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Loading story...</p>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Story Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The story you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/gallery">Back to Gallery</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Story Header */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/gallery" className="inline-flex items-center text-muted-foreground hover:text-story-purple mb-6">
            <ChevronLeft size={20} className="mr-1" />
            Back to Gallery
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-story-purple">
            {story.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {story.keywords.map((keyword: string) => (
              <span key={keyword} className="bg-secondary text-xs px-3 py-1 rounded-full">
                {keyword}
              </span>
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground mb-6">
            Created on {new Date(story.date).toLocaleDateString()}
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={18} />
              Download PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 size={18} />
              Share Story
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Heart size={18} />
              Save to Favorites
            </Button>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-8 px-4 max-w-4xl mx-auto">
        <Card className="p-8 shadow-lg">
          {story.sections.map((section: any, index: number) => (
            <div 
              key={section.id} 
              className={`grid md:grid-cols-2 gap-8 items-center ${index > 0 ? 'mt-16 pt-16 border-t' : ''}`}
            >
              <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <p className="text-lg leading-relaxed">
                  {section.text}
                </p>
              </div>
              
              <div className={`order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={section.imageUrl} 
                    alt={`Illustration for section ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
};

export default StoryViewerPage;
