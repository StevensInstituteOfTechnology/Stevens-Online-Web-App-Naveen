import React from 'react';
import BlogCard from './BlogCard';
import BlogPagination from './BlogPagination';

const BlogList = ({ 
  posts = [], 
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  loading = false,
  className = "" 
}) => {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-stevens-xl ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="skeleton-stevens-card border border-stevens-light-gray rounded-stevens-md overflow-hidden">
            <div className="aspect-square skeleton-stevens"></div>
            <div className="p-stevens-xl">
              <div className="skeleton-stevens-title mb-stevens-lg h-8"></div>
              <div className="skeleton-stevens-text mb-stevens-sm h-4"></div>
              <div className="skeleton-stevens-text mb-stevens-sm h-4"></div>
              <div className="skeleton-stevens-text w-3/4 mb-stevens-lg h-4"></div>
              <div className="skeleton-stevens-text mb-stevens-lg h-3 w-1/2"></div>
              <div className="skeleton-stevens-button h-12"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={`text-center py-stevens-3xl ${className}`}>
        <h3 className="font-stevens-display text-stevens-2xl text-stevens-dark-gray mb-stevens-md">
          No blog posts found
        </h3>
        <p className="text-stevens-light-gray0">
          Check back later for new content.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-stevens-lg mb-stevens-2xl">
        {posts.map((post) => (
          <BlogCard 
            key={post.id} 
            post={post}
            showCategory={true}
            showAuthor={true}
            showDate={true}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="justify-center"
        />
      )}
    </div>
  );
};

export default BlogList;
