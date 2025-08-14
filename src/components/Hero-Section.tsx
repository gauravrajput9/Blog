"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 transition-colors duration-300 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Welcome to <span className="text-blue-500">MyBlog</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Explore insightful articles, share your thoughts, and join a community
          of passionate writers.
        </motion.p>

        {/* Instructions */}
        <motion.div
          className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <ul className="list-disc text-left mx-auto w-fit space-y-2">
            <li>Sign up or log in using Google or GitHub.</li>
            <li>Create and publish your own blogs with a powerful editor.</li>
            <li>Browse and read blogs from other creators.</li>
            <li>Like, comment, and share articles you enjoy.</li>
            <li>Manage your profile and see your blog stats.</li>
          </ul>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Link
            href="/blogs"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
          >
            View Blogs
          </Link>
          <Link
            href="/blogs/create-blog"
            className="px-6 py-3 border border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Create Blog
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
