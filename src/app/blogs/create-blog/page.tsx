"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";

const categories = ["technology", "health", "finance", "lifestyle"];

type BlogFormData = {
  title: string;
  content: string;
  category: string;
  coverImage: FileList
};

async function createBlog (formData:FormData) {
   try {
     const response = await fetch("/api/blog/create-blog", {
       method: "POST",
       body: formData
     });
     return response.json();
   } catch (error) {
    console.log(error)
   }
}

export default function CreateBlogPage() {
  const { register, handleSubmit, control } = useForm<BlogFormData>({
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  const onSubmit = async (data: BlogFormData) => {
    console.log("Form Data:", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("coverImage", data.coverImage[0]);

    const response = await createBlog(formData);
    console.log("Response:", response);
  };



  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white">
            ✍️ Create a New Blog
          </h1>
          <p className="text-gray-300 mt-2">
            Share your thoughts with the world in style.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Blog Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Blog Title
            </label>
            <input
              {...register("title")}
              type="text"
              placeholder="Enter an engaging title..."
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-white/10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/50 outline-none transition-all"
            />
          </div>

          {/* Blog Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Blog Cover Image
            </label>
            <input
              {...register("coverImage")}
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-300 
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-500 file:text-white
                         hover:file:bg-blue-600 cursor-pointer"
            />
          </div>

          {/* Blog Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Blog Content
            </label>
            <textarea
              {...register("content")}
              rows={8}
              placeholder="Write your blog content here..."
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-white/10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/50 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <div>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange} // <-- important
                  value={field.value} // <-- important
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="reset"
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/30 transition-all"
            >
              Publish Blog
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
