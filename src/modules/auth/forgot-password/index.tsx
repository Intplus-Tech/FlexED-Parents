"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ForgotPasswordFormData, forgotPasswordSchema } from "@/lib/validation";
import { Logo, MailIcon } from "@/icons";
import { useForgotPasswordMutation } from "@/redux/api/auth";
import { showerror, showsuccess } from "@/utils/toast";

export default function ForgotPasswordView() {
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword({ email: data.email.trim() }).unwrap();
      showsuccess(res.message || "OTP sent successfully!");
      router.push(`/auth/reset-password?email=${encodeURIComponent(data.email.trim())}`);
    } catch (error: any) {
      showerror(error?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-start px-16">
        <div className="mb-12 w-full max-w-lg">
          <div className="mb-8">
            <Logo />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Forgot Password
          </h1>
          <p className="text-lg text-gray-600">
            Enter your email to receive a password reset link
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
          <p className="text-gray-600 mb-8">
            Please enter the email address associated with your account
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-70 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="text-center mt-6">
              <Link
                href="/auth/login"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
