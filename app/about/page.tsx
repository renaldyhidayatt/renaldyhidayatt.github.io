import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      <div className="mt-16 flex flex-col items-center">
        <Image
          src="https://avatars.githubusercontent.com/u/46998157?v=4"
          alt="Your Profile Image"
          className="w-32 h-32 rounded-full mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-200 mb-2">
          Renaldy Hidayat
        </h1>
        <p className="text-gray-700 dark:text-slate-300 text-xl mb-8">
          Computer Science student passionate about programming.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-slate-200 mb-3">
          About Me
        </h2>
        <p className="text-gray-900 dark:text-slate-200 text-lg leading-7">
          I'm a Computer Science candidate at Nusa Mandiri University, and I'm
          deeply passionate about programming. My journey in the world of
          technology has been an exciting adventure, driven by the endless
          opportunities for learning. Whether it's exploring cutting-edge
          programming languages, leveraging groundbreaking frameworks, or
          applying technology in innovative ways, I'm always up for the
          challenge. Staying updated with the latest developments is a priority,
          as I strive to incorporate them into my work.
        </p>

        <p className="text-gray-900 dark:text-slate-200 text-lg leading-7 mt-4">
          My dedication to turning hobbies into meaningful projects is a source
          of fulfillment. It allows me to merge creativity with technical
          expertise. Crafting web applications and developing software solutions
          are areas where I find immense satisfaction, bringing ideas to life
          through code. Above all, my commitment to continuous improvement
          drives my journey. I firmly believe that success in the tech world is
          rooted in lifelong learning. Every day is an opportunity to expand my
          knowledge, refine my skills, and embrace new challenges head-on. This
          unwavering dedication keeps me pushing the boundaries.
        </p>
      </div>
    </div>
  );
};

export default About;
