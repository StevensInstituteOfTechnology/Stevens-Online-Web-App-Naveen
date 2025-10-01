import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { createPageUrl } from '@/utils';

const BlogCard = ({ 
  post, 
  showCategory = true, 
  showAuthor = true, 
  showDate = true,
  className = "" 
}) => {
  const {
    id,
    title,
    excerpt,
    featured_image_url,
    author: authorData,
    created_date,
    category,
    read_time,
    tags = []
  } = post;

  // Handle author as either string or object
  const author = typeof authorData === 'string' ? authorData : (authorData?.name || 'Unknown Author');
  
  // Ensure all values are strings to prevent React rendering errors
  const safeAuthor = String(author || 'Unknown Author');
  const safeTitle = String(title || 'Untitled');
  const safeExcerpt = String(excerpt || '');

  return (
    <Link to={`/blog/${id}/`} className="block">
      <Card className={`flex flex-col hover:shadow-stevens-xl transition-all duration-300 hover:-translate-y-2 border border-stevens-gray-200 hover:border-stevens-primary/20 cursor-pointer ${className}`}>
        <CardHeader className="p-0">
          <div className="relative overflow-hidden">
            {/* Optimized image container - 3/5 of square size */}
            <div className="aspect-[5/4] w-full">
              <img 
                src={featured_image_url || '/assets/blog/placeholder-blog.jpg'} 
                alt={safeTitle}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow p-stevens-xl">
          <CardTitle className="font-stevens-display text-3xl text-stevens-primary mb-stevens-lg mt-stevens-lg line-clamp-2 leading-tight">
            {safeTitle}
          </CardTitle>
          
          <p className="text-stevens-gray-600 line-clamp-3 mb-stevens-lg text-stevens-base leading-relaxed">
            {safeExcerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-stevens-md text-stevens-sm text-stevens-gray-500 mb-stevens-lg">
            
            {showDate && created_date && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {format(new Date(created_date), 'MMM d, yyyy')}
              </span>
            )}
            {read_time && (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {read_time} min read
              </span>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-stevens-xl pt-0">
          <div className="w-full border-2 border-stevens-primary text-stevens-primary hover:bg-stevens-primary hover:text-stevens-white font-medium py-stevens-md transition-all duration-300 group flex items-center justify-center">
            Read More 
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
