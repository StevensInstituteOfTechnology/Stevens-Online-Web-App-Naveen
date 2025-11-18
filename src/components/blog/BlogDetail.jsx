import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock, Facebook, Twitter, Linkedin } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { createPageUrl } from '@/utils';
import { getContentImageProps, getThumbnailImageProps } from '@/utils/responsiveImage';
import { BOOKING_URLS } from '@/config/constants';

// Structured Content Renderer Component
const StructuredContentRenderer = ({ content }) => {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className="space-y-stevens-lg">
      {content.map((item, index) => {
        switch (item.type) {
          case 'paragraph':
            return (
              <p key={index} className="mb-stevens-lg leading-relaxed text-stevens-lg">
                {renderTextWithFormatting(item.text, item.bold, item.links)}
              </p>
            );
          
          case 'heading':
            const HeadingTag = `h${item.level}`;
            const headingClasses = {
              1: 'text-stevens-hero font-stevens-display text-stevens-primary mb-stevens-xl',
              2: 'text-stevens-3xl font-stevens-display text-stevens-primary mb-stevens-lg mt-stevens-2xl',
              3: 'text-stevens-2xl font-stevens-display text-stevens-primary mb-stevens-md mt-stevens-xl',
              4: 'text-stevens-xl font-stevens-display text-stevens-primary mb-stevens-md mt-stevens-lg',
              5: 'text-stevens-lg font-stevens-display text-stevens-primary mb-stevens-sm mt-stevens-md',
              6: 'text-stevens-md font-stevens-display text-stevens-primary mb-stevens-sm mt-stevens-md'
            };
            
            return (
              <HeadingTag 
                key={index} 
                className={headingClasses[item.level] || headingClasses[2]}
              >
                {item.text}
              </HeadingTag>
            );
          
          case 'list':
            const ListTag = item.style === 'ordered' ? 'ol' : 'ul';
            const listClasses = item.style === 'ordered' 
              ? 'list-decimal list-inside space-y-stevens-sm mb-stevens-lg' 
              : 'list-disc list-inside space-y-stevens-sm mb-stevens-lg';
            
            return (
              <ListTag key={index} className={listClasses}>
                {item.items.map((listItem, itemIndex) => (
                  <li key={itemIndex} className="leading-relaxed text-stevens-lg">
                    {renderTextWithFormatting(listItem.text, listItem.bold, listItem.links)}
                  </li>
                ))}
              </ListTag>
            );
          
          default:
            return null;
        }
      })}
    </div>
  );
};

