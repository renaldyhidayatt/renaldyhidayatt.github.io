import React from 'react';

const About = () => {
  return (
    <div name="about" className="w-full h-screen bg-[#1e2023] text-gray-300">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="max-w-[1000px] w-full grid grid-cols-2 gap-8">
          <div className="sm:text-right pb-8 pl-4">
            <p className="text-4xl font-bold inline border-b-4 border-blue-700">
              About
            </p>
          </div>
          <div></div>
        </div>
        <div className="max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4">
          <div className="sm:text-right text-4xl font-bold">
            <p>
              Hi. I'm Renaldy Hidayat, nice to meet you. Please take a look
              around.
            </p>
          </div>
          <div>
            <p>
              Hello, I'm Renaldy Hidayat, a Computer Science candidate at Nusa
              Mandiri University. I'm a person who has an interest in
              programming, likes to learn new things and make things from
              hobbies, and I always improve my knowledge every day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
