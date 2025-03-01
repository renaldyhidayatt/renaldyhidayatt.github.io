"use client";

import { portofolio } from "@/.velite";
import Image from "next/image";
import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QueryPagination } from "@/components/query-pagination";
import LoadingSkeleton from "@/components/loadingSkeleton";
import { getAllPortofolioTags, sortTagsByPortofolioCount } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/tag";

const ITEMS_PER_PAGE = 6;

const PortfolioContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const page = searchParams.get("page");
    setCurrentPage(page ? parseInt(page, 10) : 1);
  }, [searchParams]);

  const filteredProjects = portofolio.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const tags = useMemo(() => getAllPortofolioTags(portofolio), []);
  const sortedTags = useMemo(() => sortTagsByPortofolioCount(tags), [tags]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.push(`/portofolio?${params.toString()}`);
  };

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="container max-w-6xl py-10 mx-auto">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl text-[#585a5c] dark:text-slate-200">
              Portofolio
            </h1>
            <p className="text-xl text-muted-foreground text-[#585a5c] dark:text-slate-200">
              My thoughts and experiments on everything web development—backend,
              frontend, and a touch of machine learning.
            </p>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="mt-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(124,58,237)]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {currentProjects.length > 0 ? (
                currentProjects.map((project, index) => (
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
                        {project.title.length > 50
                          ? project.title.substring(0, 47) + "..."
                          : project.title}
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
                ))
              ) : (
                <p className="text-center col-span-2">No projects found.</p>
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
                {sortedTags.map((tag) => (
                  <Tag
                    name="portofolio"
                    tag={tag}
                    key={tag}
                    count={tags[tag]}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

const Portfolio = () => {
  return (
    <Suspense fallback={<div>Loading portfolio...</div>}>
      <PortfolioContent />
    </Suspense>
  );
};

export default Portfolio;
