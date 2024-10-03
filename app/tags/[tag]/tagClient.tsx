"use client";

import { posts } from "@/.velite";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Suspense, useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const POSTS_PER_PAGE = 10;

const SearchParamsHandler = ({ setCurrentPage }: any) => {
  const searchParams = useSearchParams();
  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams, setCurrentPage]);

  return null; 
};

interface TagClientProps {
  tag: string;
}

export default function TagClient({ tag }: TagClientProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = useMemo(() => {
    const tagFilteredPosts = posts.filter(
      (post) => post.published && post.tags && post.tags.includes(tag)
    );
    return sortPosts(tagFilteredPosts);
  }, [tag]);

  const totalPages = useMemo(
    () => Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    [filteredPosts]
  );

  const displayPosts = useMemo(
    () =>
      filteredPosts.slice(
        POSTS_PER_PAGE * (currentPage - 1),
        POSTS_PER_PAGE * currentPage
      ),
    [filteredPosts, currentPage]
  );

  const tags = useMemo(() => getAllTags(posts), []);
  const sortedTags = useMemo(() => sortTagsByCount(tags), [tags]);

  const handlePageChange = (page: number) => {
    router.push(`/tags/${tag}?page=${page}`);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsHandler setCurrentPage={setCurrentPage} />
      <div className="container max-w-4xl py-6 lg:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize text-[#585a5c] dark:text-slate-200">
              {tag}
            </h1>
          </div>
        </div>
        <div className="mt-8 mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-12 gap-3 mt-8">
          <div className="col-span-12 col-start-1 sm:col-span-8">
            <hr />
            {displayPosts.length > 0 ? (
              <ul className="flex flex-col">
                {displayPosts
                  .filter((post) =>
                    post.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((post) => (
                    <li key={post.slug}>
                      <PostItem {...post} />
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No posts found matching your search.</p>
            )}

            {/* Pagination */}
            <Suspense fallback={<div>Loading pagination...</div>}>
              <QueryPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                className="justify-end mt-4"
              />
            </Suspense>
          </div>
          <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
            <CardHeader>
              <CardTitle className="text-[#585a5c] dark:text-slate-200">
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 text-[#585a5c] dark:text-slate-200">
              {sortedTags.map((t) => (
                <Tag tag={t} key={t} count={tags[t]} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Suspense>
  );
}
