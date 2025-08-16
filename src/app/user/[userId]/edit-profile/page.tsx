"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { getUser } from "@/actions/user.actions";
import { useParams } from "next/navigation";

const editProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email"),
  bio: z.string().max(500, "Bio must be under 500 characters"),
  profilePicture: z
    .any()
    .optional()
    .refine(
      (fileList) =>
        !fileList || fileList.length === 0 || fileList[0] instanceof File,
      { message: "Invalid file" }
    ),
});

export type UserParams = {
  userId: string;
};

type EditFormData = z.infer<typeof editProfileSchema>;

async function editUser(formData: FormData) {
  const res = await fetch("/api/edit-user", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

export async function fetchUser(userId: string) {
  const data = await getUser(userId);
  console.log(data);
  return data;
}

export default function EditProfilePage() {
  const params = useParams<UserParams>();
  const userId = params.userId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditFormData>({
    resolver: zodResolver(editProfileSchema),
  });

  const [preview, setPreview] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => editUser(formData),
    onSuccess: (data) => {
      alert(data.message);
      console.log("Profile updated successfully!");
      reset();
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });
  useEffect(() => {
    if (userId) {
      fetchUser(userId).then((user) => {
        reset({
          name: user.name,
          email: user.email,
          bio: user.bio || "",
        });
        if (user.profilePictureUrl) {
          setPreview(user.profilePictureUrl);
        }
      });
    }
  }, [userId, reset]);

  const onSubmit = (data: EditFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("bio", data.bio);

    if (data.profilePicture && data.profilePicture[0]) {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    mutate(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
      >
        {/* Profile Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Profile Picture
          </label>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex items-center justify-center">
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  width={96}
                  height={96}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Preview</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              {...register("profilePicture")}
              onChange={handleImageChange}
              className="text-gray-600 dark:text-gray-300"
            />
          </div>
          {errors.profilePicture && (
            <p className="text-red-500 text-sm">
              {errors.profilePicture.message}
            </p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Enter your name"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            placeholder="Write a short bio about yourself..."
            rows={4}
            {...register("bio")}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          ></textarea>
          {errors.bio && (
            <p className="text-red-500 text-sm">{errors.bio.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}
