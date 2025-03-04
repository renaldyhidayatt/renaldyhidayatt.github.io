"use client";

import { portofolio } from "@/.velite";
import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllPortofolioTags, sortTagsByPortofolioCount } from "@/lib/utils";
import ProjectList from "@/components/project-item";

const ITEMS_PER_PAGE = 6;

const PortfolioContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    
    const page = searchParams.get("page");
    setCurrentPage(page ? parseInt(page, 10) : 1);
    
    return () => clearTimeout(timer);
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
    <>
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
        <ProjectList
          currentProjects={currentProjects}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          router={router}
          sortedTags={sortedTags}
          tags={tags}
          isLoading={isLoading}
        />
      </div>
    </>
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
