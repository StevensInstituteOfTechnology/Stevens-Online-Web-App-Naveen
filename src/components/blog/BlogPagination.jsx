import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const BlogPagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  className = "" 
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-6 py-3 text-base font-medium border transition-all duration-200 ${
          currentPage === 1 
            ? 'cursor-not-allowed opacity-40 border-white/20 text-white/40' 
            : 'border-white/30 text-white hover:border-stevens-red hover:bg-stevens-red hover:text-white'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={index} className="px-3 py-2 text-white/50">
                <MoreHorizontal className="w-5 h-5" />
              </span>
            );
          }

          const isCurrentPage = page === currentPage;
          
          return (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`min-w-[48px] px-4 py-3 text-base font-medium border transition-all duration-200 ${
                isCurrentPage 
                  ? 'bg-stevens-red border-stevens-red text-white' 
                  : 'border-white/30 text-white hover:border-stevens-red hover:bg-stevens-red hover:text-white'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 px-6 py-3 text-base font-medium border transition-all duration-200 ${
          currentPage === totalPages 
            ? 'cursor-not-allowed opacity-40 border-white/20 text-white/40' 
            : 'border-white/30 text-white hover:border-stevens-red hover:bg-stevens-red hover:text-white'
        }`}
      >
        Next
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default BlogPagination;
