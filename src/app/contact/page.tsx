"use client";

import { createContact } from "@/actions/contact.actions";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export type ContactFormData = {
  name: string;
  title: string;
  email: string;
  message: string;
};

async function createContactFunction(data: ContactFormData) {
  const res = await createContact(data);
  return res
}

export default function ContactPage() {
  const { register, handleSubmit, reset } = useForm<ContactFormData>();

  const {isPending, mutate} = useMutation({
    mutationFn: (data: ContactFormData) => createContactFunction(data),
    onSuccess: (data) =>{
      console.log(data)
      reset()
      alert("Contact created successfully")
    },
    onError: (error) => {
      console.log(error) 
    }
  })
  const onFormSubmit = async (data: ContactFormData) => {
    console.log(data)
    mutate(data)
  };
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Contact Us
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have any questions or feedback? Fill out the form below, and we&#39;ll get
          back to you as soon as possible.
        </p>
      </div>

      {/* Contact Content */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left - Form */}
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title for Your Contact Purpose
            </label>
            <input
              type="text"
              {...register("title")}
              placeholder="Enter the title"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Message
            </label>
            <textarea
              {...register("message")}
              rows={5}
              placeholder="Write your message here..."
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            ></textarea>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
            >
              {
                isPending ? "Sending..." : "Send Message"
              }
            </button>
          </div>
        </form>

        {/* Right - Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You can also reach out to us directly via email or phone.
            </p>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Email:</span> contact@myblog.com
              </li>
              <li>
                <span className="font-medium">Phone:</span> +91 98765 43210
              </li>
              <li>
                <span className="font-medium">Address:</span> 123 Blog Street,
                Writer&#39;s City, India
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
