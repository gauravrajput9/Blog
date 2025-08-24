"use client";

import React from "react";

const Loading = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title Skeleton */}
        <div className="h-10 w-64 mx-auto bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-4"></div>
        <div className="h-4 w-96 mx-auto bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse mb-12"></div>

        {/* Author Grid Skeleton */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center"
            >
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse mb-6"></div>

              {/* Name */}
              <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-2"></div>

              {/* Role */}
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse mb-3"></div>

              {/* Bio */}
              <div className="h-3 w-40 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse mb-2"></div>
              <div className="h-3 w-36 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse mb-5"></div>

              {/* Button */}
              <div className="h-9 w-40 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loading;
