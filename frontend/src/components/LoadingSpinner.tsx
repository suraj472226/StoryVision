
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  color = 'text-story-purple',
  text
}) => {
  const sizeClass = {
    'sm': 'w-4 h-4 border-2',
    'md': 'w-8 h-8 border-2',
    'lg': 'w-12 h-12 border-3',
  }[size];
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClass} ${color} border-t-transparent border-solid rounded-full animate-spin`}></div>
      {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