// Helper function to render text with formatting
const renderTextWithFormatting = (text, bold = [], links = []) => {
  if (!text) return '';
  
  let processedText = text;
  
  // Handle bold text first
  if (bold && bold.length > 0) {
    bold.forEach(boldText => {
      // Escape special regex characters in boldText
      const escapedBoldText = boldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\*\\*${escapedBoldText}\\*\\*`, 'g');
      processedText = processedText.replace(regex, `<strong>${boldText}</strong>`);
    });
  }
  
  // Handle links - replace the plain text with linked text
  if (links && links.length > 0) {
    links.forEach(link => {
      // Check for special markers and replace with actual URLs
      let actualUrl = link.url;
      
      // Replace SCHEDULE_CALL marker with actual booking URL
      if (link.url === 'SCHEDULE_CALL' || link.url === '__SCHEDULE_CALL__') {
        actualUrl = BOOKING_URLS.SCHEDULE_CALL;
      }
      
      // Escape special regex characters in link text
      const escapedLinkText = link.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedLinkText, 'g');
      processedText = processedText.replace(regex, `<a href="${actualUrl}" target="_blank" rel="noopener noreferrer" class="text-stevens-primary hover:text-stevens-maroon underline">${link.text}</a>`);
    });
  }
  
  return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
};

const BlogDetail = ({ 
  post, 
  relatedPosts = [],
  onBack,
  className = "" 
}) => {
  const {
    id,
    title,
    subtitle,
    content,
    featured_image_url,
    author: authorData,
    author_bio,
    author_image,
    created_date,
    updated_date,
    category,
    tags = [],
    read_time,
    social_sharing = true
  } = post;

  // Handle author as either string or object
  const author = typeof authorData === 'string' ? authorData : (authorData?.name || 'Unknown Author');
  const authorBio = author_bio || authorData?.bio || '';
  const authorImage = author_image || authorData?.image || '';

  // Ensure all values are strings to prevent React rendering errors
  const safeAuthor = String(author || 'Unknown Author');
  const safeAuthorBio = String(authorBio || '');
  const safeTitle = String(title || 'Untitled');
  const safeSubtitle = subtitle ? String(subtitle) : '';
  const safeContent = String(content || '');

  return (
    <article className={`max-w-4xl mx-auto ${className}`}>
      

      {/* Article Header */}
      <header className="mb-stevens-2xl">
        
        
        <h1 className="font-stevens-display text-stevens-xl md:text-stevens-hero lg:text-stevens-6xl text-stevens-primary mb-stevens-lg leading-tight">
          {safeTitle}
        </h1>

        {/* Category Label */}
        {category && (
          <div className="mb-stevens-lg">
            <Link
              to={`/blog/?category=${encodeURIComponent(category)}`}
              className="text-stevens-primary hover:text-stevens-maroon-dark underline hover:no-underline transition-colors duration-300 font-medium"
            >
              {category}
            </Link>
          </div>
        )}
        

        {/* Article Meta */}
        <div className="flex flex-wrap items-center justify-between gap-stevens-lg text-stevens-gray-600 mb-stevens-lg">
          <div className="flex flex-wrap items-center gap-stevens-lg">
            {safeAuthor && (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {safeAuthor}
                </span>
              </div>
            )}
            
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(created_date), 'MMMM d, yyyy')}
            </span>
            
            {read_time && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {read_time} min read
              </span>
            )}
          </div>

          {/* Social Media Buttons */}
          <div className="flex items-center gap-stevens-sm">
            <a
              href="https://www.facebook.com/Stevens1870"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-stevens-primary hover:bg-stevens-maroon-dark text-stevens-white rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Follow Stevens on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/followstevens"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-stevens-primary hover:bg-stevens-maroon-dark text-stevens-white rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Follow Stevens on Twitter/X"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/school/stevens-institute-of-technology/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-stevens-primary hover:bg-stevens-maroon-dark text-stevens-white rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Connect with Stevens on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {featured_image_url && (
        <div className="mb-stevens-2xl">
          <img 
            {...getContentImageProps(featured_image_url, '1200px')}
            alt={title}
            className="w-full h-96 object-cover rounded-stevens-md shadow-stevens-md"
            loading="lazy"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-xl max-w-none text-stevens-gray-700 mb-stevens-2xl text-stevens-lg leading-relaxed">
        {post.content && Array.isArray(post.content) ? (
          <StructuredContentRenderer content={post.content} />
        ) : (
          <ReactMarkdown>{safeContent}</ReactMarkdown>
        )}
      </div>

      

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-stevens-gray-200 pt-stevens-2xl">
          <h3 className="font-stevens-display text-stevens-2xl text-stevens-primary mb-stevens-lg">
            Related Articles
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-stevens-lg">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost.id} className="border border-stevens-gray-200 rounded-stevens-md p-stevens-md hover:shadow-stevens-md transition-shadow">
                <img 
                  {...getThumbnailImageProps(relatedPost.featured_image_url, '400px')}
                  alt={relatedPost.title}
                  className="w-full h-32 object-cover rounded-stevens-sm mb-stevens-md"
                  loading="lazy"
                />
                <h4 className="font-stevens-display text-stevens-lg text-stevens-primary mb-stevens-sm line-clamp-2">
                  {relatedPost.title}
                </h4>
                <p className="text-stevens-sm text-stevens-gray-600 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
                       <Link
                         to={`/blog/${relatedPost.id}/`}
                         className="text-stevens-primary text-stevens-sm font-medium hover:underline mt-stevens-sm inline-block"
                       >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Updated Date */}
      {updated_date && updated_date !== created_date && (
        <div className="text-stevens-sm text-stevens-gray-500 mt-stevens-2xl pt-stevens-lg border-t border-stevens-gray-200">
          Last updated: {format(new Date(updated_date), 'MMMM d, yyyy')}
        </div>
      )}
    </article>
  );
};

export default BlogDetail;
