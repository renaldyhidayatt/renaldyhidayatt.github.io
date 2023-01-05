import React from 'react';
import { myportofolio } from '../utils/myutils';
import ItemPortofolio from './itemportofolio';

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
          <ItemPortofolio myportofolio={myportofolio} />
        </div>
      </div>
    </div>
  );
};

export default Portofolio;
