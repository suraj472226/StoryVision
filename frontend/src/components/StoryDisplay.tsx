import React from 'react';
import ImageCard from './ImageCard';
import LoadingSpinner from './LoadingSpinner';

interface StorySection {
  id: string;
  text: string;
  imageUrl?: string;
  isImageLoading: boolean;
}

interface StoryDisplayProps {
  storySections: StorySection[];
  isLoading: boolean;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ storySections, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground animate-pulse">
          Crafting your story...
        </p>
      </div>
    );
  }

  if (storySections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-12 my-8">
      {storySections.map((section, index) => (
        <div 
          key={section.id} 
          className={`grid md:grid-cols-2 gap-8 items-center story-card animate-fade-in`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="order-2 md:order-1">
            <p className="text-lg leading-relaxed font-inter">
              {section.text}
            </p>
          </div>
          
          <div className="order-1 md:order-2 page-wrapper">
            <div className={`page ${index > 0 ? 'turned' : ''}`}>
              <ImageCard 
                imageUrl={section.imageUrl} 
                alt={`Illustration for paragraph ${index + 1}`}
                isLoading={section.isImageLoading} 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryDisplay;