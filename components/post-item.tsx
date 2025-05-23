import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Tag } from "./tag";
import { Skeleton } from "@/components/ui/skeleton";

interface PostItemProps {
  slug?: string;
  title?: string;
  description?: string;
  date?: string;
  tags?: Array<string>;
  isLoading?: boolean;
}
export function PostItem({
  slug,
  title,
  description,
  date,
  tags,
  isLoading,
}: PostItemProps) {
  if (isLoading) {
    return (
      <article className="flex flex-col gap-2 border-border border-b py-3">
        <Skeleton className="h-7 w-2/3" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-2 border-border border-b py-3 text-[#585a5c] dark:text-slate-200">
      <div>
        <h2 className="text-2xl font-bold">
          <Link href={"/" + slug}>{title}</Link>
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag) => <Tag name="blog" tag={tag} key={tag} />)}
      </div>
      <div className="max-w-none text-muted-foreground">{description}</div>
      <div className="flex justify-between items-center">
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date!)}</time>
          </dd>
        </dl>
        <Link
          href={"/" + slug}
          className={cn(buttonVariants({ variant: "link" }), "py-0")}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
