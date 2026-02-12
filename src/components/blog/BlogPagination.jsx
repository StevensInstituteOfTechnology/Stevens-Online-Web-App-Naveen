import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const BlogPagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  className = "" 
}) => {
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
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
    <div className={`flex items-center justify-center gap-stevens-sm ${className}`}>
      {/* Previous Button */}
      <Button
        variant="outline-dark"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 ${
          currentPage === 1 
            ? 'cursor-not-allowed opacity-50 hover:bg-transparent hover:border-stevens-light-gray hover:text-stevens-light-gray0' 
            : 'hover:border-stevens-red hover:text-stevens-white'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-stevens-xs">
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={index} className="px-stevens-sm py-stevens-xs text-stevens-light-gray0">
                <MoreHorizontal className="w-4 h-4" />
              </span>
            );
          }

          const isCurrentPage = page === currentPage;
          
          return (
            <Button
              key={index}
              variant={isCurrentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={`min-w-[40px] ${
                isCurrentPage 
                  ? 'bg-stevens-red text-stevens-white hover:bg-stevens-dark-gray' 
                  : 'hover:border-stevens-red hover:text-stevens-white'
              }`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="outline-dark"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 ${
          currentPage === totalPages 
            ? 'cursor-not-allowed opacity-50 hover:bg-transparent hover:border-stevens-light-gray hover:text-stevens-light-gray0' 
            : 'hover:border-stevens-red hover:text-stevens-white'
        }`}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default BlogPagination;
