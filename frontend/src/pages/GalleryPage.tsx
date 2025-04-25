
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Filter } from 'lucide-react';

// Mock data for gallery stories
const mockStories = [
  {
    id: '1',
    title: 'The Dragon of Emerald Forest',
    preview: 'Once upon a time, in a lush emerald forest teeming with ancient trees and magical creatures...',
    keywords: ['dragon', 'forest', 'princess'],
    coverImage: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4',
    date: '2023-05-15'
  },
  {
    id: '2',
    title: 'Journey to the Stars',
    preview: 'The spaceship hummed with energy as Captain Olivia prepared for the most daring mission of her career...',
    keywords: ['space', 'adventure', 'aliens'],
    coverImage: 'https://images.unsplash.com/photo-1574169208507-84376144848b',
    date: '2023-06-02'
  },
  {
    id: '3',
    title: 'The Enchanted Castle',
    preview: 'Hidden behind misty mountains lay a castle of immense beauty, its spires reaching toward the heavens...',
    keywords: ['castle', 'magic', 'knight'],
    coverImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    date: '2023-07-10'
  },
  {
    id: '4',
    title: 'Pirates of the Crystal Sea',
    preview: 'Captain Blackbeard stood at the helm of his ship, gazing out at the crystal blue waters that stretched endlessly...',
    keywords: ['pirates', 'treasure', 'island'],
    coverImage: 'https://images.unsplash.com/photo-1578353022142-09264fd84689',
    date: '2023-08-22'
  },
  {
    id: '5',
    title: 'The Time Traveler\'s Dilemma',
    preview: 'Dr. Marcus checked his watch one last time before activating the time machine. This would change everything...',
    keywords: ['time travel', 'science', 'future'],
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    date: '2023-09-05'
  },
];

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter stories based on search term
  const filteredStories = mockStories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    story.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      {/* Gallery Header */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-story-purple">
            Story Gallery
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Browse through a collection of AI-generated stories with illustrations
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-lg mx-auto relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                placeholder="Search by title or keywords..."
                className="pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 px-4 max-w-6xl mx-auto">
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <Link key={story.id} to={`/story/${story.id}`}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={story.coverImage} 
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{story.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{story.preview}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {story.keywords.map(keyword => (
                        <span key={keyword} className="bg-secondary text-xs px-2 py-1 rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {new Date(story.date).toLocaleDateString()}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-16 w-16 text-muted-foreground/40 mb-4" />
            <h3 className="text-xl font-medium mb-2">No stories found</h3>
            <p className="text-muted-foreground mb-6">
              Try different search terms or create a new story.
            </p>
            <Button asChild>
              <Link to="/create">Create New Story</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default GalleryPage;
