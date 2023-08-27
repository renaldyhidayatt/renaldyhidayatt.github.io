import React from 'react';
import { myskill } from '../utils/myutils';
import Image from 'next/image';

const Skills = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="pb-8">
        <p className="text-4xl font-bold inline border-b-4 text-gray-900 dark:text-slate-200 border-blue-700">
          Skill
        </p>
        <p className="py-6">These are the technologies I've hobby with</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8">
        {myskill.map((item) => (
          <div className="shadow-md hover:scale-110 duration-500">
            <Image className="w-20 mx-auto" src={item.image} alt="HTML icon" />
            <p className="my-4">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
