import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import LoadingSpinner from './LoadingSpinner';

interface ImageCardProps {
  imageUrl?: string;
  alt: string;
  isLoading: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ 
  imageUrl,
  alt,
  isLoading
}) => {
  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="p-0 relative aspect-square flex items-center justify-center bg-muted/30">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner text="Generating image..." />
          </div>
        ) : imageUrl ? (
          <img 
            src={imageUrl} 
            alt={alt} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/image-fallback.svg";
              e.currentTarget.alt = "Image generation failed";
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 text-muted-foreground">
            <p className="text-sm text-center px-4">No image generated</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageCard;