"use server";
import { connectDB } from "@/lib/mogoDb";
import { Blog } from "@/models/blog.model";

export const fetchAllBlogs = async () => {
  try {
    await connectDB()
    const blogs = await Blog.find().populate("author", "name email bio").lean();
    
    if (!blogs) {
      throw new Error("No blogs found");
    }
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch blogs" };
  }
};

export const fetchSingleBlog = async(blogId: string) =>{
     try {
       const blog = await Blog.findById(blogId).populate("author", "name email bio").lean();

       if (!blog) {
         throw new Error("Blog not found");
       }

       return JSON.parse(JSON.stringify(blog));
     } catch (error) {
       console.log(error);
       return { error: "Failed to fetch blog" };
     }
};

     
