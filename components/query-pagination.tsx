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

  return (
    <Pagination className={className}>
      <PaginationContent>
        {prevPage && (
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(prevPage)} />
          </PaginationItem>
        )}

        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem
            className="hidden sm:inline-block"
            key={`page-button-${index}`}
          >
            <PaginationLink
              isActive={currentPage === index + 1}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {nextPage && (
          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(nextPage)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}