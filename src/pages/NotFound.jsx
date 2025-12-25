import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stevens-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        

        {/* 404 Error Code */}
        <h1 className="font-stevens-display text-9xl font-bold text-stevens-red mb-4">
          404
        </h1>

        {/* Error Message */}
        <h2 className="font-stevens-display text-3xl md:text-4xl font-bold text-stevens-dark-gray mb-4">
          Page Not Found
        </h2>
        
        <p className="text-stevens-xl text-stevens-dark-gray mb-8 max-w-lg mx-auto leading-relaxed">
          We couldn't find the page you're looking for. The page may have been moved, deleted, or the URL might be incorrect.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/">
            <Button className="btn-stevens-red text-stevens-lg flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
          
          <a 
            href="https://search.stevens.edu/s/search.html?collection=21772~sp-search"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              variant="outline" 
              className="btn-stevens-outline text-stevens-lg flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search Stevens
            </Button>
          </a>
        </div>

        
      </div>
    </div>
  );
}

