"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";

interface QueryPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function QueryPagination({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: QueryPaginationProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        {prevPage && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageClick(prevPage)}
              disabled={!prevPage} // Disable if no previous page
            />
          </PaginationItem>
        )}

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNum = index + 1;

          // Add ellipsis logic if necessary
          if (totalPages > 5 && (pageNum < 3 || pageNum > totalPages - 2) || Math.abs(currentPage - pageNum) < 2) {
            return (
              <PaginationItem key={`page-button-${index}`}>
                <PaginationLink
                  isActive={currentPage === pageNum}
                  onClick={() => handlePageClick(pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          }

          // Show ellipsis
          if (pageNum === 3 && currentPage > 4) {
            return (
              <PaginationItem key={`ellipsis-left`}>
                <span className="mx-2">...</span>
              </PaginationItem>
            );
          }

          if (pageNum === totalPages - 2 && currentPage < totalPages - 3) {
            return (
              <PaginationItem key={`ellipsis-right`}>
                <span className="mx-2">...</span>
              </PaginationItem>
            );
          }

          return null; // Exclude other pages
        })}

        {nextPage && (
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageClick(nextPage)}
              disabled={!nextPage} 
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
