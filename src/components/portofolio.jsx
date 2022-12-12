import React from 'react';
import { myportofolio } from '../utils/myutils';

const Portofolio = () => {
  return (
    <div
      name="portofolio"
      className="w-full md:h-screen text-gray-300 bg-[#1e2023]"
    >
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 text-gray-300 border-blue-700">
            Portofolio
          </p>
          <p className="py-6"> Check My portofolio </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {myportofolio.map((item) => (
            <div className="overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700 shadow-md shadow-[#040c16] hover:scale-110 duration-500">
              <a href="/" aria-label={`Link to ${item.title}`}>
                <img
                  alt={item.title}
                  src={item.image}
                  className="object-cover object-center md:h-36 lg:h-48"
                  width={544}
                  height={306}
                />
              </a>

              <div className="p-6">
                <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
                  <a
                    href={item.urlProject}
                    aria-label={`Link to ${item.title}`}
                  >
                    {item.title}
                  </a>
                </h2>
                <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>

                <a
                  href={item.urlProject}
                  className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label={`Link to ${item.title}`}
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

export default Portofolio;
