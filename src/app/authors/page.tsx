"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAllAuthors } from "@/actions/user.actions";
import Loading from "./loading";
import Link from "next/link";

type Author = {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
};

const Authors = () => {
  const { data: authors, isLoading } = useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const data = await getAllAuthors();
      console.log(data);
      return data as Author[] | [];
    },
  });

  if (isLoading) return <Loading />;
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Meet Our Experts
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12 text-lg">
          Our team of experienced authors brings you insights across technology,
          lifestyle, AI, and wellness. Learn more about their passions and
          expertise.
        </p>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {authors?.map((author) => (
            <div
              key={author._id}
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center transition-transform transform hover:-translate-y-3 hover:shadow-2xl duration-500"
            >
              <div className="relative w-32 h-32 mb-6">
                <Image
                  src={author.image || "/default-avatar.png"}
                  alt={author.name}
                  fill
                  className="rounded-full object-cover border-4 border-blue-500 group-hover:border-blue-700 transition-colors duration-500"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors duration-300">
                {author.name}
              </h2>
              <p className="text-blue-500 font-medium mb-3">{author.role}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-5">
                {author.bio}
              </p>
              <Link href={`/authors/${author._id}`}>
                <button className="mt-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-300">
                  Visit Author&apos;s Page
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Authors;
