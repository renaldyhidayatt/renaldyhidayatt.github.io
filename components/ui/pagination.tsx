import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

interface PaginationLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
  size?: "icon" | "default";
  disabled?: boolean;
}

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  disabled = false, 
  ...props
}: PaginationLinkProps) => {
  const linkClasses = cn(
    buttonVariants({
      variant: isActive ? "outline" : "ghost",
      size,
    }),
    isActive
      ? "bg-[rgb(124,58,237)] text-white font-bold border border-[rgb(124,58,237)] dark:bg-[rgb(124,58,237)] dark:text-white dark:border border-[rgb(124,58,237)]"
      : "bg-white text-[rgb(124,58,237)] hover:bg-[rgb(104,50,210)] dark:bg-gray-800 dark:text-[rgb(124,58,237)] dark:hover:bg-gray-700",
    className,
    disabled && "cursor-not-allowed opacity-50" 
  );

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={linkClasses}
      {...props}
      onClick={disabled ? undefined : props.onClick}
      tabIndex={disabled ? -1 : 0} 
    >
      {props.children}
    </a>
  );
};

PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => {
  if (disabled) {
    return (
      <span
        aria-label="Go to previous page"
        className={cn("gap-1 pl-2.5 cursor-not-allowed opacity-50", className)}
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </span>
    );
  }

  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  );
};

PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("gap-1 pr-2.5", className)}
    disabled={disabled}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
