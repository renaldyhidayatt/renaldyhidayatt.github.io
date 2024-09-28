"use client"

import { posts } from "@/.velite";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Suspense, useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const POSTS_PER_PAGE = 5;

export default function BlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  const sortedPosts = useMemo(() => sortPosts(posts.filter((post) => post.published)), []);
  const totalPages = useMemo(() => Math.ceil(sortedPosts.length / POSTS_PER_PAGE), [sortedPosts]);
  
  const tags = useMemo(() => getAllTags(posts), []);
  const sortedTags = useMemo(() => sortTagsByCount(tags), [tags]);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const displayPosts = useMemo(() => 
    sortedPosts.slice(
      POSTS_PER_PAGE * (currentPage - 1),
      POSTS_PER_PAGE * currentPage
    ),
    [sortedPosts, currentPage]
  );

  const filteredPosts = useMemo(() => 
    displayPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [displayPosts, searchTerm]
  );

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl text-[#585a5c] dark:text-slate-200">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground text-[#585a5c] dark:text-slate-200">
            My thoughts and experiments on everything web development—backend,
            frontend, and a touch of machine learning.
          </p>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(124,58,237)]"
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {filteredPosts.length > 0 ? (
             <ul className="flex flex-col">
              {filteredPosts.map((post) => (
                <li key={post.slug}>
                  <PostItem {...post} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts found</p>
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
            {sortedTags.map((tag) => (
              <Tag tag={tag} key={tag} count={tags[tag]} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}