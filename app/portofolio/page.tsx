import { myportofolio } from '@/utils/myutils';
import React from 'react';

const Portfolio = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mt-40">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 text-gray-900 dark:text-slate-200 border-blue-700">
            Portofolio
          </p>
          <p className="py-6"> Check My portofolio </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myportofolio.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1c1d1f] rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.title}
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
    </div>
  );
};

export default Portfolio;
