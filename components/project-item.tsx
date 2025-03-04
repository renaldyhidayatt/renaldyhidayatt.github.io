"use client"

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/tag";
import { QueryPagination } from "./query-pagination";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function ProjectList({
  currentProjects,
  totalPages,
  currentPage,
  handlePageChange,
  sortedTags,
  tags,
  isLoading,
  router
}: {
  currentProjects: any[];
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  sortedTags: string[];
  router: AppRouterInstance,
  tags: { [key: string]: number };
  isLoading: boolean;
}) {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
      <div className="lg:col-span-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#1c1d1f] rounded-2xl shadow-md overflow-hidden"
                >
                  <Skeleton className="w-full h-52" />
                  <div className="p-5">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))
            : currentProjects.length > 0
            ? currentProjects.map((project, index) => (
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
                      {project.tags?.map((tag: any, i: any) => (
                        <Tag name="portofolio" tag={tag} key={tag} />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            : (
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
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-16" />
                ))
              : sortedTags.map((tag) => (
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
  );
}
