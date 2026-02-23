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
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stevens-xl ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-sm overflow-hidden">
            <div className="aspect-[4/3] bg-white/10 animate-pulse rounded-sm"></div>
            <div className="pt-5">
              <div className="bg-white/10 animate-pulse mb-3 h-7 rounded"></div>
              <div className="bg-white/10 animate-pulse mb-2 h-4 w-1/2 rounded"></div>
              <div className="bg-white/10 animate-pulse mb-4 h-4 w-1/3 rounded"></div>
              <div className="bg-white/10 animate-pulse mb-2 h-4 rounded"></div>
              <div className="bg-white/10 animate-pulse mb-2 h-4 rounded"></div>
              <div className="bg-white/10 animate-pulse mb-5 h-4 w-3/4 rounded"></div>
              <div className="bg-white/10 animate-pulse h-12 border-2 border-white/10 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={`text-center py-stevens-3xl ${className}`}>
        <h3 className="font-stevens-display text-stevens-2xl text-white mb-stevens-md">
          No blog posts found
        </h3>
        <p className="text-white/60">
          Check back later for new content.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stevens-xl mb-stevens-2xl">
        {posts.map((post) => (
          <BlogCard 
            key={post.id} 
            post={post}
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
