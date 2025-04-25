
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-story-purple" />
              <span className="ml-2 text-xl font-bold font-playfair text-story-purple">StoryDream</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Create beautiful AI-generated stories with custom illustrations in seconds.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-story-purple transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-story-purple transition-colors">
                <span className="sr-only">GitHub</span>
                <Github size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-story-purple transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-story-purple">Pages</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-story-purple">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-sm text-muted-foreground hover:text-story-purple">
                  Create Story
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-muted-foreground hover:text-story-purple">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-story-purple">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-story-purple">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-story-purple">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-story-purple">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-story-purple">Technologies</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-story-purple">
                  React
                </a>
              </li>
              <li>
                <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-story-purple">
                  TailwindCSS
                </a>
              </li>
              <li>
                <a href="https://cloud.google.com/vertex-ai/docs/generative-ai/multimodal/overview" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-story-purple">
                  Gemini API
                </a>
              </li>
              <li>
                <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-story-purple">
                  FastAPI
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8">
          <p className="text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} StoryDream. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
