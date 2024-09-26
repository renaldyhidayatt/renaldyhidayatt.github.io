import { myportofolio } from "@/lib/myporto";
import Image from "next/image";
import React from "react";

const Portfolio = () => {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <div className="pb-8">
            <p className="text-4xl font-bold inline border-b-4 text-gray-900 dark:text-slate-200 border-blue-700">
              Portofolio
            </p>
            <p className="py-6"> Check My portofolio </p>
          </div>
        </div>
      </div>
      {/* Update to 4 columns in the grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myportofolio.map((project, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1c1d1f] rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={700}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-400">
                {project.description}
              </p>
              <a
                href={project.urlProject}
                className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Link to ${project.title}`}
              >
                Learn more &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
