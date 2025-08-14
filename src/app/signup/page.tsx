"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignUpFormData, signUpSchema } from "@/types/user";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log("Signup Data:", data);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        alert("Account created! Please log in.");
        router.push("/login");
      } else {
        alert(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(errors);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-8 max-w-sm w-full bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mb-6"
          noValidate
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center mb-4">
          <span className="border-b w-1/3"></span>
          <span className="text-xs text-muted px-2">OR</span>
          <span className="border-b w-1/3"></span>
        </div>

        {/* Google Auth */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center w-full py-3 mb-4 border rounded-lg hover:bg-accent transition-colors"
        >
          <FcGoogle size={22} className="mr-2" />
          Sign Up with Google
        </button>

        {/* GitHub Auth */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex items-center justify-center w-full py-3 border rounded-lg hover:bg-accent transition-colors"
        >
          <FaGithub size={22} className="mr-2" />
          Sign Up with GitHub
        </button>
      </div>
    </div>
  );
}
