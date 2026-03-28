"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
  VerifyOtpFormData,
  verifyOtpSchema,
} from "@/lib/validation";
import { LockIcon, EyeIcon, EyeOffIcon, Logo } from "@/icons";
import { useResetPasswordMutation } from "@/redux/api/auth";
import { showerror, showsuccess } from "@/utils/toast";

export default function ResetPasswordView() {
  const [step, setStep] = useState<1 | 2>(1);
  const [storedToken, setStoredToken] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [resetPassword] = useResetPasswordMutation();

  useEffect(() => {
    if (!email) {
      showerror("Invalid reset link. Missing email.");
      router.push("/auth/forgot-password");
    }
  }, [email, router]);

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: otpErrors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onOtpSubmit = (data: VerifyOtpFormData) => {
    setStoredToken(data.otp.trim());
    setStep(2);
  };

  const onPasswordSubmit = async (data: ResetPasswordFormData) => {
    if (!email || !storedToken) {
      showerror("Invalid reset flow. Missing email or OTP.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await resetPassword({
        email,
        token: storedToken,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }).unwrap();

      showsuccess(res.message || "Password has been successfully reset!");
      router.push("/auth/login");
    } catch (error: any) {
      showerror(
        error?.data?.message || "Something went wrong resetting password",
      );
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
            Secure Your Account
          </h1>
          <p className="text-lg text-gray-600">
            {step === 1
              ? "Enter the OTP sent to your email to proceed"
              : "Create a new strong password for your account"}
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {step === 1 ? "Enter OTP" : "Create New Password"}
          </h2>
          <p className="text-gray-600 mb-8">
            {step === 1
              ? `We sent an OTP to ${email || "your email"}. Please enter it below.`
              : "Enter your new password below."}
          </p>

          {step === 1 ? (
            <form onSubmit={handleSubmitOtp(onOtpSubmit)} className="space-y-6">
              {/* OTP Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  One-Time Password (OTP)
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    {...registerOtp("otp")}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      otpErrors.otp ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {otpErrors.otp && (
                  <p className="text-red-500 text-sm mt-1">
                    {otpErrors.otp.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                Verify OTP
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmitPassword(onPasswordSubmit)}
              className="space-y-6"
            >
              {/* New Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    {...registerPassword("newPassword")}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      passwordErrors.newPassword
                        ? "border-red-500"
                        : "border-gray-300"
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
                {passwordErrors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordErrors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    {...registerPassword("confirmPassword")}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      passwordErrors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-70 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>
          )}

          <div className="text-center mt-6">
            <Link
              href="/auth/login"
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
