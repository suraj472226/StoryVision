
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-story-background p-4">
      <div className="text-center max-w-md story-card">
        <BookX className="mx-auto h-16 w-16 text-story-purple mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-story-purple">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! This page appears to be missing from our storybook
        </p>
        <Button asChild className="bg-story-purple hover:bg-story-purple/90">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
