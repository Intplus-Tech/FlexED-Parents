"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

import Link from "next/link";
import { LoginFormData, loginSchema } from "@/lib/validation";
import { EyeIcon, EyeOffIcon, LockIcon, Logo, MailIcon } from "@/icons";
import { useRouter } from "next/navigation";

export default function LoginView() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    router.push("/dashboard");
    console.log("[v0] Login data:", data);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2  flex-col justify-center items-start px-16">
        <div className="mb-12">
          <div className="mb-8">
            <Logo />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome to <span className="text-purple-600">FlexED Systems</span>
          </h1>
          <p className="text-lg text-gray-600">
            Streamline your fee collection and reconciliation
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2  flex flex-col justify-center items-center px-6 sm:px-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Hey, Hello</h2>
          <p className="text-gray-600 mb-8">
            Welcome back, Enter your login information
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="narayanmurthy@gmail.com"
                  {...register("email")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••••"
                  {...register("password")}
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 border-gray-300 rounded accent-purple-600"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <Link
                href="#"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-700 mt-6">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-purple-600 font-semibold hover:text-purple-700"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
