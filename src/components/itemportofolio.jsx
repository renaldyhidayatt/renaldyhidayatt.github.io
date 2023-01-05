import React from 'react';

function ItemPortofolio(props) {
  return (
    <>
      {props.myportofolio.map((item) => (
        <div className="overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700 shadow-md shadow-[#040c16] hover:scale-110 duration-500">
          <a href={item.urlProject} aria-label={`Link to ${item.title}`}>
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
              <a href={item.urlProject} aria-label={`Link to ${item.title}`}>
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
    </>
  );
}

export default ItemPortofolio;
