
import React, { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';

interface KeywordInputProps {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  maxKeywords?: number;
}

const KeywordInput: React.FC<KeywordInputProps> = ({ 
  keywords, 
  setKeywords,
  maxKeywords = 5
}) => {
  const [currentInput, setCurrentInput] = useState<string>('');
  
  const addKeyword = () => {
    const trimmedInput = currentInput.trim();
    if (
      trimmedInput && 
      !keywords.includes(trimmedInput) && 
      keywords.length < maxKeywords
    ) {
      setKeywords([...keywords, trimmedInput]);
      setCurrentInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a keyword (e.g., dragon, forest)"
          className="pr-20"
          disabled={keywords.length >= maxKeywords}
        />
        <Button
          onClick={addKeyword}
          disabled={!currentInput.trim() || keywords.length >= maxKeywords}
          className="absolute right-0 top-0 rounded-l-none h-full"
          size="sm"
        >
          <Plus size={18} /> Add
        </Button>
      </div>
      
      <div className="flex flex-wrap">
        {keywords.map((keyword, index) => (
          <div key={index} className="keyword-pill group">
            {keyword}
            <button
              onClick={() => removeKeyword(keyword)}
              className="ml-2 rounded-full hover:bg-gray-200 p-0.5 transition-colors"
              aria-label={`Remove ${keyword}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        
        {keywords.length === 0 && (
          <p className="text-muted-foreground text-sm italic">
            Add up to {maxKeywords} keywords to inspire your story
          </p>
        )}
      </div>
    </div>
  );
};

export default KeywordInput;
