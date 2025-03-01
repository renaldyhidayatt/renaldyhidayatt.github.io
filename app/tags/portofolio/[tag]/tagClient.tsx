"use client";

import { portofolio } from "@/.velite";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAllPortofolioTags,
  getAllPostTags,
  sortPosts,
  sortTagsByPortofolioCount,
} from "@/lib/utils";
import { Suspense, useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSkeleton from "@/components/loadingSkeleton";
import Image from "next/image";

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {displayPosts.length > 0 ? (
                <div className="bg-white dark:bg-[#1c1d1f] rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.02] overflow-hidden">
                  {displayPosts
                    .filter((post) =>
                      post.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
                    )
                    .map((project, index) => (
                      <div
                        key={index}
                        onClick={() => router.push(`/${project.slug}`)}
                        className="bg-white dark:bg-[#1c1d1f] rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.02] overflow-hidden"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={700}
                          height={400}
                          className="w-full h-52 object-cover"
                        />
                        <div className="p-5">
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {project.title}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.tags?.map((tag, i) => (
                              <Tag name="portofolio" tag={tag} key={tag} />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-center col-span-2">
                  No portofolio found matching your search.
                </p>
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <Suspense fallback={<div>Loading pagination...</div>}>
                <QueryPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </Suspense>
            </div>
          </div>
          <div className="lg:col-span-4">
            <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
              <CardHeader>
                <CardTitle className="text-[#585a5c] dark:text-slate-200">
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 text-[#585a5c] dark:text-slate-200">
                {sortedTags.map((t) => (
                  <Tag name="blog" tag={t} key={t} count={tags[t]} />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
