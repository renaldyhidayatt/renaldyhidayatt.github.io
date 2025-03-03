"use client";
import Typewriter from "typewriter-effect";

export default function HomeHeader() {
  return (
    <div className="text-center p-10 py-10">
      <h2 className="text-4xl sm:text-7xl font-bold text-[#585a5c] dark:text-slate-200">
        Renaldy Hidayat
      </h2>
      <h3 className="text-2xl py-4 text-[#585a5c] dark:text-slate-200 md:text-3xl">
        <Typewriter
          options={{
            strings: [
              "I'll be improving my learning in backend...",
              "Machine learning...",
              "And a little bit of frontend.",
            ],
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 30,
            pauseFor: 2000,
          }}
        />
      </h3>
    </div>
  );
}
