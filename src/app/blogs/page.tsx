"use client";

import { fetchAllBlogs } from "@/actions/blog.actions";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Loading from "./loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Blog = {
  _id: string;
  title: string;
  author: {
    name: string;
    email: string;
  };  
  content: string;
  imageUrl?: string;
  createdAt: string;
};


async function fetchBlogs(){
  const res = await fetchAllBlogs()
  return res
}

export default function ViewBlogsPage() {
  const { data,isLoading, isError, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        {(error as Error).message || "Something went wrong"}
      </p>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Latest Blogs
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((blog: Blog) => (
          <div
            key={blog._id}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {blog.imageUrl && (
              <div className="relative h-48 w-full">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {blog.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {blog.content.length > 100
                  ? blog.content.slice(0, 100) + "..."
                  : blog.content}
              </p>
              <div className="text-xs text-gray-500">
                By {blog.author.name} •{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
              <div>
                <Link href={`/blogs/${blog._id}`}>
                  <Button variant={"link"}>View More About This Blog</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
