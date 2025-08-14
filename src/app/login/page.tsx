"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { LoginFormData, loginSchema } from "@/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data)
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-8 max-w-sm w-full bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mb-6"
          noValidate
        >
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center mb-4">
          <span className="border-b w-1/3"></span>
          <span className="text-xs text-muted px-2">OR</span>
          <span className="border-b w-1/3"></span>
        </div>

        {/* Google Login */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center w-full py-3 mb-4 border rounded-lg hover:bg-accent transition-colors"
        >
          <FcGoogle size={22} className="mr-2" />
          Continue with Google
        </button>

        {/* GitHub Login */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex items-center justify-center w-full py-3 border rounded-lg hover:bg-accent transition-colors"
        >
          <FaGithub size={22} className="mr-2" />
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}
