"use client";
import React from "react";
import MovingCard from "./MovingCard";

const Classes = () => {
  return (
    <div className="h-[calc(100dvh-72px)] w-full overflow-hidden relative">
      <img
        src="/classesBg.jpg"
        alt="Rotated"
        className="object-cover h-[100dvh] w-full  origin-center opacity-70"
      />
      <div className="absolute top-0 left-0 w-full h-full p-4 pb-0 flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center gap-6 p-4 md:p-6  backdrop-blur-sm w-fit mx-auto mt-6 md:mt-10 lg:mt-16 bg-white/50 rounded-lg">
          <h1 className="text-2xl sm:text-4xl font-bold text-center">
            Drawing Classes That Nurture Every Child’s Creativity
          </h1>
          <p className="text-lg text-center text-gray-700 max-w-xl">
            I offer personal drawing and sketching classes for kids. A fun way
            to help them express themselves through art. Contact me to know
            more!
          </p>
          <button className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 md:text-lg bg-gray-900 text-white hover:bg-gray-700 rounded-full shadow-lg">
            Inspire Their Creative Journey 🎨
          </button>
        </div>

        <MovingCard />
      </div>
    </div>
  );
};

export default Classes;
