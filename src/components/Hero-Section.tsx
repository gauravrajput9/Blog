"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, PenTool } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 transition-colors duration-300 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center md:text-left">
          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to <span className="text-blue-500">MyBlog</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Explore insightful articles, share your thoughts, and join a
            community of passionate writers.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex justify-center md:justify-start gap-8 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-blue-500">100+</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Blogs Published
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-500">500+</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Active Readers
              </p>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Link
              href="/blogs"
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-md"
            >
              <BookOpen className="h-5 w-5" /> View Blogs
            </Link>
            <Link
              href="/blogs/create-blog"
              className="flex items-center gap-2 px-6 py-3 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <PenTool className="h-5 w-5" /> Create Blog
            </Link>
          </motion.div>
        </div>

        {/* Right Side Illustration */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Image
            src="/hero-illustration.png"
            alt="Hero Illustration"
            width={500}
            height={400}
            className="rounded-2xl drop-shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:brightness-110"
          />
        </motion.div>
      </div>
    </section>
  );
}
