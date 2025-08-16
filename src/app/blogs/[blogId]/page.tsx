"use client"

import { fetchSingleBlog } from '@/actions/blog.actions'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export type Author = {
  name: string
  image: string
  email: string
  bio: string
  _id: string
  role: string
}

type SingleBlog = {
  _id: string
  title: string
  content: string
  coverImage: string
  category: string
  createdAt: string
  author: Author
}

async function fetchSingleBlogA(blogId: string) {
  try {
    const res = await fetchSingleBlog(blogId)
    return res
  } catch (error) {
    console.error('Error fetching blog:', error)
    throw error
  }
}

const ViewIndividualBlog = () => {
  const params = useParams()
  const blogId = params.blogId as string

  const { isLoading, error, data } = useQuery<SingleBlog>({
    queryKey: ['blog', blogId],
    queryFn: () => fetchSingleBlogA(blogId),
    enabled: !!blogId,
  })

  if (isLoading) return <p className="p-6 animate-pulse">Loading blog...</p>
  if (error) return <p className="p-6 text-red-500 dark:text-red-400">Failed to load blog.</p>

  return (
    <div className="max-w-3xl mx-auto p-6 transition-colors duration-300 text-gray-900 dark:text-gray-100">
      {/* Blog Cover Image */}
      {data?.coverImage && (
        <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg animate-fadeIn">
          <Image
            src={data.coverImage}
            alt={data.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>
      )}

      {/* Blog Title */}
      <h1 className="text-3xl font-bold mt-6 tracking-tight animate-slideUp">
        {data?.title}
      </h1>

      {/* Meta Info */}
      <div className="flex items-center justify-between mt-2 text-gray-600 dark:text-gray-400 text-sm">
        <span className="italic">Category: {data?.category}</span>
        <span>{new Date(data!.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Blog Content */}
      <p className="mt-6 text-lg leading-relaxed text-gray-800 dark:text-gray-200 animate-fadeIn">
        {data?.content}
      </p>

      {/* Author Info */}
      <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6 animate-slideUp">
        <h2 className="text-xl font-semibold">About the Author</h2>
        <p className="mt-2 font-medium">{data?.author.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{data?.author.email}</p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{data?.author.bio}</p>
      </div>

      <div className="mt-4">
        <Link href={`/authors/${data?.author._id}`} >
          <Button 
            variant="outline" 
            className="hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
          >
            Read about the author
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ViewIndividualBlog
