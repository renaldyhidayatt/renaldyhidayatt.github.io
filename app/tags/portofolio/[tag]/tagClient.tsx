"use client";
import { portofolio } from "@/.velite";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAllPortofolioTags,
  sortTagsByPortofolioCount,
} from "@/lib/utils";
import { Suspense, useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSkeleton from "@/components/loadingSkeleton";
import Image from "next/image";
import ProjectList from "@/components/project-item";

const POSTS_PER_PAGE = 10;

const SearchParamsHandler = ({ setCurrentPage }: any) => {
  const searchParams = useSearchParams();
  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams, setCurrentPage]);

  return null;
};

interface TagPortfolioClientProps {
  tag: string;
}

export default function TagPortfolioClient({ tag }: TagPortfolioClientProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = useMemo(() => {
    const tagFilteredPosts = portofolio.filter(
      (post) => post.tags && post.tags.includes(tag),
    );
    return tagFilteredPosts;
  }, [tag]);

  const totalPages = useMemo(
    () => Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    [filteredPosts],
  );

  const displayPosts = useMemo(
    () =>
      filteredPosts.slice(
        POSTS_PER_PAGE * (currentPage - 1),
        POSTS_PER_PAGE * currentPage,
      ),
    [filteredPosts, currentPage],
  );

  const tags = useMemo(() => getAllPortofolioTags(portofolio), []);
  const sortedTags = useMemo(() => sortTagsByPortofolioCount(tags), [tags]);

  const handlePageChange = (page: number) => {
    router.push(`/tags/portofolio/${tag}?page=${page}`);
  };

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SearchParamsHandler setCurrentPage={setCurrentPage} />
      <div className="container max-w-6xl py-10 mx-auto">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize text-[#585a5c] dark:text-slate-200">
              {tag}
            </h1>
            <p className="text-xl text-muted-foreground text-[#585a5c] dark:text-slate-200">
              My thoughts and experiments on everything web development—backend,
              frontend, and a touch of machine learning.
            </p>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <ProjectList
          currentProjects={displayPosts}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          router={router}
          sortedTags={sortedTags}
          tags={tags}
          isLoading={isLoading}
        />

      </div>
    </Suspense>
  );
}
