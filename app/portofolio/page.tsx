"use client"; 

import { myportofolio } from "@/lib/myporto";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QueryPagination } from "@/components/query-pagination";  

const ITEMS_PER_PAGE = 6;

const Portfolio = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const page = searchParams.get("page");
    setCurrentPage(page ? parseInt(page, 10) : 1);
  }, [searchParams]);

  const filteredProjects = myportofolio.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const truncateDescription = (description: string) => {
    return description.length > 100 ? description.slice(0, 100) + "..." : description;
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.push(`/portofolio?${params.toString()}`);
  };

  return (
    <div className="container max-w-6xl py-10 mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-slate-200 mb-2">
          Portfolio
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Check out my work and projects.
        </p>
      </div>

     
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(124,58,237)]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProjects.length > 0 ? (
          currentProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1c1d1f] rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={700}
                height={400}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-400 mb-4">
                  {truncateDescription(project.description)}
                </p>
                <a
                  href={project.urlProject}
                  className="inline-block bg-[rgb(124,58,237)] text-white text-base font-medium rounded-md px-4 py-2 transition-colors duration-200 hover:bg-[rgb(104,50,210)] dark:bg-[rgb(124,58,237)] dark:hover:bg-[rgb(104,50,210)]"
                  aria-label={`Link to ${project.title}`}
                >
                  Learn more &rarr;
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <QueryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="justify-end mt-4"
        />
      </div>
    </div>
  );
};

export default Portfolio;
