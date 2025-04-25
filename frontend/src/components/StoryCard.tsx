
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface StoryCardProps {
  id: string;
  title: string;
  preview: string;
  coverImage: string;
  keywords: string[];
  date: string;
}

const StoryCard: React.FC<StoryCardProps> = ({
  id,
  title,
  preview,
  coverImage,
  keywords,
  date
}) => {
  return (
    <Link to={`/story/${id}`}>
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{preview}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {keywords.map(keyword => (
              <span key={keyword} className="bg-secondary text-xs px-2 py-1 rounded-full">
                {keyword}
              </span>
            ))}
          </div>
          
          <div className="text-xs text-muted-foreground">
            {new Date(date).toLocaleDateString()}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default StoryCard;
