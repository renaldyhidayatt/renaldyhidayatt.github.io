"use client";

import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { slug } from "github-slugger";

interface TagPageClientProps {
  title: string;
  tag: string;
  displayPosts: any[]; 
  totalPages: number;
  currentPage: number;
  sortedTags: string[];
  tags: Record<string, number>;
}

export default function TagPageClient({
  title,
  tag,
  displayPosts,
  totalPages,
  currentPage: initialCurrentPage,
  sortedTags,
  tags,
}: TagPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(displayPosts);

  useEffect(() => {
    const page = searchParams.get("page");
    setCurrentPage(page ? parseInt(page, 10) : 1);
  }, [searchParams]);

  useEffect(() => {
    const filtered = displayPosts.filter(
      (post) =>
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || // Optional chaining for title
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) // Optional chaining for excerpt
    );
    setFilteredPosts(filtered);
  }, [searchTerm, displayPosts]);
  
  const handlePageChange = (page: number) => {
    router.push(`/tags/${tag}?page=${page}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize text-[#585a5c] dark:text-slate-200">
            {title}
          </h1>
        </div>
      </div>
      <div className="mt-8 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
          className="mt-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
            <p>No posts found matching your search.</p>
          )}
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
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map((t) => (
              <Tag tag={t} key={t} count={tags[t]} current={slug(t) === tag} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
