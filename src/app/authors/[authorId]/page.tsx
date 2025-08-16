"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import React from "react";
import { getUser } from "@/actions/user.actions";

type Author = {
  _id: string;
  name: string;
  email: string;
  image: string;
  bio: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

async function fetchAuthorA(authorId: string) {
  try {
    const res = await getUser(authorId);
    return res;
  } catch (error) {
    console.error("Error fetching author:", error);
    throw error;
  }
}

const ViewAuthor = () => {
  const params = useParams();
  const authorId = params.authorId as string;

  const { isLoading, error, data } = useQuery<Author>({
    queryKey: ["author", authorId],
    queryFn: () => fetchAuthorA(authorId),
    enabled: !!authorId,
  });

  if (isLoading) return <p className="p-6 text-center">Loading author...</p>;
  if (error)
    return (
      <p className="p-6 text-center text-red-500">Failed to load author.</p>
    );

  return (
    <div
      className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 
                    bg-gradient-to-b from-gray-50 to-gray-100 
                    dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
    >
      {/* Author Image */}
      <div
        className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 
                      border-gray-200 dark:border-gray-700 animate-fade-in"
      >
        <Image
          src={data?.image || "/default-avatar.png"}
          alt={data?.name}
          fill
          sizes="160px"
          className="object-cover"
        />
      </div>

      {/* Name */}
      <h1
        className="mt-6 text-3xl font-extrabold 
                     text-gray-900 dark:text-white tracking-tight animate-slide-up"
      >
        {data?.name}
      </h1>

      {/* Email */}
      <p className="mt-2 text-gray-600 dark:text-gray-400 animate-fade-in-slow">
        {data?.email}
      </p>

      {/* Role */}
      <span
        className="mt-3 px-4 py-1.5 text-sm font-medium 
                       bg-gradient-to-r from-indigo-500 to-purple-500 
                       text-white rounded-full shadow-md animate-bounce-slow"
      >
        {data?.role}
      </span>

      {/* Bio */}
      <p
        className="mt-6 max-w-2xl text-lg leading-relaxed 
                    text-gray-700 dark:text-gray-300 text-center animate-fade-in-slow"
      >
        {data?.bio || "This author hasn't written a bio yet."}
      </p>
    </div>
  );
};

export default ViewAuthor;
